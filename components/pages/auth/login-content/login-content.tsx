'use client';

import { FC, useState } from 'react';
import { useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoginMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';
import AppLogoIcon from '@/components/ui-custom/app-logo-icon';
import GoogleIcon from './google-icon';

const LoginContent: FC = () => {
  const setTokenPair = useSetAtom(setTokenPairAtom);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login } = useLoginMutation({
    onSuccess: (data) => {
      setTokenPair({
        access: data.access_token,
        refresh: data.refresh_token,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: 'vpupkin@hello.com',
      password: 'vhello',
    });
  };

  return (
    <div className="space-y-6 p-8 md:p-10">
      {/* Header */}
      <div className="space-y-3 text-center">
        <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-primary-lg">
          <AppLogoIcon className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="beauty-gradient-text text-4xl font-bold tracking-tight text-balance md:text-5xl">
          {'My Service'}
        </h1>
        <p className="text-balance text-muted-foreground">
          {'Войдите в свой аккаунт'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2.5">
          <Label htmlFor="email" className="font-medium text-foreground/90">
            {'Email'}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="beauty-glow h-12 border-border/40 bg-input/50 backdrop-blur-sm transition-all duration-300 focus:border-primary/50"
            required
          />
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="font-medium text-foreground/90"
            >
              {'Пароль'}
            </Label>
            <button
              type="button"
              className="text-sm font-medium text-primary transition-colors hover:text-secondary"
            >
              {'Забыли?'}
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="beauty-glow h-12 border-border/40 bg-input/50 backdrop-blur-sm transition-all duration-300 focus:border-primary/50"
            required
          />
        </div>

        <Button
          type="submit"
          className="beauty-gradient beauty-shadow beauty-shine mt-6 h-12 w-full text-base font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90"
        >
          {'Войти'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/40" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card/80 px-3 font-medium text-muted-foreground backdrop-blur-sm">
            {'или'}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full border-border/40 bg-transparent font-medium transition-all duration-300 hover:border-primary/40 hover:bg-muted/50 hover:text-foreground"
      >
        <GoogleIcon className="mr-2.5 size-5" />
        {'Продолжить с Google'}
      </Button>

      {/* Sign up link */}
      <p className="pt-2 text-center text-sm text-muted-foreground">
        {'Еще нет аккаунта? '}
        <button
          type="button"
          className="font-semibold text-primary transition-colors hover:text-secondary"
        >
          {'Создать бесплатно'}
        </button>
      </p>
    </div>
  );
};

export default LoginContent;
