import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
const primaryMain = '#1B75BC';
const primaryDark = '#1a5faf';
const primaryLight = '#D3ECFF';

 const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    dark: primaryDark,
    main: primaryMain,
    light: primaryLight
  },
  secondary: {
    contrastText: colors.blue[900],
    dark: '#494949',
    main: '#8692A6',
    light: '#F5F5F5'
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
    veryLight: 'rgba(79, 188, 27, 0.2)'
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
    veryLight: 'rgba(188, 66, 27, 0.2)'
  },
  text: {
    primary: '#696F79',
    secondary: '#8692A6',
    link: '#1B75BC',
    title:'#2D2D2D'
  },
  background: {
    default: '#F4F6F8',
    paper: white,
    light: 'rgba(210, 210, 210, 0.2)',
    lightBlue: '#F9FBFC',
    lightShade: 'rgba(27, 117, 188, 0.2)'
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
  priority: {
    red: '#FF0000',
    blue: '#0057FF',
    green: '#1CC500'
  },
  orders: {
    orange: '#FFB03A',
    green: '#1BBC2B',
    orangeIcon: '#FF9900',
    blueIcon: '#2B81C6',
    greenIcon: '#12AD22'
  }
};

export default palette;
