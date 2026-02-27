import Link from 'next/link';
import { FC } from 'react';
import AppIcon from '@/components/ui-custom/app-icon';

const AppLogo: FC = () => {
  return (
    <Link
      href="/"
      className="flex h-16 items-center gap-3 transition-opacity hover:opacity-80"
    >
      <div
        className="flex size-10 items-center justify-center rounded-md bg-gradient-primary shadow-primary"
        aria-hidden
      >
        <AppIcon className="size-5 text-primary-foreground" />
      </div>

      <span className="bg-gradient-text-primary bg-clip-text text-xl font-semibold text-transparent">
        MyTime
      </span>
    </Link>
  );
};

export default AppLogo;
