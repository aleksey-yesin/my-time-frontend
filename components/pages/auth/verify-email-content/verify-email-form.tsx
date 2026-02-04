'use client';

import { FC, useState, useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface Props {
  onSubmit: (code: string) => void;
  isPending?: boolean;
  initialCode?: string;
}

const VerifyEmailForm: FC<Props> = ({ onSubmit, isPending, initialCode = '' }) => {
  const [code, setCode] = useState(initialCode);

  // Auto-submit when 6 digits are entered
  useEffect(() => {
    if (code.length === 6 && !isPending) {
      onSubmit(code);
    }
  }, [code, onSubmit, isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onSubmit(code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={setCode}
          pattern={REGEXP_ONLY_DIGITS}
          disabled={isPending}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
            <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        variant="default-gradient"
        className="h-12 w-full text-base font-semibold"
        type="submit"
        disabled={isPending || code.length !== 6}
      >
        {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        Підтвердити
      </Button>
    </form>
  );
};

export default VerifyEmailForm;
