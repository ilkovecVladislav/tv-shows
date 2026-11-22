import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
});
