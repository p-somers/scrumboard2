import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
});

class ManageSprints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint: this.props.currentSprint || 0
    };
  }

  onNewSprintButton = () => {
    this.props.onNewSprintButton();
  };

  onSprintSelected = (event) => {
    this.props.onSprintSelected(event.target.value)
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    let {classes, sprints, value} = this.props;

    return (
      <Dialog
        maxWidth={'xs'}
        fullWidth={true}
        className={classes.dialog}
        onClose={this.onClose}
        aria-labelledby={"manage-sprints-dialog"}
        open={true}
        value={value}
        >
        <DialogTitle id={"manage-sprints-dialog"}>Manage and Select Sprints</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            id="select-sprint"
            select
            className={classes.textField}
            onChange={this.onSprintSelected}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            value={this.state.sprint}
          >
            {sprints.map(sprint => (
              <MenuItem key={sprint.number} value={sprint.number}>
                {sprint.number}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose} color="primary">
            Close
          </Button>
          <Button onClick={this.onNewSprintButton} color="primary" autoFocus>
            New Sprint
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ManageSprints);
