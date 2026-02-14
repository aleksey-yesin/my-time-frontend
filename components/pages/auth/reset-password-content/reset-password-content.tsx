'use client';

import { FC } from 'react';
import { useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';
import { ApiFetchError } from '@/lib/use-api-fetch';
import ResetPasswordHeader from './reset-password-header';
import ResetPasswordForm, {
  ResetPasswordFormValues,
} from './reset-password-form';
import ResetPasswordActions from './reset-password-actions';

interface Props {
  searchEmail: string;
}

const ResetPasswordContent: FC<Props> = ({ searchEmail }) => {
  const setTokenPair = useSetAtom(setTokenPairAtom);

  const { mutate: resetPassword, isPending } = useResetPasswordMutation({
    onSuccess: (data) => {
      setTokenPair({
        access: data.access_token,
        refresh: data.refresh_token,
      });
    },
    onError: async (error) => {
      if (error instanceof ApiFetchError) {
        const json = await error.response.json();

        if (json.message.startsWith?.('Invalid')) {
          return toast.error('Невірний email або код скидання', {
            description:
              'Перевірте код або натисніть "Надіслати код повторно" для отримання нового',
          });
        }
        if (error.response.status === 429) {
          return toast.error('Перевищено ліміт спроб', {
            description:
              'Будь ласка, зачекайте пару хвилин перед наступною спробою',
          });
        }
      }
      toast.error('Щось пішло не так', {
        description:
          'Будь ласка, спробуйте пізніше або повідомте нам про проблему',
      });
    },
  });

  const handleSubmit = (values: ResetPasswordFormValues) => {
    resetPassword({
      email: searchEmail,
      code: values.code,
      password: values.password,
    });
  };

  return (
    <div className="space-y-6 p-8 md:p-10">
      <ResetPasswordHeader email={searchEmail} />
      <ResetPasswordForm onSubmit={handleSubmit} isPending={isPending} />
      <ResetPasswordActions searchEmail={searchEmail} />
    </div>
  );
};

export default ResetPasswordContent;
