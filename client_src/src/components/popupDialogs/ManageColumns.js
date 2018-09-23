import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import DraggableList from "../generic/DraggableList";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";

const styles = theme => ({
});

class ManageColumns extends React.Component {

  onDoneButton = () => {
    this.props.onDoneButton();
  };

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  onSprintSelected = (event) => {
    this.props.onSprintSelected(event.target.value)
  };

  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    let {classes, columns, value} = this.props;

    return (
      <Dialog
        maxWidth={'xs'}
        fullWidth={true}
        className={classes.dialog}
        onClose={this.handleClose}
        aria-labelledby={"manage-columns-dialog"}
        open={true}
        value={value}
      >
        <DialogTitle id={"manage-columns-dialog"}>
          <span>Manage Columns</span>
          <AddIcon/>
        </DialogTitle>
        <DialogContent>
          <DraggableList>
            <div>test1</div>
            <div>test2</div>
            <div>test3</div>
          </DraggableList>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={this.onDoneButton} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ManageColumns);
