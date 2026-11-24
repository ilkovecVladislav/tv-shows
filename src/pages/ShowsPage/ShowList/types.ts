import type { Show } from '../../../types/show';
import type { usePresenter } from './usePresenter';

export interface ShowListProps {
  shows: readonly Show[];
}

export type ShowListViewModel = ReturnType<typeof usePresenter>;
