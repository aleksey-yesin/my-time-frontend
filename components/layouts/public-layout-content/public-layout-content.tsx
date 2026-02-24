import { FC, PropsWithChildren } from 'react';
import Header from '../header/header';

const PublicLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr]">
      <header>
        <Header />
      </header>

      <main className="overflow-y-auto">{children}</main>
    </div>
  );
};

export default PublicLayoutContent;
