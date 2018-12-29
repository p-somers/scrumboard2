import React from "react";
import { get } from "../request";
import getSocket from "../socketListener";
import HomePage from "./HomePage";

class HomePageDataManager extends React.Component {
  state = {
    user: {},
    team: {},
    sprints: [],
    columns: [],
    stories: [],
    loading: true
  };

  async componentDidMount() {
    let socket = getSocket();
    socket.on("columns updated", (err, columns) => this.setState({ columns }));
    try {
      await this.loadUser(this.props.userId);
      await this.loadTeam(this.state.user.teamId);
      await Promise.all([
        this.loadColumns(this.state.team.id),
        this.loadSprints(this.state.team.id)
      ]);
      let currentSprintIndex = this.state.sprints.length - 1;
      if (currentSprintIndex > -1) {
        this.setState({ currentSprintIndex });
        await this.loadStories(this.state.sprints[currentSprintIndex].id);
      }
      this.setState({ loading: false });
    } catch ({ error }) {
      switch (error.statusCode) {
        case 401:
          localStorage.removeItem("userId");
          break;
        case undefined:
          console.error("error loading app", error);
          break;
      }
    }
  }

  loadStories = async sprintId => {
    const stories = await get(
      `/Sprints/${sprintId}/Stories?filter[order]=number%20ASC&filter[include]=tasks`
    );
    await this.setState({ stories });
  };
  loadTeam = async teamId => {
    const team = await get(`/Teams/${teamId}`);
    await this.setState({ team });
  };
  loadSprints = async teamId => {
    const sprints = await get(
      `/Teams/${teamId}/Sprints?filter[order]=number%20ASC`
    );
    await this.setState({ sprints });
  };
  loadColumns = async teamId => {
    return get(`/Teams/${teamId}/Columns?filter[order]=order%20ASC`).then(
      columns => this.setState({ columns })
    );
  };
  loadUser = async userId => {
    const user = await get(`/UserAccounts/${userId}`);
    await this.setState({ user });
  };

  render() {
    if (this.state.loading) {
      return <div className="loading" />;
    } else {
      return (
        <HomePage
          team={this.state.team}
          columns={this.state.columns}
          sprints={this.state.sprints}
          stories={this.state.stories}
          onSprintSelected={this.loadStories}
        />
      );
    }
  }
}

export default HomePageDataManager;
