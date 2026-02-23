import { FC } from 'react';
import Link from 'next/link';
import AppLogoIcon from '@/components/ui-custom/app-logo-icon';
import { Button } from '@/components/ui/button';

const HomeHeader: FC = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-primary">
            <AppLogoIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="bg-gradient-text-primary bg-clip-text text-xl font-bold text-transparent">
            My Time
          </span>
        </Link>

        {/* Login/Registration Link */}
        <Button asChild variant="default-gradient" size="lg">
          <Link href="/login">Увійти</Link>
        </Button>
      </div>
    </header>
  );
};

export default HomeHeader;
