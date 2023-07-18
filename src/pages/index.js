import Meta from '@/components/Meta/index';
import { LandingLayout } from '@/layouts/index';
import {
  Translation,
  Footer,
  Hero,
} from '@/sections/index';

const Home = () => {
  return (
    <LandingLayout>
      <Meta
        title="KPT - Your personalised translator"
        description="Translations with a personality"
      />
      <Hero />
      <Translation />
      <Footer />
    </LandingLayout>
  );
};

export default Home;
