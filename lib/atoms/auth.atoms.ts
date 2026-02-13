import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { RegistrationFormValues } from '@/components/pages/auth/registration-content/registration-form';
import { RegisterParams } from '@/lib/api/auth.queries';

// ****************************************************************************
// Global

type TokenValue = string | null;

interface TokenPair {
  access: TokenValue;
  refresh: TokenValue;
}

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

export const setTokenPairAtom = atom(undefined, (_, set, tokens: TokenPair) => {
  set(accessTokenAtom, tokens.access);
  set(refreshTokenAtom, tokens.refresh);
});
export const unsetTokenPairAtom = atom(undefined, (_, set) => {
  set(accessTokenAtom, null);
  set(refreshTokenAtom, null);
});

// ****************************************************************************
// Registration flow

export const successRegistrationParamsAtom = atom<RegisterParams | null>(null);
export const registrationInitValuesAtom =
  atom<Partial<RegistrationFormValues> | null>(null);
