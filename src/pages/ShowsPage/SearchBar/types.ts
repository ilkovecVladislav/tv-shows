import type { usePresenter } from './usePresenter';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export type SearchBarPresenter = ReturnType<typeof usePresenter>;
