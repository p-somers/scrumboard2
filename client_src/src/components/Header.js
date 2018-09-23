import React from 'react';

import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Header extends React.Component {
  onMenuButton = () => {
    this.props.onMenuButton();
  };

  render() {
    let {classes} = this.props;

    return (<AppBar
      position="static"
      className={`${classes.appBar}`}
    >
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={this.onMenuButton}>
          <MenuIcon/>
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          {this.props.team.name} - Sprint #{this.props.sprint}
        </Typography>
      </Toolbar>
    </AppBar>);
  }
}

export default withStyles(styles)(Header);
