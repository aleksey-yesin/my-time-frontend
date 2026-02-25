import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui-custom/container';
import AppLogo from './app-logo';

const Header: FC = () => {
  return (
    <div className="border-b border-border bg-card/50">
      <Container className="flex items-center justify-between">
        <AppLogo />

        <Button asChild variant="default-gradient" size="lg">
          <Link href="/login">Увійти</Link>
        </Button>
      </Container>
    </div>
  );
};

export default Header;
