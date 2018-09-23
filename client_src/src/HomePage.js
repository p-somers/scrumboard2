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
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ManageColumns from "./components/popupDialogs/ManageColumns";

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
    popup: '',
    snackbar: ''
  };

  componentDidMount() {
    this.loadUser(this.props.userId)
  }

  onMenuButton = () => {
    this.setState({menuOpen: true});
  };

  onMenuClose = () => {
    if (this.state.popup === '') {
      this.setState({menuOpen: false});
    }
  };

  onSnackbarClose = () => {
    this.setState({snackbar: ''});
  };

  onSprintSelected = currentSprint => {
    this.setState({
      currentSprint,
      popup: '',
      menuOpen: false,
      snackbar: `Sprint #${currentSprint} loaded`
    })
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
      .then(team => {
        let currentSprint = team.sprints.length > 0 ? team.sprints[team.sprints.length - 1].number : 0;
        this.setState({user, team, currentSprint, dataLoaded: true});
      })
      .catch(error => {
        console.error('Error fetching user and team');
      });
  }

  newSprint = () => {
    post(`/Teams/${this.state.team.id}/Sprints`, {
      body: {number: "2"}
    }).then(sprint => {
      let team = this.state.team;
      team.sprints.push(sprint);
      this.setState({
        team,
        currentSprint: sprint.number,
        popup: '',
        snackbar: `Sprint #${sprint.number} created`,
        menuOpen: false,
      });
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
              />
          );
        case 'sprints':
          return (
            <ManageSprintsDialog
              currentSprint={this.state.currentSprint}
              sprints={this.state.team.sprints}
              handleClose={this.closePopup}
              onNewSprintButton={this.newSprint}
              onSprintSelected={this.onSprintSelected}
            />
          );
        case 'columns':
          return (
            <ManageColumns
              handleClose={this.closePopup}
            />
          );
        default: break;
      }
    }
  }

  snackbars() {
    if(this.state.snackbar) {
      return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={true}
          autoHideDuration={2000}
          onClose={this.onSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbar}</span>}/>
      )
    }
  }

  render() {
    let {classes} = this.props;
    return (
      <div className={classes.root}>
        {this.popups()}
        {this.snackbars()}
        <Drawer
          classes={{
            paper: `${classes.leftMenu}`,
          }}
          open={this.state.menuOpen}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.onMenuClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <ClickAwayListener onClickAway={this.onMenuClose}>
            <LeftMenu onMenuItem={this.openPopup}/>
          </ClickAwayListener>
        </Drawer>
        <Header team={this.state.team} sprint={this.state.currentSprint} onMenuButton={this.onMenuButton}/>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
