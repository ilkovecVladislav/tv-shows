import * as stylex from '@stylexjs/stylex';
import { colors, shadows } from '../../../../tokens.stylex';

export const styles = stylex.create({
  card: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderColor: colors.surfaceBorder,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    boxShadow: {
      default: shadows.card,
      ':hover': shadows.cardHover,
    },
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-4px)',
    },
    transitionTimingFunction: 'ease',
    transitionDuration: {
      default: '160ms',
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionProperty: 'transform, box-shadow',
  },
  poster: {
    display: 'block',
    width: '100%',
    height: 'auto',
    aspectRatio: '2 / 3',
    objectFit: 'cover',
    backgroundColor: '#f3ecf8',
  },
  posterFallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '2 / 3',
    fontSize: 40,
    fontWeight: 700,
    color: '#5d4a66',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'flex-start',
    padding: 16,
  },
  name: {
    margin: 0,
    fontSize: 17,
    fontWeight: 650,
    lineHeight: 1.3,
    color: colors.text,
  },
  meta: {
    display: 'flex',
    gap: 12,
    margin: 0,
    fontSize: 13,
    color: colors.textMuted,
  },
  rating: {
    color: '#8a5fb0',
  },
  genres: {
    margin: 0,
    fontSize: 12,
    color: '#a37fb8',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  summary: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.55,
    color: colors.textMuted,
  },
});

const gradients = stylex.create({
  a: { backgroundImage: 'linear-gradient(135deg, #cdb4db, #a2d2ff)' },
  b: { backgroundImage: 'linear-gradient(135deg, #ffc8dd, #cdb4db)' },
  c: { backgroundImage: 'linear-gradient(135deg, #bde0fe, #ffafcc)' },
  d: { backgroundImage: 'linear-gradient(135deg, #ffafcc, #ffc8dd)' },
  e: { backgroundImage: 'linear-gradient(135deg, #a2d2ff, #bde0fe)' },
});

/** Пастельные градиенты для постеров-заглушек. */
export const posterGradients = [gradients.a, gradients.b, gradients.c, gradients.d, gradients.e];
