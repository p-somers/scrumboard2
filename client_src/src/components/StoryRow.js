import React from 'react';

import './StoryRow.css';

class StoryRow extends React.Component {

  render() {
    let {story} = this.props;
    return (
      <div className="storyRow">
        <div className="storyTitle">
          {story.name}
        </div>
      </div>
    );
  }
}

export default StoryRow;
