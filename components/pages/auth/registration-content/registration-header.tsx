import { FC } from 'react';
import AppIcon from '@/components/ui-custom/app-icon';

const RegistrationHeader: FC = () => {
  return (
    <div className="text-center">
      <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-primary-lg">
        <AppIcon className="h-10 w-10 text-primary-foreground" />
      </div>
      <h1 className="mb-3 bg-gradient-text-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        My Time
      </h1>
      <p className="text-muted-foreground">Створіть новий акаунт</p>
    </div>
  );
};

export default RegistrationHeader;
