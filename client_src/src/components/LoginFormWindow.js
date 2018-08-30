import React from 'react';
import FormWindow from "./FormWindow";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import VisibilityOff from "@material-ui/core/SvgIcon/SvgIcon";
import Visibility from '@material-ui/icons/Visibility';

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
});

class LoginFormWindow extends React.Component {
  state = {
    username: '',
    password: ''
  };

  constructor(props) {
    super(props);
    this.buttons = {
      'left': [{
        'text': 'Submit',
        'variant': 'outlined',
        'action': this.handleLoginButton()
      }],
      'right': [{
        'text': 'Register',
        'action': this.handleRegisterButton()
      }]
    };
  }

  handleLoginButton = () => () => {

  };

  handleRegisterButton = () => () => {
    this.props.onRegisterButton();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    let {classes} = this.props;
    return (
      <FormWindow title="Login" buttons={this.buttons}>
        <Grid item xs={12}>
          <TextField
            fullWidth={true}
            label="Email"
            autoComplete='email'
            onChange={this.handleChange('username')}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl
            fullWidth={true}
            className={`${classes.margin} ${classes.textField}`}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              autoComplete='password'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </FormWindow>
    )
  }
}

export default withStyles(styles)(LoginFormWindow);
