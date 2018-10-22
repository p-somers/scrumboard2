import React from 'react';

import StoryRow from './StoryRow';

import './Board.css';

class Board extends React.Component {

  render() {
    return <div id="boardWrapper">
      <div class="header">
        <div className="spacer"/>
        {this.props.columns.map(
          (column, index) => {
            return (
              <div key={index} className="title">
                <span>{column.title}</span>
              </div>
            );
          }
        )}
      </div>

      {this.props.stories.map(
        (story, index) => <StoryRow story={story} key={index}/>
      )}
    </div>;
  }
}

export default Board;
