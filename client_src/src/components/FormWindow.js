import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    width: '100%'
  },
  button: {

  },
  alignLeft: {
    flex: 1,
    display: 'flex',
  },
  alignRight: {
    flex: 1,
    display: 'flex',
    'flex-direction': 'row-reverse'
  },
});

class FormWindow extends React.Component {
  actions() {
    let {classes} = this.props;
    let buildButtonArray = (buttonConfigArray) => {
      return buttonConfigArray.map((button, index) => (
        <Button
          key={index}
          variant={button.variant}
          className={`${classes.button}`}
          onClick={button.action}>
          {button.text}
        </Button>
      ));
    };

    if (this.props.buttons) {
      return (
        <div className={classes.buttons}>
          {this.props.buttons.left &&
          <div className={classes.alignLeft}>
            {buildButtonArray(this.props.buttons.left)}
          </div>
          }
          {this.props.buttons.right &&
          <div className={classes.alignRight}>
            {buildButtonArray(this.props.buttons.right)}
          </div>
          }
        </div>
      );
    }
  }

  render() {
    let {classes} = this.props;
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              {this.props.title}
            </Typography>
            <Grid container spacing={24}>
              {this.props.children}
            </Grid>
            {this.actions()}
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FormWindow);
