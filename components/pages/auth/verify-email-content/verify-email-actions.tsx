import { FC, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CountdownButton from '@/components/ui-custom/countdown-button';
import { Button } from '@/components/ui/button';
import { useResendEmailVerificationCodeMutation } from '@/lib/api/auth.queries';
import {
  registrationInitValuesAtom,
  successRegistrationParamsAtom,
} from '@/lib/atoms/auth.atoms';

interface Props {
  searchEmail: string;
  onCodeChange: (newCode: string) => void;
}

const resendAfterSec = 60;

const VerifyEmailActions: FC<Props> = ({ searchEmail, onCodeChange }) => {
  const router = useRouter();

  const successRegistrationParams = useAtomValue(successRegistrationParamsAtom);
  const setRegistrationInitValues = useSetAtom(registrationInitValuesAtom);
  const [countdown, setCountdown] = useState(resendAfterSec);

  const { mutate: resendCode, isPending: resendCodePending } =
    useResendEmailVerificationCodeMutation({
      onSuccess: () => {
        toast.success('Код надіслано', {
          description: 'Перевірте вашу електронну пошту',
        });
        setCountdown(resendAfterSec);
        onCodeChange('');
      },
      onError: () => {
        toast.error('Щось пішло не так', {
          description:
            'Будь ласка, спробуйте пізніше або повідомте нам про проблему',
        });
      },
    });

  const handleBack = () => {
    if (successRegistrationParams) {
      const { email, password } = successRegistrationParams;
      setRegistrationInitValues({
        email,
        password,
        confirmPassword: password,
      });
    } else {
      setRegistrationInitValues({ email: searchEmail });
    }
    router.push('/registration');
  };

  return (
    <div className="space-y-3">
      <CountdownButton
        variant="outline"
        className="h-12 w-full gap-3.5 text-base"
        onClick={() => resendCode({ email: searchEmail })}
        text="Надіслати код повторно"
        countdown={countdown}
        onCountdownChange={setCountdown}
        isPending={resendCodePending}
      />
      <Button
        variant="ghost"
        className="h-12 w-full gap-3.5 text-base text-muted-foreground"
        type="button"
        onClick={handleBack}
      >
        <ArrowLeftIcon />
        Змінити email
      </Button>
    </div>
  );
};

export default VerifyEmailActions;
