'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForgotPasswordMutation } from '@/lib/api/auth.queries';
import { ApiFetchError } from '@/lib/use-api-fetch';
import ForgotPasswordHeader from './forgot-password-header';
import ForgotPasswordForm, {
  ForgotPasswordFormValues,
} from './forgot-password-form';
import ForgotPasswordFooter from './forgot-password-footer';

const ForgotPasswordContent: FC = () => {
  const router = useRouter();

  const { mutate: forgotPassword, isPending } = useForgotPasswordMutation({
    onSuccess: (_, params) => {
      toast.success('Код надіслано', {
        description: 'Якщо email існує, код було надіслано на вашу пошту',
      });
      router.push(
        `/reset-password?email=${encodeURIComponent(params.email)}`,
      );
    },
    onError: async (error) => {
      if (error instanceof ApiFetchError) {
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

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    forgotPassword({ email: values.email });
  };

  return (
    <div className="space-y-6 p-8 md:p-10">
      <ForgotPasswordHeader />
      <ForgotPasswordForm onSubmit={handleSubmit} isPending={isPending} />
      <ForgotPasswordFooter />
    </div>
  );
};

export default ForgotPasswordContent;
