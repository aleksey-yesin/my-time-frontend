'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useLoginMutation } from '@/lib/api/auth.queries';

const LoginContent: FC = () => {
  const { mutate } = useLoginMutation({
    onSuccess: () => {
      //
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
