import React from 'react';
import {get} from "../request";
import getSocket from "../socketListener";
import HomePage from "./HomePage";

class HomePageDataManager extends React.Component {
  state={
    user: {},
    team: {},
    sprints: [],
    columns: [],
    stories: [],
    loading: true
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
      .then(() => this.setState({loading: false}))
      .catch(error => {
        console.error('error loading app', error);
      });
  }

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

  render () {
    if (this.state.loading) {
      return <div className="loading"/>;
    } else {
      return <HomePage
        team={this.state.team}
        columns={this.state.columns}
        sprints={this.state.sprints}
        stories={this.state.stories}
      />;
    }
  }
}

export default HomePageDataManager;
