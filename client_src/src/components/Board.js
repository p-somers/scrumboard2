import React from "react";

import StoryRow from "./StoryRow";

import "./Board.css";
import ColumnHeader from "./ColumnHeader";

class Board extends React.Component {
  render() {
    return (
      <div id="boardWrapper">
        <div class="header">
          <div className="spacer" />
          {this.props.columns.map((column, index) => (
            <ColumnHeader key={index} title={column.title} />
          ))}
        </div>

        {this.props.stories.map((story, index) => (
          <StoryRow story={story} key={index} />
        ))}
      </div>
    );
  }
}

export default Board;
