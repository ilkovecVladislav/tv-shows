import * as stylex from '@stylexjs/stylex';
import { styles } from './stylex';
import type { SearchBarProps } from './types';
import { usePresenter } from './usePresenter';

function SearchBar(props: SearchBarProps) {
  const presenter = usePresenter(props);

  return (
    <search {...stylex.props(styles.search)}>
      <form onSubmit={presenter.handleSubmit} {...stylex.props(styles.form)}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          {...stylex.props(styles.icon)}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.8-3.8" />
        </svg>
        <label htmlFor={presenter.inputId} {...stylex.props(styles.label)}>
          Поиск сериала
        </label>
        <input
          id={presenter.inputId}
          type="search"
          name="q"
          value={presenter.value}
          placeholder="Поиск сериала…"
          autoComplete="off"
          enterKeyHint="search"
          spellCheck={false}
          onChange={presenter.handleChange}
          {...stylex.props(styles.input)}
        />
      </form>
    </search>
  );
}

export default SearchBar;
