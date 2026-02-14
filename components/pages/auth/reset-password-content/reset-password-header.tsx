import { FC } from 'react';
import { ShieldCheckIcon } from 'lucide-react';

interface Props {
  email: string;
}

const ResetPasswordHeader: FC<Props> = ({ email }) => {
  return (
    <div className="text-center">
      {/* Icon */}
      <div className="mb-2 inline-flex size-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-primary-lg">
        <ShieldCheckIcon className="size-10 text-primary-foreground" />
      </div>
      {/* Title */}
      <h1 className="mb-3 bg-gradient-text-primary bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
        Скидання паролю
      </h1>
      <p className="text-muted-foreground">
        Введіть код, надісланий на{' '}
        <span className="font-medium text-foreground">{email}</span>, та новий
        пароль
      </p>
    </div>
  );
};

export default ResetPasswordHeader;
