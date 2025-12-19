import { FC, PropsWithChildren } from 'react';
import DashboardLayoutContent from '@/components/layouts/dashboard-layout-content/dashboard-layout-content';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
};

export default DashboardLayout;
