'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom, isAuthLoadingAtom } from '@/lib/atoms/auth.atoms';

const redirectPath = '/dashboard';

const RestrictedAccess: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading || isAuthenticated) {
    return null;
  }

  return children;
};

export default RestrictedAccess;
