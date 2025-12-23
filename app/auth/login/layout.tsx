import { FC, PropsWithChildren } from 'react';
import RestrictedAccess from '@/components/core/restricted-access';
import AuthLayoutContent from '@/components/layouts/auth-layout-content/auth-layout-content';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RestrictedAccess>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </RestrictedAccess>
  );
};

export default AuthLayout;
