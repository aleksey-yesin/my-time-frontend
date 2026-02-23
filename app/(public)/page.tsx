import { FC } from 'react';
import HomeHeader from '@/components/pages/home/home-content/home-header';
import HomeContent from '@/components/pages/home/home-content/home-content';

const HomePage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeHeader />
      <HomeContent />
    </div>
  );
};

export default HomePage;
