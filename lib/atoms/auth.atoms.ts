import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage<string | null>(
  'access-token',
  null,
);
export const refreshTokenAtom = atomWithStorage<string | null>(
  'refresh-token',
  null,
);

export const isAuthenticatedAtom = atom((get) => !!get(accessTokenAtom));
export const isAuthLoadingAtom = atom(true);
