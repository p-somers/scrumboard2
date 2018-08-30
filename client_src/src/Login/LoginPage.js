import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import LoginFormWindow from "../components/LoginFormWindow";
import RegisterFormWindow from "../components/RegisterFormWindow";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    width: '100%'
  },
  alignLeft: {
    'align-self': 'flex-start'
  },
  alignRight: {
    'align-self': 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class LoginPage extends React.Component {
  state = {
    'page': 'login',
    'prevPage': 'login'
  };

  changePage = page => () => {
    this.setState({page});
  };

  render() {
    switch(this.state.page) {
      case 'login':
        return (
          <LoginFormWindow onRegisterButton={this.changePage('register')}/>
        );
      case 'register':
        return (
          <RegisterFormWindow onBackButton={this.changePage('login')}/>
        );
      default:
        return;
    }
  }
}

export default withStyles(styles)(LoginPage);
