import * as stylex from '@stylexjs/stylex';
import { styles } from './stylex';
import type { PaginationProps } from './types';
import { usePresenter } from './usePresenter';

function Pagination(props: PaginationProps) {
  const presenter = usePresenter(props);

  return (
    <nav aria-label="Страницы результатов" {...stylex.props(styles.nav)}>
      <button
        type="button"
        onClick={presenter.goPrev}
        disabled={!presenter.canPrev}
        {...stylex.props(styles.button, styles.wideButton)}
      >
        ‹ Назад
      </button>

      {presenter.items.map((item, index) =>
        typeof item === 'number' ? (
          item === props.currentPage ? (
            <span key={item} aria-current="page" {...stylex.props(styles.currentPage)}>
              {item}
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => presenter.goTo(item)}
              {...stylex.props(styles.button)}
            >
              {item}
            </button>
          )
        ) : (
          <span key={`gap-${index}`} aria-hidden="true" {...stylex.props(styles.gap)}>
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={presenter.goNext}
        disabled={!presenter.canNext}
        {...stylex.props(styles.button, styles.wideButton)}
      >
        Вперёд ›
      </button>
    </nav>
  );
}

export default Pagination;
