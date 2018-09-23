import React from 'react';

import './Draggable.css';

class Draggable extends React.Component {
  state = {
    originalPos: null, // on the page
    pos: {x: 0, y: 0},
    dragging: false,
    rel: null // position relative to the cursor
  };

  constructor(props) {
    super(props);
    this.domRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dragging && !prevState.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && prevState.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  };

  onMouseDown = e => {
    // only left mouse button
    if (e.button === 0) {
      let draggableNode = this.domRef.current.getBoundingClientRect();

      let position = {
        top: draggableNode.top + document.body.scrollTop,
        left: draggableNode.left + document.body.scrollLeft
      };
      this.setState({
        dragging: true,
        rel: {
          x: e.pageX - position.left,
          y: e.pageY - position.top
        },
        originalPos: {
          top: draggableNode.top,
          left: draggableNode.left
        }
      });
      e.stopPropagation();
      e.preventDefault();
    }
  };

  onMouseUp = e => {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault()
  };

  onMouseMove = e => {
    if (this.state.dragging) {
      let container = this.domRef.current.parentNode.getBoundingClientRect();
      this.setState({
        pos: {
          x: (e.pageX - this.state.originalPos.left) - this.state.rel.x,
          y: (e.pageY - this.state.originalPos.top) - this.state.rel.y
        }
      });
      e.stopPropagation();
      e.preventDefault();
    }
  };

  render() {
    return (<div
      className={'draggable'}
      onMouseDownCapture={this.onMouseDown}
      style={{
        left: this.state.pos.x + 'px',
        top: this.state.pos.y + 'px'
      }}
      ref={this.domRef}
    >
      {this.props.children}
    </div>);
  }
}

export default Draggable;
