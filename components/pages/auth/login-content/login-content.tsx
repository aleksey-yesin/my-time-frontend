'use client';

import { FC } from 'react';
import { useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { useLoginMutation } from '@/lib/api/auth.queries';
import { accessTokenAtom, refreshTokenAtom } from '@/lib/atoms/auth.atoms';

const LoginContent: FC = () => {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);

  const { mutate } = useLoginMutation({
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
    },
  });

  const handleSubmit = () => {
    mutate({
      email: 'vpupkin@hello.com',
      password: 'vhello',
    });
  };

  return (
    <div>
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
};

export default LoginContent;
