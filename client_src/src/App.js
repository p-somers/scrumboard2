import React, {Component} from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import HomePage from './HomePage';
import LoginPage from './Login/LoginPage';

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightMedium: 500,
    body1: {
      fontWeight: 500,
    },
    subheading: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic',
    },
  },
  palette: {
    primary: {
      main: '#9FA87B',
      light: '#d0d9aa',
      dark: '#70794f'
    },
    secondary: {
      light: '#fff196',
      main: '#dbbf66',
      dark: 'a78f38',
      contrastText: '#ffcc00',
    },
  }
});

class App extends Component {
  state = {
    userId: localStorage.getItem('userId'),
    teams: []
  };

  setUserFromToken = token => {
    localStorage.setItem('userId', token.userId);
    this.setState({userId: token.userId});
  };

  render() {
    return (
      <MuiThemeProvider
        //theme={theme}
        >
        <CssBaseline/>
        { this.state.userId ?
          (<HomePage userId={ this.state.userId }/>) :
          (<LoginPage
            onLogin={ this.setUserFromToken }
          />) }
      </MuiThemeProvider>
    );
  };
}

export default App;
