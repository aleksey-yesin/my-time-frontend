import { FC, PropsWithChildren } from 'react';
import PublicLayoutContent from '@/components/layouts/public-layout-content/public-layout-content';

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return <PublicLayoutContent>{children}</PublicLayoutContent>;
};

export default PublicLayout;
