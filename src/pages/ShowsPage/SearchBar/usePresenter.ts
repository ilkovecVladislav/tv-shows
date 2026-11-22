import { useCallback, useId } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { SearchBarProps } from './types';

export function usePresenter({ value, onChange, onSubmit }: SearchBarProps) {
  const inputId = useId();

  // нативный сабмит формы: Enter ищет сразу, IME-композиция браузером не сабмитится
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange],
  );

  return { inputId, value, handleSubmit, handleChange };
}
