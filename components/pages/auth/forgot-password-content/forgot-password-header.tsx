import { FC } from 'react';
import { KeyRoundIcon } from 'lucide-react';

const ForgotPasswordHeader: FC = () => {
  return (
    <div className="text-center">
      {/* Icon */}
      <div className="mb-2 inline-flex size-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-primary-lg">
        <KeyRoundIcon className="size-10 text-primary-foreground" />
      </div>
      {/* Title */}
      <h1 className="mb-3 bg-gradient-text-primary bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
        Відновлення паролю
      </h1>
      <p className="text-muted-foreground">
        Введіть email, щоб отримати код для скидання паролю
      </p>
    </div>
  );
};

export default ForgotPasswordHeader;
