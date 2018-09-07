import React from 'react';

import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import AddIcon from '@material-ui/icons/Add';

import {withStyles} from "@material-ui/core";

const styles = theme => ({

});
class LeftMenu extends React.Component {
  onMenuItem = item => () => {
    this.props.onMenuItem(item);
  };

  render() {
    return (
      <List>
        <ListItem button onClick={this.onMenuItem('newStory')}>
          <ListItemIcon>
            <AddIcon/>
          </ListItemIcon>
        </ListItem>
      </List>
    )
  }
}

export default withStyles(styles)(LeftMenu);
