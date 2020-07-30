import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      main: '#52BFE2',
    },
  },
});

export const muiTheme = responsiveFontSizes(theme);
