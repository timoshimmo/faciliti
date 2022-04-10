import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { Overview, Logs } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    background: '#efefef'
  },
  grid: {
    minHeight: '100%',
    padding: 40
  },
  areaTitle: {
    fontSize: 18,
    color: theme.palette.secondary.dark,
    fontWeight: 600,
    marginBottom: 20
  },
  middleAreaTitle: {
    fontSize: 18,
    color: theme.palette.secondary.dark,
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 20
  }
}));

const Visitors = props => {

    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          direction="column">
          <Grid
            item
            lg={12}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.areaTitle}
              >
                Overview
              </Typography>
          </Grid>
          <Grid
          item
          lg={12}>
            <Overview />
          </Grid>
          <Grid
            item
            lg={12}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.middleAreaTitle}
              >
                Visitor Log
              </Typography>
            </Grid>
            <Grid
              item
              lg={12}>
                <Logs />
              </Grid>
        </Grid>
      </div>
    );
}

export default Visitors;
