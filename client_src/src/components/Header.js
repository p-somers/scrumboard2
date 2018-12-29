import React from "react";

import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
  appBar: {
    width: "100%",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class Header extends React.Component {
  onMenuButton = () => {
    this.props.onMenuButton();
  };

  render() {
    let { classes, team, sprints, sprintIndex } = this.props;
    let sprintNum = sprintIndex > -1 ? sprints[sprintIndex].number : "";

    return (
      <AppBar position="static" className={`${classes.appBar}`}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={this.onMenuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {team.name} - Sprint #{sprintNum}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
