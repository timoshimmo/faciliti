import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { OverviewArea, MeetingUpdateArea, OrderSummaryArea } from './components';
import AXIOS from '../../../util/webservices';


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

const Overview = props => {

    const classes = useStyles();

    useEffect(() => {
      handleContractCreator();
   }, []);

   const handleContractCreator = () => {

    let tenantSegment = localStorage.getItem('tenantSegment');

    AXIOS.get(`http://132.145.58.252:8081/spaciofm/api/configurations/tenant-config?tenant-id=${tenantSegment}`)
    .then(response => {
      const result = response.data;
      //console.log("SERVICE CONTRACTOR: ", result['Service Contract Creator']);
     // console.log("CONTRACT TYPE ID: ", result['Maintenance Service Charge Type']);
      localStorage.setItem('serviceContractCreator', result['Service Contract Creator']);
      localStorage.setItem('maintenanceChargeType', result['Maintenance Service Charge Type']);

    })
    .catch(function (error) {
      console.log(error.response);
      console.log(error.message);
    })

   }

    return(
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
              <OverviewArea />
          </Grid>
          <Grid
            item
            lg={12}>

            <Typography
              variant="h4"
              gutterBottom
              className={classes.middleAreaTitle}
            >
              Meeting Updates
            </Typography>

          </Grid>
          <Grid
            item
            lg={12}>
              <MeetingUpdateArea />
          </Grid>
          <Grid
            item
            lg={12}>

            <Typography
              variant="h4"
              gutterBottom
              className={classes.middleAreaTitle}
            >
              Order Summary
            </Typography>
          </Grid>
          <Grid
            item
            lg={12}>
              <OrderSummaryArea />
          </Grid>
        </Grid>
      </div>
    );
}

export default Overview;
