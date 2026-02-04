import { FC } from 'react';
import { MailIcon } from 'lucide-react';

interface Props {
  email: string;
}

const VerifyEmailContentHeader: FC<Props> = ({ email }) => {
  return (
    <div className="space-y-3 text-center">
      {/* Icon */}
      <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-primary-lg">
        <MailIcon className="h-10 w-10 text-primary-foreground" />
      </div>
      {/* Title */}
      <h1 className="bg-gradient-text-primary bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
        Підтвердіть email
      </h1>
      <p className="text-muted-foreground">
        Ми надіслали код підтвердження на{' '}
        <span className="font-medium text-foreground">{email}</span>
      </p>
    </div>
  );
};

export default VerifyEmailContentHeader;
