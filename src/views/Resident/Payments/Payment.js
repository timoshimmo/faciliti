import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { Billing, PaymentHistory } from './components';
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

const Payment = props => {

    const classes = useStyles();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      handleGetAll();
   }, []);

     const handleGetAll = () => {

       AXIOS.get(`contracts/get-by-resident?index=0&range=100`)
         .then(response => {
             const res = response.data;
             console.log("CONTRACTS:" + JSON.stringify(res));
             const mainContract = res.response[0];
             //setServices(res.response);
             //setLoading(false);

               AXIOS.get(`contracts/${mainContract.key.uuid}/charges?index=0&range=100`)
                 .then(resp => {
                     const res1 = resp.data;
                    // console.log("CHARGES DATA:" + JSON.stringify(res1));
                   //  console.log("CONTRACT KEY:" + JSON.stringify(contract));
                     const obj = res1.response;
                     const chargeData =
                       {
                         segmentName: mainContract.segmentName,
                         userId: mainContract.userId,
                         createdAt: mainContract.createdAt,
                         serviceType: mainContract.serviceType,
                         serviceId: mainContract.serviceId,
                         numberOfResidents: mainContract.numberOfResidents,
                         charge: mainContract.charge,
                         frequency: mainContract.frequency,
                         category: mainContract.category,
                         creator: mainContract.creator,
                         key: mainContract.key,
                         chargeData: obj
                       };

                  //   console.log("MY Charges:" + JSON.stringify(chargeData));
                     //setCharges(res.response);
                     setServices(chargeData);
                     setLoading(false);
                     //setServices(res.response);
                 })
                 .catch(function (error) {
                     setLoading(false);
                     console.log(error.response);
                     console.log(error.message);
                 })

         })
         .catch(function (error) {
             setLoading(false);
             console.log(error.response);
             console.log(error.message);
         })
     }

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
                Billing Details
              </Typography>
          </Grid>
          <Grid
          item
          lg={12}>
            <Billing contract={services}/>
          </Grid>
          <Grid
            item
            lg={12}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.middleAreaTitle}
              >
                Payment History
              </Typography>
            </Grid>
            <Grid
              item
              lg={12}>
                <PaymentHistory contract={services}/>
              </Grid>
        </Grid>
      </div>
    );
}

export default Payment;
