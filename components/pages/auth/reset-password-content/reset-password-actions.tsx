import { FC, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { toast } from 'sonner';
import CountdownButton from '@/components/ui-custom/countdown-button';
import { Button } from '@/components/ui/button';
import { useForgotPasswordMutation } from '@/lib/api/auth.queries';

interface Props {
  searchEmail: string;
}

const resendAfterSec = 60;

const ResetPasswordActions: FC<Props> = ({ searchEmail }) => {
  const [countdown, setCountdown] = useState(resendAfterSec);

  const { mutate: resendCode, isPending: resendCodePending } =
    useForgotPasswordMutation({
      onSuccess: () => {
        toast.success('Код надіслано', {
          description: 'Перевірте вашу електронну пошту',
        });
        setCountdown(resendAfterSec);
      },
      onError: async (error) => {
        toast.error('Щось пішло не так', {
          description:
            'Будь ласка, спробуйте пізніше або повідомте нам про проблему',
        });
      },
    });

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
        <Link href="/forgot-password">
          <ArrowLeftIcon />
          Змінити email
        </Link>
      </Button>
    </div>
  );
};

export default ResetPasswordActions;
