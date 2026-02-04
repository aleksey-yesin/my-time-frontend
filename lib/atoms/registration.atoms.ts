import { atom } from 'jotai';

export interface RegistrationFormData {
  email: string;
  password: string;
}

export const registrationFormDataAtom = atom<RegistrationFormData | null>(null);
