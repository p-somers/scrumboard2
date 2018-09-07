import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import {post} from "../request";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class NewStoryDialog extends React.Component {
  state = {
    storyName: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmitButton() {

  }

  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    let {classes} = this.props;
    return (
      <Dialog
        className={classes.dialog}
        onClose={this.handleClose}
        aria-labelledby={"new-story-dialog"}
        {...this.props}>
        <DialogTitle id={"new-story-dialog"}>New Story</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Story name"
                className={classes.textField}
                onChange={this.handleChange('storyName')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={this.onSubmitButton} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(NewStoryDialog);
