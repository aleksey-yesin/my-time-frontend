'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/lib/api/auth.queries';
import { registrationInitValuesAtom } from '@/lib/atoms/auth.atoms';
import SeparatorWithText from '@/components/ui-custom/separator-with-text';
import GoogleButton from '@/components/ui-custom/google-button/google-button';
import RegistrationContentHeader from './registration-content-header';
import RegistrationForm, { RegistrationFormValues } from './registration-form';
import RegistrationContentFooter from './registration-content-footer';

const RegistrationContent: FC = () => {
  const router = useRouter();
  const [registrationFormData, setRegistrationFormData] = useAtom(
    registrationInitValuesAtom,
  );

  const { mutate: register, isPending } = useRegisterMutation({
    onSuccess: (_, variables) => {
      setRegistrationFormData({
        email: variables.email,
        password: variables.password,
      });
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      if (
        error.message.includes('already exists') ||
        error.message.includes('вже існує')
      ) {
        toast.error('Користувач з таким email вже існує', {
          description: 'Спробуйте увійти або скористайтеся іншим email.',
          action: {
            label: 'Увійти',
            onClick: () => router.push('/login'),
          },
        });
      } else {
        toast.error('Помилка реєстрації', {
          description: error.message,
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

  // Get initial values from atom and clear them
  const initialValues = registrationFormData
    ? {
        email: registrationFormData.email,
        password: registrationFormData.password,
        confirmPassword: registrationFormData.password,
      }
    : undefined;

  useEffect(() => {
    if (registrationFormData) {
      setRegistrationFormData(null);
    }
  }, []);

  return (
    <div className="space-y-6 p-8 md:p-10">
      <RegistrationContentHeader />
      <RegistrationForm
        onSubmit={handleSubmit}
        isPending={isPending}
        initialValues={initialValues}
      />
      <SeparatorWithText text="або" />
      <GoogleButton />
      <RegistrationContentFooter />
    </div>
  );
};

export default RegistrationContent;
