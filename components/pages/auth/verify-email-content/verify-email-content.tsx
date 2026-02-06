'use client';

import { FC, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { useVerifyEmailMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';
import VerifyEmailForm from './verify-email-form';
import VerifyEmailActions from './verify-email-actions';
import VerifyEmailHeader from './verify-email-header';

interface Props {
  searchEmail: string;
}

const VerifyEmailContent: FC<Props> = ({ searchEmail }) => {
  const searchParams = useSearchParams();

  const setTokenPair = useSetAtom(setTokenPairAtom);
  const [code, setCode] = useState(searchParams.get('code') || '');

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

  return (
    <div className="space-y-6 p-8 md:p-10">
      <VerifyEmailHeader email={searchEmail} />
      <VerifyEmailForm
        code={code}
        onCodeChange={setCode}
        onSubmit={() => verifyEmail({ email: searchEmail, code })}
        isPending={verifyEmailPending}
      />
      <VerifyEmailActions searchEmail={searchEmail} onCodeChange={setCode} />
    </div>
  );
};

export default VerifyEmailContent;
