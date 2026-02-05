'use client';

import { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'sonner';
import {
  useResendEmailVerificationCodeMutation,
  useVerifyEmailMutation,
} from '@/lib/api/auth.queries';
import {
  registrationInitValuesAtom,
  setTokenPairAtom,
  successRegistrationParamsAtom,
} from '@/lib/atoms/auth.atoms';
import CountdownButton from '@/components/ui-custom/countdown-button';
import VerifyEmailContentHeader from './verify-email-content-header';
import VerifyEmailForm from './verify-email-form';
import VerifyEmailBackButton from './verify-email-back-button';

interface Props {
  searchEmail: string;
}

const resendAfterSec = 60;

const VerifyEmailContent: FC<Props> = ({ searchEmail }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setTokenPair = useSetAtom(setTokenPairAtom);
  const successRegistrationParams = useAtomValue(successRegistrationParamsAtom);
  const setRegistrationInitValues = useSetAtom(registrationInitValuesAtom);

  const [code, setCode] = useState(searchParams.get('code') || '');
  const [countdown, setCountdown] = useState(resendAfterSec);

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

  const { mutate: resendCode, isPending: resendCodePending } =
    useResendEmailVerificationCodeMutation({
      onSuccess: () => {
        toast.success('Код надіслано', {
          description: 'Перевірте вашу електронну пошту',
        });
        setCountdown(resendAfterSec);
        setCode('');
      },
    });

  const handleSubmit = () => {
    verifyEmail({ email: searchEmail, code });
  };

  const handleResendCode = () => {
    resendCode({ email: searchEmail });
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
        code={code}
        onCodeChange={setCode}
        onSubmit={handleSubmit}
        isPending={verifyEmailPending}
      />
      <div className="space-y-3">
        <CountdownButton
          variant="outline"
          className="h-12 w-full gap-3.5 text-base"
          onClick={handleResendCode}
          countdown={countdown}
          onCountdownChange={setCountdown}
          text="Надіслати код повторно"
          isPending={resendCodePending}
        />
        <VerifyEmailBackButton onClick={handleBack} />
      </div>
    </div>
  );
};

export default VerifyEmailContent;
