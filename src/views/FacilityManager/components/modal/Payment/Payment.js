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
import AXIOS from '../../../../../util/webservices';
import {
  useModalAction,
  useModalState,
} from "../../../../modal/modal-context";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    width: '100%',
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

    const { closeModal } = useModalAction();
    const { data } = useModalState();

    const [loading, setLoading] = useState(false);
  //  const [charges, setCharges] = useState([]);


    useEffect(() => {
      console.log(data.serviceCharges);
    //  handleGetCharges();
   }, []);

  /*  const handleGetCharges = () => {
      AXIOS.get(`contracts/${data.contractId}/charges?index=0&range=100`)
        .then(response => {
            const res = response.data;
            console.log("ALL Charges:" + JSON.stringify(res));
            setCharges(res.response);
            setLoading(false);
            //setServices(res.response);
        })
        .catch(function (error) {
            setLoading(false);
            console.log(error.response);
            console.log(error.message);
        })
    }*/

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
            <Billing charges={data.serviceCharges}/>
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
                <PaymentHistory contractId={data.contractId}/>
              </Grid>
        </Grid>
      </div>
    );
}

export default Payment;
