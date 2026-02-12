import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { eightCharId } from '@/lib/utils';
import {
  type HistoryPoint,
  historyPointByIdAtom,
  pushHistoryPointAtom,
  removeHistoryPointAtom,
} from '@/lib/atoms/navigation.atoms';

type UseNavigateBackResult = {
  backHistoryPoint: HistoryPoint | undefined;
  historyPointId: string;
  pushCurrentPoint: () => void;
  removeBackHistoryPoint: () => void;
  navigateBack: () => void;
};

function useNavigateBack(
  defaultBackUrl: string,
): UseNavigateBackResult & { backUrl: string };
function useNavigateBack(
  defaultBackUrl?: string,
): UseNavigateBackResult & { backUrl: string | undefined };

function useNavigateBack(defaultBackUrl?: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const removeBackHistoryPoint = useCallback(() => {
    if (backHistoryPoint) {
      removeHistoryPoint(backHistoryPoint.id);
    }
  }, [backHistoryPoint, removeHistoryPoint]);

  const navigateBack = useCallback(() => {
    removeBackHistoryPoint();
    if (backUrl) {
      router.push(backUrl);
    }
  }, [removeBackHistoryPoint, backUrl, router]);

  return {
    backHistoryPoint,
    backUrl,
    historyPointId,
    pushCurrentPoint,
    removeBackHistoryPoint,
    navigateBack,
  };
}

export default useNavigateBack;
