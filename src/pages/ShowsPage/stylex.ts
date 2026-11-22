import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens.stylex';

const spin = stylex.keyframes({
  to: { rotate: '1turn' },
});

export const styles = stylex.create({
  page: {
    minHeight: '100dvh',
    padding: '56px 32px 72px',
    backgroundColor: colors.pageTop,
    backgroundImage:
      'radial-gradient(70rem 40rem at 110% -10%, rgba(255, 200, 221, 0.5), transparent 60%), radial-gradient(60rem 40rem at -20% 10%, rgba(189, 224, 254, 0.5), transparent 60%), radial-gradient(50rem 30rem at 50% 120%, rgba(205, 180, 219, 0.4), transparent 60%)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
    maxWidth: 560,
    margin: '0 auto 44px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.15,
    color: colors.text,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    margin: '0 0 20px',
    fontSize: 15,
    color: colors.textMuted,
  },
  content: {
    maxWidth: 1044,
    margin: '0 auto',
  },
  hint: {
    margin: '56px 0',
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
  stateBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    padding: '72px 0',
  },
  stateText: {
    margin: 0,
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
  retryButton: {
    padding: '10px 28px',
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
    cursor: 'pointer',
    backgroundColor: {
      default: colors.thistle,
      ':hover': '#c1a2d1',
    },
    borderWidth: 0,
    borderRadius: 999,
  },
  resultsMeta: {
    margin: '0 0 20px',
    fontSize: 13,
    color: colors.textMuted,
  },
  spinner: {
    width: 36,
    height: 36,
    borderColor: colors.icyBlue,
    borderStyle: 'solid',
    borderWidth: 3,
    borderTopColor: colors.thistle,
    borderRadius: '50%',
    animationName: spin,
    animationDuration: {
      default: '0.8s',
      '@media (prefers-reduced-motion: reduce)': '4s',
    },
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },
  visuallyHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    clipPath: 'inset(50%)',
  },
});
