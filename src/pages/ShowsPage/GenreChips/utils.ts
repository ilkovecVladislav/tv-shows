/** Детерминированный индекс 0–4, чтобы жанр всегда получал один и тот же пастельный цвет. */
export function genreVariant(genre: string): number {
  let hash = 0;
  for (let i = 0; i < genre.length; i += 1) {
    hash = (hash + genre.charCodeAt(i) * (i + 1)) % 997;
  }
  return hash % 5;
}
