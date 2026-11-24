import type { Show } from '../../../../types/show';
import type { usePresenter } from './usePresenter';

export interface ShowCardProps {
  show: Show;
}

export type ShowCardViewModel = ReturnType<typeof usePresenter>;
