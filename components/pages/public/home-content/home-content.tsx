import { FC } from 'react';
import HeroSection from './hero-section';
import CalendarPreviewSection from './calendar-preview-section';
import FeaturesSection from './features-section';
import SecondaryCtaBlock from './secondary-cta-block';

const HomeContent: FC = () => {
  return (
    <div className="h-full bg-linear-to-b from-background via-muted/20 to-background">
      <HeroSection className="pt-16 pb-36" />
      <CalendarPreviewSection className="pb-20" />
      <FeaturesSection className="pb-20" />
      <SecondaryCtaBlock className="pb-16" />
    </div>
  );
};

export default HomeContent;
