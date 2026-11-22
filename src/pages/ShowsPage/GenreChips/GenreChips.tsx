import * as stylex from '@stylexjs/stylex';
import { chipPalette, styles } from './stylex';
import type { GenreChipItem, GenreChipsProps } from './types';
import { usePresenter } from './usePresenter';

function GenreChips(props: GenreChipsProps) {
  const presenter = usePresenter(props);

  return (
    <div {...stylex.props(styles.row)}>
      {presenter.items.map((item) => (
        <ChipButton key={item.key} item={item} onSelect={presenter.handleSelect} />
      ))}
    </div>
  );
}

function ChipButton({ item, onSelect }: { item: GenreChipItem; onSelect: (item: GenreChipItem) => void }) {
  return (
    <button
      type="button"
      aria-pressed={item.isActive}
      onClick={() => onSelect(item)}
      {...stylex.props(
        styles.chip,
        item.isActive && [
          styles.chipActive,
          item.variant === null ? styles.chipActiveNeutral : chipPalette[item.variant],
        ],
      )}
    >
      {item.variant !== null && !item.isActive && (
        <span aria-hidden="true" {...stylex.props(styles.dot, chipPalette[item.variant])} />
      )}
      {item.label}
    </button>
  );
}

export default GenreChips;
