'use client';

import { FC, PropsWithChildren } from 'react';

const DashboardLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header>DashboardLayoutContent - header</header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayoutContent;
