import { FC, useState } from 'react';
import Link from 'next/link';
import { useAtomValue, useSetAtom } from 'jotai';
import { ArrowLeftIcon } from 'lucide-react';
import { toast } from 'sonner';
import CountdownButton from '@/components/ui-custom/countdown-button';
import { Button } from '@/components/ui/button';
import { useResendEmailVerificationCodeMutation } from '@/lib/api/auth.queries';
import {
  registrationInitValuesAtom,
  successRegistrationParamsAtom,
} from '@/lib/atoms/auth.atoms';
import useNavigateBack from '@/hooks/use-navigate-back';

interface Props {
  onCodeChange: (newCode: string) => void;
  searchEmail: string;
}

const resendAfterSec = 60;

const VerifyEmailActions: FC<Props> = ({ onCodeChange, searchEmail }) => {
  const successRegistrationParams = useAtomValue(successRegistrationParamsAtom);
  const setRegistrationInitValues = useSetAtom(registrationInitValuesAtom);

  const [countdown, setCountdown] = useState(resendAfterSec);
  const [forkedRegistrationParams] = useState(successRegistrationParams);

  const { backHistoryPoint, removeBackHistoryPoint, backUrl } =
    useNavigateBack('/registration');

  const isBackToLogin = backHistoryPoint?.pathname === '/login';

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

  const handleNavigateBack = () => {
    removeBackHistoryPoint();
    if (isBackToLogin) return;

    if (forkedRegistrationParams) {
      const { email, password } = forkedRegistrationParams;
      setRegistrationInitValues({
        email,
        password,
        confirmPassword: password,
      });
    } else {
      setRegistrationInitValues({ email: searchEmail });
    }
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
        className="h-12 w-full cursor-default gap-3.5 text-base text-muted-foreground"
        asChild
      >
        <Link href={backUrl} onNavigate={handleNavigateBack}>
          <ArrowLeftIcon />
          {isBackToLogin ? 'Увійти в інший акаунт' : 'Змінити email'}
        </Link>
      </Button>
    </div>
  );
};

export default VerifyEmailActions;
