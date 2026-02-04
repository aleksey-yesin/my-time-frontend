'use client';

import { FC } from 'react';
import { useSetAtom } from 'jotai';
import { useLoginMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';
import SeparatorWithText from '@/components/ui-custom/separator-with-text';
import GoogleButton from '@/components/ui-custom/google-button/google-button';
import LoginContentHeader from './login-content-header';
import LoginForm from './login-form';
import LoginContentFooter from './login-content-footer';

const LoginContent: FC = () => {
  const setTokenPair = useSetAtom(setTokenPairAtom);

  const { mutate: login } = useLoginMutation({
    onSuccess: (data) => {
      setTokenPair({
        access: data.access_token,
        refresh: data.refresh_token,
      });
    },
  });

  return (
    <div className="space-y-6 p-8 md:p-10">
      <LoginContentHeader />
      <LoginForm onSubmit={login} />
      <SeparatorWithText text="або" />
      <GoogleButton />
      <LoginContentFooter />
    </div>
  );
};

export default LoginContent;
