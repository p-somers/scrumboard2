import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";

import {post} from "../../request.js";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class NewStory extends React.Component {
  state = {
    newStory: {
      name: '',
      description: '',
      number: '',
      points: 0,
      acceptanceCriteria: []
    }
  };

  handleChange = name => event => {
    let newStory = this.state.newStory;
    newStory[name] = event.target.value;
    this.setState({newStory});
  };

  onSubmitButton = () => {
    post(`/Sprints/${this.props.sprint.id}/Stories`, {
      body: this.state.newStory
    }).then(story => {
      this.props.onNewStory(story);
    }).catch(error => {
      console.error('Error creating new story', error);
    });
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    let {classes, nextStoryNumber} = this.props;

    return (
      <Dialog
        maxWidth={'md'}
        fullWidth={true}
        className={classes.dialog}
        onClose={this.onClose}
        aria-labelledby={"new-story-dialog"}
        open={true}>
        <DialogTitle id={"new-story-dialog"}>New Story</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={1}>
              <TextField
                fullWidth={true}
                label="#"
                defaultValue={nextStoryNumber}
                className={classes.textField}
                onChange={this.handleChange('number')}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth={true}
                label="Name"
                className={classes.textField}
                onChange={this.handleChange('name')}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth={true}
                label="Points"
                defaultValue={0}
                className={classes.textField}
                onChange={this.handleChange('points')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Description"
                multiline
                rowsMax="4"
                className={classes.textField}
                onChange={this.handleChange('description')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose} color="primary">
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

export default withStyles(styles)(NewStory);
