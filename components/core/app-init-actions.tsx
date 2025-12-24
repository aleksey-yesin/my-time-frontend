'use client';

import { useCurrentUserWithCompaniesQuery } from '@/lib/api/users.queries';
import { hasHydratedAtom, isAuthenticatedAtom } from '@/lib/atoms/auth.atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { FC, useEffect } from 'react';

const AppInitActions: FC = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const setHasHydrated = useSetAtom(hasHydratedAtom);

  useCurrentUserWithCompaniesQuery({
    enabled: isAuthenticated,
  });

  useEffect(() => {
    setHasHydrated(true);
  });

  return null;
};

export default AppInitActions;
