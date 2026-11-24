/** Сериал в виде, в котором его отдаёт API. */
export interface Show {
  id: number;
  name: string;
  genres: string[];
  year: string | null;
  rating: number | null;
  image: string | null;
  summary: string | null;
}

/** Что клиент запрашивает у API: поисковый запрос, жанр и страница. */
export interface ShowSearchParams {
  query: string;
  genre: string | null;
  page: number;
}

/** Одна страница выдачи и метаданные, по которым строится интерфейс. */
export interface ShowSearchResult {
  shows: Show[];
  /** жанры всей выдачи — из них клиент рисует чипы фильтра */
  genres: string[];
  /** жанр, который сервер реально применил как фильтр */
  genre: string | null;
  /** сколько всего сериалов нашлось */
  totalFound: number;
  /** сколько из них осталось после фильтра по жанру */
  shownCount: number;
  page: number;
  totalPages: number;
}
