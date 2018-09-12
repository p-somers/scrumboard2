import React from 'react';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {withStyles} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";

import {get, post} from './request';
import Header from './components/Header';
import LeftMenu from "./components/menu/LeftMenu";
import NewStoryDialog from "./components/popupDialogs/NewStory";
import ManageSprintsDialog from "./components/popupDialogs/ManageSprints";

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
    currentSprint: 0,
    user: {},
    team: {},
    dataLoaded: false,
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
      .then(team => this.setState({user, team, dataLoaded: true}))
      .catch(error => {
        console.error('Error fetching user and team');
      });
  }

  newSprint = () => {
    post(`/Teams/${this.state.team.id}/Sprints`, {
      body: {number: "2"}
    }).then(result => {
        debugger;
      });
  };

  getNextStoryNumber() {
    let {sprints} = this.state.team;
    let storyNum = 1;
    if (sprints.length > 0) {
      let {stories} = sprints[sprints.length - 1];
      if (stories.length > 0) {
        storyNum = stories[stories.length - 1].number + 1;
      }
    }
    return storyNum;
  }

  popups() {
    if (this.state.dataLoaded) {
      switch (this.state.popup) {
        case 'newStory':
          return (
              <NewStoryDialog
                nextStoryNumber={this.getNextStoryNumber()}
                handleClose={this.closePopup}
                open={this.state.popup === 'newStory'}
              />
          );
        case 'sprints':
          return (
            <ManageSprintsDialog
              currentSprint={this.state.currentSprint}
              sprints={this.state.team.sprints}
              handleClose={this.closePopup}
              onNewSprintButton={this.newSprint}
              open={this.state.popup === 'sprints'}
            />
          );
        default: break;
      }
    }
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
