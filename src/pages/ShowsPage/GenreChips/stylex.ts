import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../tokens.stylex';

export const styles = stylex.create({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    margin: '0 0 16px',
  },
  chip: {
    display: 'inline-flex',
    gap: 8,
    alignItems: 'center',
    padding: '8px 16px',
    fontSize: 13,
    fontWeight: 500,
    color: colors.text,
    cursor: 'pointer',
    backgroundColor: {
      default: colors.surface,
      ':hover': '#f5eef9',
    },
    borderColor: {
      default: colors.surfaceBorder,
      ':hover': colors.skyBlue,
    },
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 999,
  },
  chipActive: {
    fontWeight: 600,
    borderColor: 'transparent',
  },
  chipActiveNeutral: {
    backgroundColor: '#e7d5f0',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
});

const palette = stylex.create({
  thistle: { backgroundColor: colors.thistle },
  pastelPetal: { backgroundColor: colors.pastelPetal },
  babyPink: { backgroundColor: colors.babyPink },
  icyBlue: { backgroundColor: colors.icyBlue },
  skyBlue: { backgroundColor: colors.skyBlue },
});

/** Заливка активного чипа и цветная точка — порядок повторяет палитру проекта. */
export const chipPalette = [
  palette.thistle,
  palette.pastelPetal,
  palette.babyPink,
  palette.icyBlue,
  palette.skyBlue,
];
