import Meta from '@/components/Meta/index';
import { LandingLayout } from '@/layouts/index';
import { Translation, Footer, Hero } from '@/sections/index';
import Translate from './translate';

const Home = () => {
  return (
    <LandingLayout>
      <Meta
        title="Lingui.me - Your personalised translator"
        description="Translations with a personality"
      />
      <Translate />
      <Footer />
    </LandingLayout>
  );
};

export default Home;
