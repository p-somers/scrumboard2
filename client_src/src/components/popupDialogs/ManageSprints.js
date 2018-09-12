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
  onNewSprintButton = () => {
    this.props.onNewSprintButton();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    let {classes, sprints, open, value} = this.props;

    return (
      <Dialog
        maxWidth={'xs'}
        fullWidth={true}
        className={classes.dialog}
        onClose={this.handleClose}
        aria-labelledby={"manage-sprints-dialog"}
        open={open}
        value={value}
        >
        <DialogTitle id={"manage-sprints-dialog"}>Manage and Select Sprints</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={true}
            id="select-sprint"
            select
            className={classes.textField}
            onChange={this.handleChange('sprint')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            value={this.props.currentSprint}
          >
            {sprints.map(sprint => (
              <MenuItem key={sprint.number} value={sprint.number}>
                {sprint.number}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
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
