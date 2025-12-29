'use client';

import { FC, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCurrentUserWithCompaniesQuery } from '@/lib/api/users.queries';
import {
  hasHydratedAtom,
  isAuthenticatedAtom,
  refreshTokenAtom,
} from '@/lib/atoms/auth.atoms';

const AppInitActions: FC = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const setHasHydrated = useSetAtom(hasHydratedAtom);
  // This line is for starting atom hydration from local storage
  useAtomValue(refreshTokenAtom);

  useCurrentUserWithCompaniesQuery({
    enabled: isAuthenticated,
  });

  useEffect(() => {
    setHasHydrated(true);
  });

  return null;
};

export default AppInitActions;
