'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom, useSetAtom } from 'jotai';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/lib/api/auth.queries';
import {
  registrationInitValuesAtom,
  successRegistrationParamsAtom,
} from '@/lib/atoms/auth.atoms';
import SeparatorWithText from '@/components/ui-custom/separator-with-text';
import GoogleButton from '@/components/ui-custom/google-button/google-button';
import { ApiFetchError } from '@/lib/use-api-fetch';
import useNavigateBack from '@/hooks/use-navigate-back';
import RegistrationHeader from './registration-header';
import RegistrationForm, { RegistrationFormValues } from './registration-form';
import RegistrationFooter from './registration-footer';

const RegistrationContent: FC = () => {
  const router = useRouter();
  const { pushCurrentPoint, historyPointId } = useNavigateBack();

  const [registrationInitValues, setRegistrationInitValues] = useAtom(
    registrationInitValuesAtom,
  );
  const setSuccessRegistrationParams = useSetAtom(
    successRegistrationParamsAtom,
  );

  const { mutate: register, isPending: registerPending } = useRegisterMutation({
    onSuccess: (_, params) => {
      setSuccessRegistrationParams(params);
      pushCurrentPoint();
      router.push(
        `/verify-email?email=${encodeURIComponent(params.email)}&back-id=${historyPointId}`,
      );
    },
    onError: async (error) => {
      if (error instanceof ApiFetchError) {
        const json = await error.response.json();

        if (json.message.includes?.('already exists')) {
          return toast.error('Користувач з таким email вже існує', {
            description: 'Спробуйте увійти або скористайтеся іншим email',
            action: {
              label: 'Увійти',
              onClick: () => router.push('/login'),
            },
          });
        }
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

  const handleSubmit = (values: RegistrationFormValues) => {
    register({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    // RHF won't change values after mount
    setRegistrationInitValues(null);
  }, [setRegistrationInitValues]);

  return (
    <div className="space-y-6 p-8 md:p-10">
      <RegistrationHeader />
      <RegistrationForm
        onSubmit={handleSubmit}
        isPending={registerPending}
        defaultValues={registrationInitValues}
      />
      <SeparatorWithText text="або" />
      <GoogleButton />
      <RegistrationFooter />
    </div>
  );
};

export default RegistrationContent;
