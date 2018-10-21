import React from 'react';

import './Column.css';

class Column extends React.Component {

  render() {
    return <div className={`column ${this.props.className}`}>
      <div className="columnTitle">{this.props.column.title}</div>
    </div>
  }
}

export default Column;
