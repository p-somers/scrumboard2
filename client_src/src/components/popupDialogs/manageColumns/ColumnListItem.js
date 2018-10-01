import React from 'react';
import DragIcon from '@material-ui/icons/UnfoldMore';

import './ColumnListItem.css'

class ColumnListItem extends React.Component {

  render() {
    return (
      <div className={'column-list-item'}>
        <div className={'drag-item-icon'}>
          <DragIcon/>
        </div>
        <div className={'drag-item-text'}>
        <span>
          {this.props.text}
          </span>
        </div>
      </div>
    );
  }
}

export default ColumnListItem;
