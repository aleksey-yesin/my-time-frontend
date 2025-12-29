import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type TokenValue = string | null;

// This atom shows next.js application hydration state
export const hasHydratedAtom = atom(false);

export const accessTokenAtom = atomWithStorage<TokenValue>(
  'access-token',
  null,
);
export const refreshTokenAtom = atomWithStorage<TokenValue>(
  'refresh-token',
  null,
);

export const isAuthenticatedAtom = atom((get) => !!get(accessTokenAtom));

export const setTokensAtom = atom(
  undefined,
  (_, set, tokens: { access: TokenValue; refresh: TokenValue }) => {
    set(accessTokenAtom, tokens.access);
    set(refreshTokenAtom, tokens.refresh);
  },
);
