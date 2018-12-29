import React from "react";

import "./ColumnHeader.css";

class ColumnHeader extends React.Component {
  render() {
    let { title } = this.props;
    return (
      <div className="title">
        <span>{title}</span>
      </div>
    );
  }
}

export default ColumnHeader;
