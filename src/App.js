import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { history } from './helpers';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './App.css';
import validate from 'validate.js';
import validators from './common/validators';
import Routes from './Routes';

validate.validators = {
  ...validate.validators,
  ...validators
};


export default class App extends Component {
  render() {
    return (
        <Router history={history}>
          <ThemeProvider theme={theme}>
              <Routes />
          </ThemeProvider>
        </Router>
    );
  }
}
