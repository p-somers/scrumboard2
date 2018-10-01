import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import DraggableList from "../../generic/DraggableList";
import AddIcon from "@material-ui/icons/Add";
import ColumnListItem from "./ColumnListItem";

import "./ManageColumns.css"

const styles = theme => ({});

class ManageColumns extends React.Component {
  state = {
    columns: ["a", "b", "c"]
  };

  onDoneButton = () => {
    this.props.onDoneButton();
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    let {classes, value} = this.props;

    return (
      <Dialog
        maxWidth={'xs'}
        fullWidth={true}
        className={classes.dialog}
        onClose={this.onClose}
        aria-labelledby={"manage-columns-dialog"}
        open={true}
        value={value}
      >
        <DialogTitle id={"manage-columns-dialog"}>
          <div className={"dialog-title"}>
            <div>Manage Columns</div>
            <div className={"spacer"}/>
            <div>
              <AddIcon/>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DraggableList>
            {this.state.columns.map(column => <ColumnListItem text={column}/>)}
          </DraggableList>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose} color="primary">
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
