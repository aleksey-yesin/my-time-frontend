'use client';

import { FC } from 'react';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLoginMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';
import SeparatorWithText from '@/components/ui-custom/separator-with-text';
import GoogleButton from '@/components/ui-custom/google-button/google-button';
import { ApiFetchError } from '@/lib/use-api-fetch';
import useNavigateBack from '@/hooks/use-navigate-back';
import LoginHeader from './login-header';
import LoginForm from './login-form';
import LoginFooter from './login-footer';

const LoginContent: FC = () => {
  const router = useRouter();
  const setTokenPair = useSetAtom(setTokenPairAtom);
  const { pushCurrentPoint, historyPointId } = useNavigateBack();

  const { mutate: login } = useLoginMutation({
    onSuccess: (data) => {
      setTokenPair({
        access: data.access_token,
        refresh: data.refresh_token,
      });
    },
    onError: async (error, params) => {
      if (error instanceof ApiFetchError) {
        const json = await error.response.json();

        if (json.message.startsWith?.('Please verify')) {
          pushCurrentPoint();
          return router.push(
            `/verify-email?email=${encodeURIComponent(params.email)}&back-id=${historyPointId}`,
          );
        }
        if (error.response.status === 401) {
          return toast.error('Помилка авторизації', {
            description: 'Перевірте правильність введених даних',
            action: {
              label: 'Забули пароль?',
              onClick: () => router.push('/forgot-password'),
            },
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

  return (
    <div className="space-y-6 p-8 md:p-10">
      <LoginHeader />
      <LoginForm onSubmit={login} />
      <SeparatorWithText text="або" />
      <GoogleButton />
      <LoginFooter />
    </div>
  );
};

export default LoginContent;
