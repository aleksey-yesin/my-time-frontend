'use client';

import { FC, PropsWithChildren } from 'react';

const AuthLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayoutContent;
