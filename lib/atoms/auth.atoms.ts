import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessToken = atomWithStorage<string | null>('access-token', null);
export const refreshToken = atomWithStorage<string | null>(
  'refresh-token',
  null,
);
export const isAuthenticated = atom((get) => !!get(accessToken));
