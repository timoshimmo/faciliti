import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  SvgIcon,
} from '@material-ui/core';
import AXIOS from '../../../../../util/webservices';

function NewOrderIcon(props) {
  return (
    <SvgIcon {...props} width="41" height="38" viewBox="0 0 41 38">
      <path d="M2.32676 37.2828V5.26572C15.4705 -3.882 25.3281 14.4134 38.4718 5.26572V28.135C25.3281 37.2828 15.4704 18.9873 2.32666 28.135" stroke="#FFB03A" stroke-width="4.375" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

function PendingIcon(props) {
  return (
    <SvgIcon {...props} width="35" height="33" viewBox="0 0 35 33">
      <path d="M9.61041 17.5833H19.9602L16.3568 20.9271L18.5793 22.9895L25.9767 16.125L18.5793 9.26048L16.3568 11.3229L19.9602 14.6667L9.61041 14.6667V17.5833Z" fill="#0766B0"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.18124 16.125C0.18124 7.26544 7.92081 0.0833435 17.4681 0.0833435C27.0153 0.0833435 34.7549 7.26544 34.7549 16.125C34.7549 24.9846 27.0153 32.1667 17.4681 32.1667C7.92081 32.1667 0.18124 24.9846 0.18124 16.125ZM3.3243 16.125C3.3243 23.3737 9.65668 29.25 17.4681 29.25C25.2794 29.25 31.6118 23.3737 31.6118 16.125C31.6118 8.87627 25.2794 3.00001 17.4681 3.00001C9.65668 3.00001 3.3243 8.87627 3.3243 16.125Z" fill="#0766B0"/>
    </SvgIcon>
  );
}

function ClosedIcon(props) {
  return (
    <SvgIcon {...props} width="35" height="33" viewBox="0 0 35 33">
      <path d="M22.615 10.7188L14.2971 18.4376L10.6937 15.0938L8.47126 17.1562L14.2971 22.5624L24.8375 12.7812L22.615 10.7188Z" fill="#1BBC2B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4401 32.1667C7.89289 32.1667 0.15332 24.9846 0.15332 16.125C0.15332 7.26544 7.89289 0.0833435 17.4401 0.0833435C26.9874 0.0833435 34.727 7.26544 34.727 16.125C34.727 24.9846 26.9874 32.1667 17.4401 32.1667ZM17.4401 29.25C25.2515 29.25 31.5839 23.3737 31.5839 16.125C31.5839 8.87627 25.2515 3.00001 17.4401 3.00001C9.62876 3.00001 3.29638 8.87627 3.29638 16.125C3.29638 23.3737 9.62876 29.25 17.4401 29.25Z" fill="#1BBC2B"/>
    </SvgIcon>
  );
}


const useStyles = makeStyles(theme => ({

  newOrderBody: {
    backgroundColor: theme.palette.orders.orange,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    height: 80
  },

   pendingOrderBody: {
     backgroundColor: theme.palette.primary.main,
     display: 'flex',
     alignItems: 'center',
     paddingTop: 30,
     paddingBottom: 30,
     paddingLeft: 30,
     paddingRight: 30,
     height: 80
   },
   closedOrderBody: {
     backgroundColor: theme.palette.orders.green,
     display: 'flex',
     alignItems: 'center',
     paddingTop: 30,
     paddingBottom: 30,
     paddingLeft: 30,
     paddingRight: 30,
     height: 80
   },
   rateOrderBody: {
     display: 'flex',
     alignItems: 'center',
     paddingTop: 30,
     paddingBottom: 30,
     paddingLeft: 20,
     paddingRight: 20,
     height: 80
   },
  cardTitle: {
    fontWeight: 400,
    fontSize: 18,
    color: theme.palette.white,
    marginBottom: 15
  },
  cardTitleLastChild: {
    fontWeight: 400,
    fontSize: 12,
    color: theme.palette.secondary.dark,
    marginBottom: 10
  },
  gridAction: {
      width: '100%',
      height: '100%'
 },
 gridActionLastChild: {
   width: '100%',
   height: '100%',
   marginTop: 20
 },
 cardValue: {
   fontWeight: 600,
   fontSize: 50,
   color: theme.palette.white
 },
 cardValueLastChild: {
   fontWeight: 600,
   fontSize: 40,
   color: theme.palette.text.primary
 },

 cardDetailsValue: {
   fontWeight: 400,
   fontSize: 12,
   color: theme.palette.text.primary
 },
 cardRightArea: {
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'center'
 },
 cardRightAreaLastChild: {
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'flex-end'
 },
 orangeIconArea: {
   backgroundColor: theme.palette.orders.orangeIcon,
   height: 60,
   width: 60,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 6,
 },

 blueIconArea: {
   backgroundColor: theme.palette.orders.blueIcon,
   height: 60,
   width: 60,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 6,
 },

 greenIconArea: {
   backgroundColor: theme.palette.orders.greenIcon,
   height: 60,
   width: 60,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 6,
 },
 linearProgressStyle: {
   height: 7,
   borderRadius: 5,
 },
 linearProgressColors: {
   backgroundColor: '#EFF1F3',
 },

 linearProgressBar: {
   borderRadius: 5,
   backgroundColor: theme.palette.primary.main,
 }

}));


const OrderSummaryArea = props => {

    const classes = useStyles();

    const [activeOrders, setActiveOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    //const [allOrders, setAllOrders] = useState(0);

    useEffect(() => {
      handleMetrics();
   }, []);

   const handleMetrics = (event) => {

    let urls = [
      "resorders/get-by-resident/?status=IN_PROGRESS",
      "resorders/get-by-resident/?status=COMPLETED",
      "resorders/get-by-resident/?status=ON_HOLD"
    ];

    const requests = urls.map((url) => AXIOS.get(url));

    Promise.all(requests).then(([{data: active}, {data: completed}, {data: suspended}]) => {
      
      setActiveOrders(active.response.length);
      setCompletedOrders(completed.response.length);
      setPendingOrders(suspended.response.length);
      
  })
    .catch(function (error) {
      console.log(error.message);
    })
  };


    return (
        <Grid container direction="row" spacing={1}>
          <Grid
            item
            lg={4}
            xs={12}>

              <Card className={classes.newOrderBody} elevation={1}>
                <cardContent style={{ width: '100%' }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardTitle}>
                          New
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                        <Grid
                          item
                          lg={6}>
                          <Typography
                            variant="h3"
                            className={classes.cardValue}>
                              {activeOrders}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          className={classes.cardRightArea}>
                            <div className={classes.orangeIconArea}>
                                <NewOrderIcon fontSize="small" style={{ fill:'none' }} />
                            </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </cardContent>
              </Card>
            </Grid>
            <Grid
              item
              lg={4}
              xs={12}>
              <Card className={classes.pendingOrderBody} elevation={1}>
                <cardContent style={{ width: '100%' }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardTitle}>
                          Pending
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                        <Grid
                          item
                          lg={6}>
                          <Typography
                            variant="h3"
                            className={classes.cardValue}>
                              {pendingOrders}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          className={classes.cardRightArea}>
                            <div className={classes.blueIconArea}>
                                <PendingIcon fontSize="small" style={{ fill:'none' }} />
                            </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </cardContent>
              </Card>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}>
              <Card className={classes.closedOrderBody} elevation={1}>
                <cardContent style={{ width: '100%' }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardTitle}>
                          Completed
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                        <Grid
                          item
                          lg={6}>
                          <Typography
                            variant="h3"
                            className={classes.cardValue}>
                              {completedOrders}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          className={classes.cardRightArea}>
                            <div className={classes.greenIconArea}>
                                <ClosedIcon fontSize="small" style={{ fill:'none' }} />
                            </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </cardContent>
              </Card>
            </Grid>
        </Grid>

    );
}

export default OrderSummaryArea;
