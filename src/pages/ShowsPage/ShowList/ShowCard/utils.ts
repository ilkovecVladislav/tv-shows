const SUMMARY_LIMIT = 150;

/** До двух первых букв слов названия — плейсхолдер, когда нет постера. */
export function initialsOf(name: string): string {
  const words = name.split(/\s+/).filter((word) => word.length > 0);
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

export function trimSummary(summary: string | null): string | null {
  if (summary === null) return null;
  return summary.length > SUMMARY_LIMIT
    ? `${summary.slice(0, SUMMARY_LIMIT).trimEnd()}…`
    : summary;
}
