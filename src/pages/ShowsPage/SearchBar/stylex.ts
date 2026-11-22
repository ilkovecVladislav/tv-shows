import * as stylex from '@stylexjs/stylex';
import { colors, shadows } from '../../../tokens.stylex';

export const styles = stylex.create({
  search: {
    display: 'block',
    width: '100%',
    margin: '8px 0 0',
  },
  form: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    padding: '4px 22px',
    backgroundColor: colors.surface,
    borderColor: {
      default: colors.surfaceBorder,
      ':focus-within': colors.skyBlue,
    },
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 999,
    boxShadow: {
      default: shadows.search,
      ':focus-within': shadows.searchFocus,
    },
  },
  icon: {
    flexShrink: 0,
    width: 18,
    height: 18,
    color: colors.textMuted,
  },
  input: {
    flexGrow: 1,
    minWidth: 0,
    padding: '12px 0',
    fontSize: 16,
    color: colors.text,
    outline: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    '::placeholder': {
      color: colors.textMuted,
    },
  },
  label: {
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
