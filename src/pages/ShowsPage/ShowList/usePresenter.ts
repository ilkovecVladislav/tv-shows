import type { ShowListProps } from './types';

export function usePresenter({ shows }: ShowListProps) {
  return { shows };
}
