import { atom } from 'jotai';
import { atomFamily } from 'jotai-family';
import { atomWithStorage } from 'jotai/utils';

// ****************************************************************************
// Back navigation history

export type HistoryPoint = {
  id: string;
  pathname: string;
  searchParams: string;
};

export const historyAtom = atomWithStorage<HistoryPoint[]>('history', []);

export const historyPointByIdAtom = atomFamily((pointId: string | null) => {
  return atom((get) => {
    if (!pointId) {
      return undefined;
    }
    const history = get(historyAtom);
    return history.find((point) => point.id === pointId);
  });
});
export const pushHistoryPointAtom = atom(
  undefined,
  (_, set, point: HistoryPoint) => {
    set(historyAtom, (history) => [...history, point].slice(-3));
  },
);
export const removeHistoryPointAtom = atom(
  undefined,
  (_, set, pointId: string) => {
    set(historyAtom, (history) =>
      history.filter((point) => point.id !== pointId),
    );
  },
);
