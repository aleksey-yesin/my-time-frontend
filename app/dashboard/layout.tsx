import { FC, PropsWithChildren } from 'react';
import DashboardLayoutContent from '@/components/layouts/dashboard-layout-content/dashboard-layout-content';
import PrivateAccess from '@/components/core/private-access';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <PrivateAccess>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </PrivateAccess>
  );
};

export default DashboardLayout;
