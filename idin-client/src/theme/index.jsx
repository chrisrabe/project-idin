import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
});

export const muiTheme = responsiveFontSizes(theme);
