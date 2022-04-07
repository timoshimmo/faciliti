import palette from '../palette';

const muiButton = {
  contained: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    backgroundColor: palette.primary.main,
    '&hover': {
      backgroundColor: palette.primary.dark,
    }
  },
  root:{
    backgroundColor: 'transparent',
    '&hover': {
      backgroundColor: 'transparent',
      color: palette.secondary.main
    }
  }
};

const exportMuiButton = muiButton;

export default muiButton;
