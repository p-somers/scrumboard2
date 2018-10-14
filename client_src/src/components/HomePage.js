import React from 'react';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {withStyles} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";

import {post} from '../request';
import Header from './Header';
import LeftMenu from "./menu/LeftMenu";
import NewStoryDialog from "./popupDialogs/NewStory";
import ManageSprintsDialog from "./popupDialogs/ManageSprints";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ManageColumns from "./popupDialogs/manageColumns/ManageColumns";

import Board from "./Board";

import './HomePage.css';

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
    currentSprintIndex: this.props.sprints.length - 1,
    menuOpen: false,
    popup: '',
    snackbar: ''
  };
  setState = (newState) => {
    // Promisifying setState
    return new Promise(resolve => {
      super.setState(newState, () => {
        resolve()
      });
    });
  };
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
  onColumnsChanged = () => {
    // TODO: more. MORE.
    // ...maybe, anyway
    this.closePopup();
  };
  onSprintSelected = currentSprintIndex => {
    this.setState({
      currentSprintIndex,
      popup: '',
      menuOpen: false,
      snackbar: `Sprint #${currentSprintIndex + 1} loaded`
    })
  };
  openPopup = name => {
    this.setState({popup: name});
  };
  closePopup = () => {
    this.setState({popup: ''});
  };
  newSprint = () => {
    let {team, sprints} = this.props;
    let nextSprintNum = sprints.length + 1;

    post(`/Teams/${team.id}/Sprints`, {
      body: {number: nextSprintNum}
    }).then(sprint => {
      sprint.stories = [];
      sprints.push(sprint);
      this.setState({
        team,
        currentSprintIndex: sprints.length - 1,
        popup: '',
        snackbar: `Sprint #${sprint.number} created`,
        menuOpen: false,
      });
    });
  };
  onNewStory = story => {
    this.closePopup();
    this.setState({
      snackbar: `Story #${story.number} created`
    });
  };

  popups() {
    let {sprints, team, columns} = this.props;

    switch (this.state.popup) {
      case 'newStory':
        return (
          <NewStoryDialog
            sprint={sprints[this.state.currentSprintIndex]}
            team={team}
            onClose={this.closePopup}
            onNewStory={this.onNewStory}
          />
        );
      case 'sprints':
        return (
          <ManageSprintsDialog
            currentSprintIndex={this.state.currentSprintIndex}
            sprints={sprints}
            onClose={this.closePopup}
            onNewSprintButton={this.newSprint}
            onSprintSelected={this.onSprintSelected}
          />
        );
      case 'columns':
        return (
          <ManageColumns
            onClose={this.closePopup}
            onDone={this.onColumnsChanged}
            team={team}
            columns={columns}
          />
        );
      default:
        break;
    }
  }

  snackbars() {
    if (this.state.snackbar) {
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
    let {classes, team, sprints, columns} = this.props;
    return (
      <div className={classes.root} id="scrumboardRoot">
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
        <Header
          team={team}
          sprints={sprints}
          sprintIndex={this.state.currentSprintIndex}
          onMenuButton={this.onMenuButton}/>
        <Board
          columns={columns}
          />
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
