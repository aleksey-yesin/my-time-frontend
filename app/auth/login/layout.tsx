import AuthLayoutContent from '@/components/layouts/auth-layout-content/auth-layout-content';
import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return <AuthLayoutContent>{children}</AuthLayoutContent>;
};

export default AuthLayout;
