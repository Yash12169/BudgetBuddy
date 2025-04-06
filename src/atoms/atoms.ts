import {atom} from 'jotai';

export const themeAtom = atom<string>('dark');
export const userAtom = atom(null);
export const financialAtom = atom(null)
export const emergencyFundAtom = atom(null)