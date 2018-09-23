import React from 'react';

import './Draggable.css';

class Draggable extends React.Component {
  originalPos = { // on the page
    top: 0,
    left: 0
  };

  state = {
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

  componentDidMount() {
    let domNode = this.domRef.current.getBoundingClientRect();
    this.originalPos = {
      top: domNode.top,
      left: domNode.left
    }
  }

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
      this.setState({
        pos: {
          x: (e.pageX - this.originalPos.left) - this.state.rel.x,
          y: (e.pageY - this.originalPos.top) - this.state.rel.y
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
