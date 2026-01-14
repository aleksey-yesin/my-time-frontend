'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom, hasHydratedAtom } from '@/lib/atoms/auth.atoms';

const redirectPath = '/login';

const PrivateAccess: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const hasHydrated = useAtomValue(hasHydratedAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateAccess;
