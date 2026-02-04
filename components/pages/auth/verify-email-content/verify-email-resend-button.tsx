'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useResendVerificationCodeMutation } from '@/lib/api/auth.queries';

const COUNTDOWN_SECONDS = 60;

interface Props {
  email: string;
}

const VerifyEmailResendButton: FC<Props> = ({ email }) => {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  const { mutate: resendCode, isPending } = useResendVerificationCodeMutation({
    onSuccess: () => {
      toast.success('Код надіслано', {
        description: 'Перевірте вашу електронну пошту.',
      });
      setCountdown(COUNTDOWN_SECONDS);
    },
    onError: (error) => {
      toast.error('Помилка надсилання коду', {
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = useCallback(() => {
    resendCode({ email });
  }, [email, resendCode]);

  const isDisabled = countdown > 0 || isPending;

  return (
    <Button
      variant="outline"
      className="h-12 w-full text-base"
      type="button"
      onClick={handleResend}
      disabled={isDisabled}
    >
      {isPending ? (
        <>
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          Надсилання...
        </>
      ) : countdown > 0 ? (
        `Надіслати код повторно (${countdown}с)`
      ) : (
        'Надіслати код повторно'
      )}
    </Button>
  );
};

export default VerifyEmailResendButton;
