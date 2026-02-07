import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LoginFooter: FC = () => {
  return (
    <div className="flex justify-center pt-2">
      <p className="text-sm text-muted-foreground">Ще нема акаунту?</p>

      <Button
        variant="link"
        className="h-5 cursor-default px-1 font-semibold"
        type="button"
        asChild
      >
        <Link href="/registration">Створити безкоштовно</Link>
      </Button>
    </div>
  );
};

export default LoginFooter;
