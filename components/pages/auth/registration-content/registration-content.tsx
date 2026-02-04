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
import RegistrationContentHeader from './registration-content-header';
import RegistrationForm, { RegistrationFormValues } from './registration-form';
import RegistrationContentFooter from './registration-content-footer';

const RegistrationContent: FC = () => {
  const router = useRouter();

  const [registrationInitValues, setRegistrationInitValues] = useAtom(
    registrationInitValuesAtom,
  );
  const setSuccessRegistrationParams = useSetAtom(
    successRegistrationParamsAtom,
  );

  const { mutate: register, isPending: registerPending } = useRegisterMutation({
    onSuccess: (_, params) => {
      setSuccessRegistrationParams(params);
      router.push(`/verify-email?email=${encodeURIComponent(params.email)}`);
    },
    onError: (error) => {
      if (error.message.includes('already exists')) {
        toast.error('Користувач з таким email вже існує', {
          description: 'Спробуйте увійти або скористайтеся іншим email',
          action: {
            label: 'Увійти',
            onClick: () => router.push('/login'),
          },
        });
      }
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
      <RegistrationContentHeader />
      <RegistrationForm
        onSubmit={handleSubmit}
        isPending={registerPending}
        defaultValues={registrationInitValues}
      />
      <SeparatorWithText text="або" />
      <GoogleButton />
      <RegistrationContentFooter />
    </div>
  );
};

export default RegistrationContent;
