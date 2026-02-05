import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const RegistrationContentFooter: FC = () => {
  return (
    <div className="flex justify-center pt-2">
      <p className="text-sm text-muted-foreground">Вже маєте акаунт?</p>

      <Button
        variant="link"
        className="h-5 cursor-default px-1 font-semibold"
        type="button"
        asChild
      >
        <Link href="/login">Увійти</Link>
      </Button>
    </div>
  );
};

export default RegistrationContentFooter;
