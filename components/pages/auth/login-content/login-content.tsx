'use client';

import { FC } from 'react';
import { useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { useLoginMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';
import GoogleIcon from './google-icon';
import LoginDivider from './login-divider';
import LoginContentHeader from './login-content-header';
import LoginForm from './login-form';

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

  const handleSubmit = () => {
    login({
      email: 'vpupkin@hello.com',
      password: 'vhello',
    });
  };

  return (
    <div className="space-y-6 p-8 md:p-10">
      <LoginContentHeader />

      <LoginForm onSubmit={handleSubmit} />

      <LoginDivider />

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full border-border/40 bg-transparent font-medium transition-all duration-300 hover:border-primary/40 hover:bg-muted/50 hover:text-foreground"
      >
        <GoogleIcon className="mr-2.5 size-5" />
        Продолжить с Google
      </Button>

      {/* Sign up link */}
      <p className="pt-2 text-center text-sm text-muted-foreground">
        Еще нет аккаунта?{' '}
        <button
          type="button"
          className="font-semibold text-primary transition-colors hover:text-secondary"
        >
          Создать бесплатно
        </button>
      </p>
    </div>
  );
};

export default LoginContent;
