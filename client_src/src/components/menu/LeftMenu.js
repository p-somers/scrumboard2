import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import ColumnsIcon from "@material-ui/icons/ViewColumn";

import { withStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const styles = theme => ({});
class LeftMenu extends React.Component {
  onMenuItem = item => () => {
    this.props.onMenuItem(item);
  };

  render() {
    return (
      <List>
        <ListItem button onClick={this.onMenuItem("sprints")}>
          <ListItemIcon>
            <Tooltip title={"Manage and Select Sprints"}>
              <ListIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={this.onMenuItem("newStory")}>
          <ListItemIcon>
            <Tooltip title={"New Story"}>
              <AddIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={this.onMenuItem("columns")}>
          <ListItemIcon>
            <Tooltip title={"Columns"}>
              <ColumnsIcon />
            </Tooltip>
          </ListItemIcon>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(LeftMenu);
