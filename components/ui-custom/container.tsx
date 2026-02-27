import { FC } from 'react';
import { cn } from '@/lib/utils';

export type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

export default Container;
