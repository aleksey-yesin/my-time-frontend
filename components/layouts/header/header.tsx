import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AppLogo from './app-logo';

const Header: FC = () => {
  return (
    <div className="border-b border-border bg-card/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <AppLogo />

        <Button asChild variant="default-gradient" size="lg">
          <Link href="/login">Увійти</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
