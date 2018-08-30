import React from 'react';
import FormWindow from "./FormWindow";

import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
});

class RegisterFormWindow extends React.Component {
  handleBackButton = () => {
    this.props.onBackButton();
  };

  handleSubmitButton = () => {

  };

  buttons = {
    'left': [{
      'text': 'Back',
      'action': this.handleBackButton
    }],
    'right': [{
      'text': 'Submit',
      'variant': 'outlined',
      'action': this.handleSubmitButton
    }]
  };

  render() {
    return (
      <FormWindow title="Register User" buttons={this.buttons}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
          />
        </Grid>
      </FormWindow>
    );
  }
}

export default withStyles(styles)(RegisterFormWindow);
