import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useSession, SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import { SWRConfig } from 'swr';

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import AntdProvider from '@/providers/antd';

import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false);
  const router = useRouter();
  const swrOptions = swrConfig();

  Router.events.on('routeChangeStart', () => setProgress(true));
  Router.events.on('routeChangeComplete', () => setProgress(false));
  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ReactGA.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  function Auth({ children }) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true });

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    return children;
  }

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={swrOptions}>
        <ThemeProvider attribute="class">
          <AntdProvider>
            {progress && <TopBarProgress />}
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </AntdProvider>
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
