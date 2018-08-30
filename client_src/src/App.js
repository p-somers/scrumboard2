import React, {Component} from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import HomePage from './HomePage';
import LoginPage from './Login/LoginPage';

const theme = createMuiTheme({
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
    teams: []
  };

  onRegisterButtonClick() {

  }

  setUserFromToken = token => {
    this.setState({userId: token.userId});
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        { this.state.userId ?
          (<HomePage userId={ this.state.userId }/>) :
          (<LoginPage
            onLogin={ this.setUserFromToken }
            onRegisterButtonClick={ this.onRegisterButtonClick }
          />) }
      </MuiThemeProvider>
    );
  };
}

export default App;
