import React from 'react';

import './DraggableList.css';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import DraggableListItem from "./DraggableListItem";

export default class DraggableList extends React.Component {
  onDragEnd = result => {
    let {destination, source} = result;
    if (destination) {
      let locationDidChange = source.droppableId !== destination.droppableId || source.index !== destination.index;
      if (locationDidChange) {
        this.props.onItemMoved(source.index, destination.index);
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
              {this.props.children.map((child, index) => {
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
