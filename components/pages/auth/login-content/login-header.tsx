import { FC } from 'react';
import AppLogoIcon from '@/components/ui-custom/app-logo-icon';

const LoginHeader: FC = () => {
  return (
    <div className="text-center">
      {/* Logo */}
      <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-primary-lg">
        <AppLogoIcon className="h-10 w-10 text-primary-foreground" />
      </div>
      {/* Title */}
      <h1 className="mb-3 bg-gradient-text-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        My Service
      </h1>
      <p className="text-muted-foreground">Увійдіть у свій аккаунт</p>
    </div>
  );
};

export default LoginHeader;
