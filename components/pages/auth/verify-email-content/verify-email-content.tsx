'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { useVerifyEmailMutation } from '@/lib/api/auth.queries';
import {
  registrationInitValuesAtom,
  setTokenPairAtom,
  successRegistrationParamsAtom,
} from '@/lib/atoms/auth.atoms';
import VerifyEmailContentHeader from './verify-email-content-header';
import VerifyEmailForm from './verify-email-form';
import VerifyEmailResendButton from './verify-email-resend-button';
import VerifyEmailBackButton from './verify-email-back-button';

interface Props {
  searchEmail: string;
}

const VerifyEmailContent: FC<Props> = ({ searchEmail }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setTokenPair = useSetAtom(setTokenPairAtom);
  const successRegistrationParams = useAtomValue(successRegistrationParamsAtom);
  const setRegistrationInitValues = useSetAtom(registrationInitValuesAtom);

  const searchCode = searchParams.get('code');

  const { mutate: verifyEmail, isPending: verifyEmailPending } =
    useVerifyEmailMutation({
      onSuccess: (data) => {
        setTokenPair({
          access: data.access_token,
          refresh: data.refresh_token,
        });
      },
      onError: (error) => {
        if (error.message.toLowerCase().includes('invalid')) {
          toast.error('Невірний код підтвердження', {
            description:
              'Перевірте код або натисніть "Надіслати код повторно" для отримання нового',
          });
        }
      },
    });

  const handleSubmit = (code: string) => {
    verifyEmail({ email: searchEmail, code });
  };

  const handleBack = () => {
    if (successRegistrationParams) {
      const { email, password } = successRegistrationParams;
      setRegistrationInitValues({ email, password, confirmPassword: password });
    } else {
      setRegistrationInitValues({ email: searchEmail });
    }
    router.push('/registration');
  };

  return (
    <div className="space-y-6 p-8 md:p-10">
      <VerifyEmailContentHeader email={searchEmail} />
      <VerifyEmailForm
        onSubmit={handleSubmit}
        isPending={verifyEmailPending}
        initialCode={searchCode}
      />
      <div className="space-y-3">
        <VerifyEmailResendButton email={searchEmail} />
        <VerifyEmailBackButton onClick={handleBack} />
      </div>
    </div>
  );
};

export default VerifyEmailContent;
