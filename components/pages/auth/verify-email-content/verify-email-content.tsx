'use client';

import { FC, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom, useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { useVerifyEmailMutation } from '@/lib/api/auth.queries';
import {
  registrationInitValuesAtom,
  setTokenPairAtom,
} from '@/lib/atoms/auth.atoms';
import VerifyEmailContentHeader from './verify-email-content-header';
import VerifyEmailForm from './verify-email-form';
import VerifyEmailResendButton from './verify-email-resend-button';
import VerifyEmailBackButton from './verify-email-back-button';

const VerifyEmailContent: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const initialCode = searchParams.get('code') || '';

  const setTokenPair = useSetAtom(setTokenPairAtom);
  const [registrationFormData, setRegistrationFormData] = useAtom(
    registrationInitValuesAtom,
  );

  const { mutate: verifyEmail, isPending } = useVerifyEmailMutation({
    onSuccess: (data) => {
      setTokenPair({
        access: data.access_token,
        refresh: data.refresh_token,
      });
      // Clear registration form data on successful verification
      setRegistrationFormData(null);
    },
    onError: (error) => {
      if (
        error.message.includes('invalid') ||
        error.message.includes('невірний')
      ) {
        toast.error('Невірний код підтвердження', {
          description: 'Перевірте код та спробуйте ще раз.',
        });
      } else if (
        error.message.includes('expired') ||
        error.message.includes('закінчився')
      ) {
        toast.error('Код підтвердження застарів', {
          description:
            'Натисніть "Надіслати код повторно" для отримання нового коду.',
        });
      } else {
        toast.error('Помилка підтвердження', {
          description: error.message,
        });
      }
    },
  });

  const handleSubmit = (code: string) => {
    verifyEmail({ email, code });
  };

  const handleBack = () => {
    // Save email to registration form data if no saved data exists
    if (!registrationFormData) {
      setRegistrationFormData({ email, password: '' });
    }
    router.push('/registration');
  };

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      router.replace('/registration');
    }
  }, [email, router]);

  if (!email) {
    return null;
  }

  return (
    <div className="space-y-6 p-8 md:p-10">
      <VerifyEmailContentHeader email={email} />
      <VerifyEmailForm
        onSubmit={handleSubmit}
        isPending={isPending}
        initialCode={initialCode}
      />
      <div className="space-y-3">
        <VerifyEmailResendButton email={email} />
        <VerifyEmailBackButton onClick={handleBack} />
      </div>
    </div>
  );
};

export default VerifyEmailContent;
