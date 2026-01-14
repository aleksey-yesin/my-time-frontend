import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LoginContentFooter: FC = () => {
  return (
    <div className="flex justify-center pt-2">
      <p className="text-sm text-muted-foreground">Еще нет аккаунта?</p>

      <Button
        variant="link"
        className="h-5 px-1 font-semibold"
        type="button"
        asChild
      >
        <Link href="/registration">Создать бесплатно</Link>
      </Button>
    </div>
  );
};

export default LoginContentFooter;
