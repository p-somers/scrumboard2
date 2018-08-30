import React from 'react';
import { get } from './request';

class HomePage extends React.Component {
  state = {
    user: undefined
  };

  componentDidMount() {
    this.loadUser(this.props.userId)
  }

  loadUser(userId) {
    let user = null;
    get(`/UserAccounts/${ userId }`)
      .then(userInfo => user = userInfo)
      .then(() => get(`/Teams/${ user.teamId }`))
      .then(team => this.setState({user, team}))
      .catch(error => {
        console.error('Error fetching user and team');
      });
  }

  render() {
    return (<div>
      User email: { this.state.user && this.state.user.email }
      </div>);
  }
}

export default HomePage;
