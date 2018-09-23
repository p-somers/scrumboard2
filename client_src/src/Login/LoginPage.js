import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import LoginFormWindow from "../components/LoginFormWindow";
import RegisterFormWindow from "../components/RegisterFormWindow";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    'prevPage': 'login',
    'userConfirmed': false
  };

  onRegister = () => () => {
    this.setState({userConfirmed: true, page: 'login'});
  };


  changePage = page => () => {
    this.setState({page});
  };

  onFieldChanged = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  content() {
    switch (this.state.page) {
      case 'login':
        return (
          <LoginFormWindow
            handleChange={this.onFieldChanged}
            onRegisterButton={this.changePage('register')}
            onLogin={this.props.onLogin}
          />
        );
      case 'register':
        return (
          <RegisterFormWindow
            //handleChange={this.onFieldChanged}
            onRegister={this.onRegister()}
            onBackButton={this.changePage('login')}
            onSubmitButton={this.registerUser}
          />
        );
      default:
        return;
    }
  }

  render() {
    let {classes} = this.props;
    return (
      <React.Fragment>
        {this.content()}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.userConfirmed}
          onClose={this.onSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span>User Created! Please login</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.onSnackbarClose}
            >
              <CloseIcon/>
            </IconButton>,
          ]}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LoginPage);
