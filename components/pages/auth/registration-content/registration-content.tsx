'use client';

import { FC } from 'react';
import { useSetAtom } from 'jotai';
import { useRegisterMutation } from '@/lib/api/auth.queries';
import { setTokenPairAtom } from '@/lib/atoms/auth.atoms';
import RegistrationContentHeader from './registration-content-header';
import RegistrationForm from './registration-form';
import RegistrationDivider from './registration-divider';
import GoogleButton from '../login-content/google-button/google-button';
import RegistrationContentFooter from './registration-content-footer';

const RegistrationContent: FC = () => {
  const setTokenPair = useSetAtom(setTokenPairAtom);

  const { mutate: register } = useRegisterMutation({
    onSuccess: (data) => {
      setTokenPair({
        access: data.access_token,
        refresh: data.refresh_token,
      });
    },
  });

  return (
    <div className="space-y-6 p-8 md:p-10">
      <RegistrationContentHeader />
      <RegistrationForm onSubmit={register} />
      <RegistrationDivider />
      <GoogleButton />
      <RegistrationContentFooter />
    </div>
  );
};

export default RegistrationContent;
