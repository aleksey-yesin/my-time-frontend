import { FC } from 'react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';

interface Props {
  code: string;
  onCodeChange: (newCode: string) => void;
  onSubmit: () => void;
  isPending: boolean;
}

const VerifyEmailForm: FC<Props> = ({
  code,
  onCodeChange,
  onSubmit,
  isPending,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={onCodeChange}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="size-12 text-lg"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Submit group */}
      <Button
        variant="default-gradient"
        className="h-12 w-full gap-3.5 text-base font-semibold"
        type="submit"
        disabled={code.length !== 6 || isPending}
      >
        {isPending && <Spinner />}
        Підтвердити
      </Button>
    </form>
  );
};

export default VerifyEmailForm;
