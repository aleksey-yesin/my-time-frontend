'use client';

import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import { getQueryClient } from './query-client';

const RootLayoutClient: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>{children}</JotaiProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default RootLayoutClient;
