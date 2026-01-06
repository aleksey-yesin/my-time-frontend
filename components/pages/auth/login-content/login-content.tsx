'use client';

import { FC, useState } from 'react';
import { useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useLoginMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';

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
    <Card className="beauty-shadow-lg relative z-10 mx-4 w-full max-w-md border border-border/30 bg-card/80 p-8 backdrop-blur-xl md:p-10">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="beauty-gradient beauty-shadow-lg beauty-shine relative mb-2 inline-flex h-20 w-20 items-center justify-center rounded-3xl">
            <svg
              className="h-10 w-10 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <circle cx="13" cy="13" r="9" strokeWidth={2.5} />
              <path
                d="M8 13l3 3 6-6"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 4h6M2 8h4M2 12h3"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
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
          <svg className="mr-2.5 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
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
    </Card>
  );
};

export default LoginContent;
