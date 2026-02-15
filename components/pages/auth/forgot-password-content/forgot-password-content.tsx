'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { useForgotPasswordMutation } from '@/lib/api/auth.queries';
import { ApiFetchError } from '@/lib/use-api-fetch';
import { Button } from '@/components/ui/button';
import ForgotPasswordHeader from './forgot-password-header';
import ForgotPasswordForm from './forgot-password-form';

const ForgotPasswordContent: FC = () => {
  const router = useRouter();

  const { mutate: forgotPassword, isPending: forgotPasswordPending } =
    useForgotPasswordMutation({
      onSuccess: (_, params) => {
        toast.success('Код надіслано', {
          description: 'Якщо email існує, код було надіслано',
        });
        router.push(
          `/reset-password?email=${encodeURIComponent(params.email)}`,
        );
      },
      onError: async (error) => {
        if (error instanceof ApiFetchError) {
          if (error.response.status === 429) {
            return toast.error('Перевищено ліміт спроб', {
              description:
                'Будь ласка, зачекайте пару хвилин перед наступною спробою',
            });
          }
        }
        toast.error('Щось пішло не так', {
          description:
            'Будь ласка, спробуйте пізніше або повідомте нам про проблему',
        });
      },
    });

  return (
    <div className="space-y-6 p-8 md:p-10">
      <ForgotPasswordHeader />
      <ForgotPasswordForm
        onSubmit={forgotPassword}
        isPending={forgotPasswordPending}
      />

      <div className="flex justify-center pt-2">
        <Button
          variant="ghost"
          className="h-12 w-full cursor-default gap-3.5 text-base text-muted-foreground"
          asChild
        >
          <Link href="/login">
            <ArrowLeftIcon />
            Повернутися до входу
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordContent;
