import React from "react";
import { Draggable } from "react-beautiful-dnd";

class DraggableListItem extends React.Component {
  render() {
    return (
      <Draggable
        key={`list-item-${this.props.index}`}
        draggableId={`list-item-${this.props.index}`}
        index={this.props.index}
      >
        {(providedInner, snapshot) => (
          <div
            className={"draggable-list-item"}
            ref={providedInner.innerRef}
            {...providedInner.draggableProps}
            {...providedInner.dragHandleProps}
          >
            {this.props.children}
          </div>
        )}
      </Draggable>
    );
  }
}

export default DraggableListItem;
