import React from 'react';
import FormWindow from "./FormWindow";

import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
});

class UserCreatedConfirmationWindow extends React.Component {
  handleBackButton = () => {
    typeof this.props.onBackButton === 'function' && this.props.onBackButton();
  };

  handleSubmitButton = () => {
    typeof this.props.onSubmitButton === 'function' && this.props.onSubmitButton();
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
          <div>User Created</div>
        </Grid>
      </FormWindow>
    );
  }
}

export default withStyles(styles)(UserCreatedConfirmationWindow);
