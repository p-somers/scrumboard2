import React from 'react';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {withStyles} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import NewStoryDialog from "./components/NewStoryDialog";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";

import {get} from './request';
import Header from './components/Header';
import LeftMenu from "./components/menu/LeftMenu";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  leftMenu: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class HomePage extends React.Component {
  state = {
    user: {},
    team: {},
    menuOpen: false,
    popup: ''
  };

  componentDidMount() {
    this.loadUser(this.props.userId)
  }

  onMenuButton = () => {
    this.setState({menuOpen: true});
  };

  handleMenuClose = () => {
    if (this.state.popup === '') {
      this.setState({menuOpen: false});
    }
  };

  openPopup = name => {
    this.setState({popup: name});
  };

  closePopup = () => {
    this.setState({popup: ''});
  };

  loadUser(userId) {
    let user = null;
    get(`/UserAccounts/${ userId }`)
      .then(userInfo => user = userInfo)
      .then(() => get(`/Teams/${ user.teamId }?filter[include]=sprints&filter[include]=columns`))
      .then(team => this.setState({user, team}))
      .catch(error => {
        console.error('Error fetching user and team');
      });
  }

  popups() {
    return (
      <React.Fragment>
        <NewStoryDialog
          handleClose={this.closePopup}
          open={this.state.popup === 'newStory'}/>
      </React.Fragment>
    );
  }

  render() {
    let {classes} = this.props;
    return (
      <div className={classes.root}>
        {this.popups()}
        <Drawer
          classes={{
            paper: `${classes.leftMenu}`,
          }}
          open={this.state.menuOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleMenuClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <ClickAwayListener onClickAway={this.handleMenuClose}>
            <LeftMenu onMenuItem={this.openPopup}/>
          </ClickAwayListener>
        </Drawer>
        <Header team={this.state.team} onMenuButton={this.onMenuButton}/>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
