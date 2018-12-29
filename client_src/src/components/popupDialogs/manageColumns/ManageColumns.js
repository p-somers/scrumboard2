import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import DraggableList from "../../generic/DraggableList";
import AddIcon from "@material-ui/icons/Add";
import EditableListItem from "../../generic/EditableListItem";

import { put, post } from "../../../request.js";

import "./ManageColumns.css";

const styles = theme => ({});

class ManageColumns extends React.Component {
  state = {
    columns: this.props.columns || []
  };

  onDoneButton = () => {
    let url = `/Teams/${this.props.team.id}/saveColumns`;
    let { columns } = this.state;
    post(url, {
      body: { columns }
    }).then(() => {
      this.props.onDone();
    });
  };

  onNewColumnButton = () => {
    let columns = this.state.columns;
    columns.push({
      title: "column " + (columns.length + 1), //TODO: something else
      order: columns.length
    });
    this.setState({ columns });
  };

  onEditColumn = index => newText => {
    let columns = this.state.columns;
    columns[index].title = newText;
    this.setState({ columns });
  };

  onColumnMoved = (from, to) => {
    let columns = Array.from(this.state.columns);
    columns[from].order = to;
    columns[to].order = from;

    let draggedColumn = columns[from];
    columns.splice(from, 1);
    columns.splice(to, 0, draggedColumn);
    this.setState({ columns });
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    let { classes, value } = this.props;

    return (
      <Dialog
        maxWidth={"xs"}
        fullWidth={true}
        className={classes.dialog}
        onClose={this.onClose}
        aria-labelledby={"manage-columns-dialog"}
        open={true}
        value={value}
      >
        <DialogTitle id={"manage-columns-dialog"}>Manage Columns</DialogTitle>
        <DialogContent>
          <DraggableList onItemMoved={this.onColumnMoved}>
            {this.state.columns.map((column, index) => (
              <EditableListItem
                key={index}
                text={column.title}
                onEdit={this.onEditColumn(index)}
              />
            ))}
          </DraggableList>
        </DialogContent>
        <DialogActions>
          <Button
            mini
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this.onNewColumnButton}
            className={classes.button}
          >
            <AddIcon />
          </Button>
          <div className={"spacer"} />
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
