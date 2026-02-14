import { FC } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ForgotPasswordFooter: FC = () => {
  return (
    <div className="flex justify-center pt-2">
      <Button
        variant="ghost"
        className="h-12 w-full cursor-default gap-3.5 text-base text-muted-foreground"
        asChild
      >
        <Link href="/login">
          <ArrowLeftIcon />
          Повернутися до входу
        </Link>
      </Button>
    </div>
  );
};

export default ForgotPasswordFooter;
