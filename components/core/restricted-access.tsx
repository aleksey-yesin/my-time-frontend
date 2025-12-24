'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom, hasHydratedAtom } from '@/lib/atoms/auth.atoms';

const redirectPath = '/dashboard';

const RestrictedAccess: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const hasHydrated = useAtomValue(hasHydratedAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, router]);

  if (!hasHydrated || isAuthenticated) {
    return null;
  }

  return children;
};

export default RestrictedAccess;
