import * as stylex from '@stylexjs/stylex';
import GenreChips from './GenreChips';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { styles } from './stylex';
import ShowList from './ShowList';
import { usePresenter } from './logic/usePresenter';

function ShowsPage() {
  const presenter = usePresenter();
  const hasResults = presenter.status === 'success' && presenter.totalFound > 0;

  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>TV Shows Explorer</h1>
        <p {...stylex.props(styles.subtitle)}>
          Поиск сериалов по открытой базе TVmaze
        </p>
        <SearchBar
          value={presenter.query}
          onChange={presenter.onQueryChange}
          onSubmit={presenter.onSubmit}
        />
      </header>

      <main aria-busy={presenter.status === 'loading'} {...stylex.props(styles.content)}>
        {presenter.status === 'idle' && (
          <p {...stylex.props(styles.hint)}>
            Начните вводить название — например, Banana или Murder
          </p>
        )}

        {presenter.status === 'loading' && (
          <div role="status" {...stylex.props(styles.stateBlock)}>
            <progress aria-label="Загрузка результатов" {...stylex.props(styles.visuallyHidden)} />
            <div aria-hidden="true" {...stylex.props(styles.spinner)} />
          </div>
        )}

        {presenter.status === 'error' && (
          <div role="status" {...stylex.props(styles.stateBlock)}>
            <p {...stylex.props(styles.stateText)}>
              Не удалось загрузить результаты. Проверьте подключение к сети.
            </p>
            <button type="button" onClick={presenter.onRetry} {...stylex.props(styles.retryButton)}>
              Повторить
            </button>
          </div>
        )}

        {presenter.status === 'success' && presenter.totalFound === 0 && (
          <p role="status" {...stylex.props(styles.hint)}>
            По запросу «{presenter.searchedQuery}» ничего не найдено
          </p>
        )}

        {hasResults && (
          <>
            <GenreChips
              genres={presenter.genres}
              selected={presenter.activeGenre}
              onSelect={presenter.onGenreSelect}
            />
            <p {...stylex.props(styles.resultsMeta)}>
              Найдено: {presenter.totalFound}
              {presenter.activeGenre !== null &&
                ` · ${presenter.activeGenre}: ${presenter.shownCount}`}
            </p>
            <ShowList shows={presenter.shows} />
            {presenter.totalPages > 1 && (
              <Pagination
                currentPage={presenter.currentPage}
                totalPages={presenter.totalPages}
                onChange={presenter.onPageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ShowsPage;
