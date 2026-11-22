import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../tokens.stylex';

export const styles = stylex.create({
  nav: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '36px 0 0',
  },
  button: {
    minWidth: 38,
    height: 38,
    padding: '0 10px',
    fontSize: 14,
    color: colors.text,
    cursor: {
      default: 'pointer',
      ':disabled': 'default',
    },
    backgroundColor: {
      default: 'transparent',
      ':disabled': 'transparent',
      ':hover': '#f3eaf7',
    },
    borderRadius: 10,
    opacity: {
      default: 1,
      ':disabled': 0.35,
    },
  },
  wideButton: {
    padding: '0 14px',
  },
  currentPage: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 38,
    height: 38,
    padding: '0 10px',
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
    backgroundColor: colors.thistle,
    borderRadius: 10,
  },
  gap: {
    padding: '0 6px',
    color: colors.textMuted,
  },
});
