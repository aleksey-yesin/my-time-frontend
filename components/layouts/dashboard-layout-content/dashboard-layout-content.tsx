'use client';

import { FC, PropsWithChildren } from 'react';
import DashboardHeader from './dashboard-header/dashboard-header';

const DashboardLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header>
        <DashboardHeader />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayoutContent;
