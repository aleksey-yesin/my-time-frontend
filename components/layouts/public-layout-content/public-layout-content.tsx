import { FC, PropsWithChildren } from 'react';
import PublicHeader from './public-header/public-header';

const PublicLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr]">
      <header>
        <PublicHeader />
      </header>

      <main className="overflow-y-auto">{children}</main>
    </div>
  );
};

export default PublicLayoutContent;
