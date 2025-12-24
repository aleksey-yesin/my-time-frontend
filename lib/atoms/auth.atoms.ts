import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// This atom shows next.js application hydration state
export const hasHydratedAtom = atom(false);

export const accessTokenAtom = atomWithStorage<string | null>(
  'access-token',
  null,
);
export const refreshTokenAtom = atomWithStorage<string | null>(
  'refresh-token',
  null,
);
export const isAuthenticatedAtom = atom((get) => !!get(accessTokenAtom));
