import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import FormWindow from "./FormWindow";

import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import {get, post} from "../request";
import FormControl from "@material-ui/core/FormControl/FormControl";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    //margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class RegisterFormWindow extends React.Component {
  state = {
    'teamId': '',
    'teams': []
  };

  componentDidMount() {
    get('/Teams').then(teams => {
      this.setState({teams});
    });
  }

  teamSelectItems() {
    return this.state.teams.map(team => {
      return (<MenuItem value={team.id}>
        {team.name}
      </MenuItem>)
    });
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleBackButton = () => {
    typeof this.props.onBackButton === 'function' && this.props.onBackButton();
  };

  registerUser = () => {
    let me = this;
    let payload = {
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'email': this.state.email,
      'password': this.state.password,
      'teamId': this.state.teamId
    };
    post(`/UserAccounts`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(() => {
        me.props.onRegister()
      })
      .catch(error => {
        console.error(error);
      });
  };

  buttons = {
    'left': [{
      'text': 'Back',
      'action': this.handleBackButton
    }],
    'right': [{
      'text': 'Submit',
      'variant': 'outlined',
      'action': this.registerUser
    }]
  };

  render() {
    let { classes } = this.props;
    return (
      <FormWindow title="Register User" buttons={this.buttons}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={this.handleChange('firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={this.handleChange('lastName')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            onChange={this.handleChange('email')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="password"
            onChange={this.handleChange('password')}
          />
        </Grid>
        <Grid item xs={12}>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="team-select">Team</InputLabel>
              <Select
                value={this.state.teamId}
                onChange={this.handleChange('teamId')}
                inputProps={{
                  id: 'team-select'
                }}
              >
                {this.teamSelectItems()}
              </Select>
            </FormControl>
          </form>
        </Grid>
      </FormWindow>
    );
  }
}

export default withStyles(styles)(RegisterFormWindow);
