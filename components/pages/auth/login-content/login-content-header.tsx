import { FC } from 'react';
import AppLogoIcon from '@/components/ui-custom/app-logo-icon';

const LoginContentHeader: FC = () => {
  return (
    <div className="space-y-3 text-center">
      {/* Logo */}
      <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-primary-lg">
        <AppLogoIcon className="h-10 w-10 text-primary-foreground" />
      </div>
      {/* Title */}
      <h1 className="bg-gradient-text-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        My Service
      </h1>
      <p className="text-muted-foreground">Войдите в свой аккаунт</p>
    </div>
  );
};

export default LoginContentHeader;
