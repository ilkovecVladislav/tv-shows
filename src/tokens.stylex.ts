import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineConsts({
  thistle: '#cdb4db',
  pastelPetal: '#ffc8dd',
  babyPink: '#ffafcc',
  icyBlue: '#bde0fe',
  skyBlue: '#a2d2ff',
  text: '#3b2e40',
  textMuted: '#8e7f96',
  surface: '#ffffff',
  surfaceBorder: '#e4d2ea',
  pageTop: '#fdfbff',
});

export const shadows = stylex.defineConsts({
  card: '0 12px 32px rgba(205, 180, 219, 0.28)',
  cardHover: '0 20px 44px rgba(205, 180, 219, 0.45)',
  search: '0 10px 28px rgba(205, 180, 219, 0.35)',
  searchFocus: '0 10px 28px rgba(205, 180, 219, 0.35), 0 0 0 4px rgba(162, 210, 255, 0.4)',
});
