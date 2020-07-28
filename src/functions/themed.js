import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../constants/theme';

export default (Component) => (props) => (
  <ThemeProvider theme={theme}>
    <Component {...props} />
  </ThemeProvider>
);
