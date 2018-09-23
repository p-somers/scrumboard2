import React from 'react';

import './DraggableList.css';
import Draggable from "../behaviors/Draggable";

export default class DraggableList extends React.Component {
  onDragOver = event => {
    let {currentDragItem} = this.state;
    let other = event.target.parentNode;

    if (this.isBefore(currentDragItem, other))
      event.target.parentNode.insertBefore(currentDragItem, other);
    else
      event.target.parentNode.insertBefore(currentDragItem, other.nextSibling);
    event.stopPropagation();
  };

  onDragStart = event => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", null);
    this.setState({currentDragItem: event.target});
  };

  isBefore = (first, second) => {
    if (second.parentNode === first.parentNode)
      for (let cur = first.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
        if (cur === second)
          return true;
    return false;
  };

  render() {
    return (
      <div className={'DraggableList'}>
        {this.props.children.map((child, index) => {
          return (
            <Draggable
              key={index}
            >
              {child}
            </Draggable>
          )
        })}
      </div>
    )
  }
}
