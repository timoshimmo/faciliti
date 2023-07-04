import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import { OverviewArea, TransactionsArea } from './components'


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    background: '#efefef'
  },
  grid: {
    minHeight: '100%',
    paddingBottom: 40,
    paddingRight: 40,
    paddingLeft: 40,
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
}));

const Payment = () => {

    const classes = useStyles();

    return(
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container>
            {/*
            
          <Grid
            item
            lg={12}>
              <OverviewArea />
          </Grid>
    */}
          
          <Grid
            item
            lg={12}>
              <TransactionsArea />
          </Grid>
        </Grid>
      </div>
    );
}

export default Payment;
