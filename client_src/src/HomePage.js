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
import ManageColumns from "./components/popupDialogs/manageColumns/ManageColumns";

import getSocket from './socketListener';
import Board from "./components/Board";

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
    currentSprintIndex: this.props.currentSprintIndex || -1,
    user: this.props.user || {},
    team: this.props.team || {},
    sprints: this.props.sprints || [],
    columns: this.props.columns || [],
    stories: this.props.stories || [],
    dataLoaded: false,
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
    this.closePopup();
    this.loadColumns(this.state.team.id);
  };
  onSprintSelected = currentSprintIndex => {
    this.setState({
      currentSprintIndex,
      popup: '',
      menuOpen: false,
      snackbar: `Sprint #${currentSprintIndex} loaded`
    })
  };
  openPopup = name => {
    this.setState({popup: name});
  };
  closePopup = () => {
    this.setState({popup: ''});
  };
  loadStories = sprintId => {
    return get(`/Sprints/${sprintId}/Stories?filter[order]=number%20ASC`)
      .then(stories => this.setState({stories}));
  };
  loadTeam = teamId => {
    return get(`/Teams/${teamId}`)
      .then(team => this.setState({team}));
  };
  loadSprints = teamId => {
    return get(`/Teams/${teamId}/Sprints?filter[order]=number%20ASC`)
      .then(sprints => this.setState({sprints}));
  };
  loadColumns = teamId => {
    return get(`/Teams/${teamId}/Columns?filter[order]=order%20ASC`)
      .then(columns => this.setState({columns}));
  };
  loadUser = userId => {
    return get(`/UserAccounts/${userId}`)
      .then(user => this.setState({user}));
  };
  newSprint = () => {
    let nextSprintNum = this.state.team.sprints.length + 1;

    post(`/Teams/${this.state.team.id}/Sprints`, {
      body: {number: nextSprintNum}
    }).then(sprint => {
      let team = this.state.team;
      sprint.stories = [];
      team.sprints.push(sprint);
      this.setState({
        team,
        currentSprintIndex: team.sprints.length - 1,
        popup: '',
        snackbar: `Sprint #${sprint.number} created`,
        menuOpen: false,
      });
    });
  };
  onNewStory = story => {

  };

  componentDidMount() {
    let socket = getSocket();
    socket.on('columns updated', (err, columns) => this.setState({columns}));

    this.loadUser(this.props.userId)
      .then(() => this.loadTeam(this.state.user.teamId))
      .then(() => {
        return Promise.all(
          [
            this.loadColumns(this.state.team.id),
            this.loadSprints(this.state.team.id)
          ]
        )
      })
      .then(() => {
        let currentSprintIndex = this.state.sprints.length - 1;
        if (currentSprintIndex > -1) {
          this.setState({currentSprintIndex});
          return this.loadStories(this.state.sprints[currentSprintIndex].id);
        }
      })
      .then(() => this.setState({dataLoaded: true}))
      .catch(error => {
        console.error('error loading app', error);
      });
  }

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
              sprint={this.state.sprints[this.state.currentSprintIndex]}
              nextStoryNumber={this.getNextStoryNumber()}
              onClose={this.closePopup}
              onNewStory={this.onNewStory}
            />
          );
        case 'sprints':
          return (
            <ManageSprintsDialog
              currentSprintIndex={this.state.currentSprintIndex}
              sprints={this.state.sprints}
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
              team={this.state.team}
              columns={this.state.columns}
            />
          );
        default:
          break;
      }
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
    let {classes} = this.props;
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
          team={this.state.team}
          sprints={this.state.sprints}
          sprintIndex={this.state.currentSprintIndex}
          onMenuButton={this.onMenuButton}/>
        <Board
          columns={this.state.columns}
          />
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
