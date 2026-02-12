import { useCallback, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { eightCharId } from '@/lib/utils';
import {
  historyPointByIdAtom,
  pushHistoryPointAtom,
  removeHistoryPointAtom,
} from '@/lib/atoms/navigation.atoms';

export function useNavigateBack(defaultBackUrl?: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const backHistoryPoint = useAtomValue(
    historyPointByIdAtom(searchParams.get('back-id')),
  );
  const pushHistoryPoint = useSetAtom(pushHistoryPointAtom);
  const removeHistoryPoint = useSetAtom(removeHistoryPointAtom);

  const backUrl = backHistoryPoint
    ? `${backHistoryPoint.pathname}?${backHistoryPoint.searchParams}`
    : defaultBackUrl;

  const historyPointId = useMemo(() => eightCharId(), []);

  const pushCurrentPoint = useCallback(() => {
    pushHistoryPoint({
      id: historyPointId,
      pathname,
      searchParams: searchParams.toString(),
    });
  }, [pushHistoryPoint, historyPointId, pathname, searchParams]);

  return {
    historyPointId,
    pushCurrentPoint,
    backUrl,
  };
}
