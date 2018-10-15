import React from 'react';

import Column from './Column';

import './Board.css';

class Board extends React.Component {

  render() {
    return <div id="boardWrapper">
      <div className="storiesColumn">

      </div>
      {this.props.columns.map((column, index) => (<Column key={index} column={column}/>))}
    </div>;
  }
}

export default Board;
