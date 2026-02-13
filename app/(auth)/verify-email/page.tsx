import { FC } from 'react';
import { redirect } from 'next/navigation';
import VerifyEmailContent from '@/components/pages/auth/verify-email-content/verify-email-content';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const VerifyEmailPage: FC<Props> = async ({ searchParams }) => {
  const { email } = await searchParams;

  if (typeof email !== 'string') {
    redirect('/registration');
  }

  return <VerifyEmailContent searchEmail={email} />;
};

export default VerifyEmailPage;
