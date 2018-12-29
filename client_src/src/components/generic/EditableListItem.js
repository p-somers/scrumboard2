import React from "react";
import DragIcon from "@material-ui/icons/UnfoldMore";
import EditIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";

import "./EditableListItem.css";
import TextField from "@material-ui/core/TextField/TextField";

class EditableListItem extends React.Component {
  state = {
    editedText: this.props.text,
    editing: false
  };

  edit = () => {
    this.setState({ editing: true });
  };

  saveEditedText = () => {
    this.props.onEdit(this.state.editedText);

    this.setState({ editing: false });
  };

  onTextEdited = event => {
    this.setState({ editedText: event.target.value });
  };

  renderText = () => {
    if (this.state.editing) {
      return (
        <TextField
          autoFocus
          value={this.state.editedText}
          onChange={this.onTextEdited}
        />
      );
    }
    return <span>{this.props.text}</span>;
  };

  renderEditButton = () => {
    if (this.state.editing) {
      return <DoneIcon onClick={this.saveEditedText} />;
    }
    return <EditIcon className={"edit-item-icon"} onClick={this.edit} />;
  };

  render() {
    return (
      <div className={"column-list-item"}>
        <div className={"drag-item-icon"}>
          <DragIcon />
        </div>
        <div className={"drag-item-text"}>{this.renderText()}</div>
        {this.renderEditButton()}
      </div>
    );
  }
}

export default EditableListItem;
