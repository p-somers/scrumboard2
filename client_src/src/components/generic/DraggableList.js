import React from 'react';

import './DraggableList.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import DraggableListItem from "./DraggableListItem";
//import Draggable from "../behaviors/DraggableItem";

export default class DraggableList extends React.Component {
  state = {
    items: this.props.children
  };

  onDragEnd = result => {
    let {destination, source, draggableId} = result;
    if (destination) {
      let locationDidChange = source.droppableId !== destination.droppableId || source.index !== destination.index;
      if (locationDidChange) {
        let items = Array.from(this.state.items);
        let draggedItem = items[source.index];
        items.splice(source.index, 1);
        items.splice(destination.index, 0, draggedItem);
        this.setState({items});
      }
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={"columnsList"}>
          {provided => (
            <div
              className={"draggable-list"}
              ref={provided.innerRef}>
              {this.state.items.map((child, index) => {
                return (
                  <DraggableListItem index={index} key={index}>
                    {child}
                  </DraggableListItem>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
