import React from 'react';

import Column from './Column';

import './Board.css';

class Board extends React.Component {

  render() {
    return <div id="boardWrapper">
      <Column key={0} column={{title: ''}} className={"storyInfo"}/>
      {this.props.columns.map(
        (column, index) =>
          <Column
            key={index + 1}
            column={column}
            storyTasks={
              this.props.stories.map(story => {
                  let storyCopy = {...story};
                  storyCopy.tasks = storyCopy.tasks.filter(task => task.columnId = column.id);
                  return storyCopy;
                }
              )
            }
          />
      )}
    </div>;
  }
}

export default Board;
