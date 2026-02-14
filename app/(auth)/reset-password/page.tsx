import { FC } from 'react';
import { redirect } from 'next/navigation';
import ResetPasswordContent from '@/components/pages/auth/reset-password-content/reset-password-content';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const ResetPasswordPage: FC<Props> = async ({ searchParams }) => {
  const { email } = await searchParams;

  if (typeof email !== 'string') {
    redirect('/forgot-password');
  }

  return <ResetPasswordContent searchEmail={email} />;
};

export default ResetPasswordPage;
