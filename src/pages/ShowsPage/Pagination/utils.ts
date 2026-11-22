export type PageItem = number | 'gap';

/**
 * Окно страниц вида «1 … 4 5 6 … 12»: всегда первая и последняя,
 * плюс соседние с текущей; пропуски помечаются 'gap'.
 */
export function buildPageItems(current: number, total: number): PageItem[] {
  const numbers = new Set([1, total, current - 1, current, current + 1]);

  const items: PageItem[] = [];
  let previous = 0;
  for (const page of [...numbers].sort((a, b) => a - b)) {
    if (page < 1 || page > total) continue;
    if (page - previous > 1) items.push('gap');
    items.push(page);
    previous = page;
  }

  return items;
}
