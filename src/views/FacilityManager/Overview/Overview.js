import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { OverviewArea, MeetingUpdateArea } from './components'

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
  },
  spacing: {
    marginTop: 20
  }
}));

const Overview = props => {

    const classes = useStyles();

    return(
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container>
          <Grid
            item
            lg={12}>
              <OverviewArea />
          </Grid>
          <Grid
            item
            lg={12}
            className={classes.spacing}>
              <MeetingUpdateArea />
          </Grid>
        </Grid>
      </div>
    );
}

export default Overview;
