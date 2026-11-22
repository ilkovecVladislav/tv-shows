import * as stylex from '@stylexjs/stylex';
import { posterGradients, styles } from './stylex';
import type { ShowCardProps } from './types';
import { usePresenter } from './usePresenter';

function ShowCard(props: ShowCardProps) {
  const presenter = usePresenter(props);
  const { show } = presenter;

  return (
    <article {...stylex.props(styles.card)}>
      {show.image !== null ? (
        <img
          src={show.image}
          alt={show.name}
          width={210}
          height={295}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.poster)}
        />
      ) : (
        <div aria-hidden="true" {...stylex.props(styles.posterFallback, posterGradients[presenter.variant])}>
          {presenter.initials}
        </div>
      )}

      <div {...stylex.props(styles.body)}>
        <h3 {...stylex.props(styles.name)}>{show.name}</h3>
        <p {...stylex.props(styles.meta)}>
          <span>{presenter.year}</span>
          {presenter.rating !== null && (
            <span {...stylex.props(styles.rating)}>★ {presenter.rating}</span>
          )}
        </p>
        {presenter.genres !== '' && <p {...stylex.props(styles.genres)}>{presenter.genres}</p>}
        {presenter.summary !== null && (
          <p {...stylex.props(styles.summary)}>{presenter.summary}</p>
        )}
      </div>
    </article>
  );
}

export default ShowCard;
