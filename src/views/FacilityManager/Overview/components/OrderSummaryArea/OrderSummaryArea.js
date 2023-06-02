import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  SvgIcon,
  LinearProgress
} from '@material-ui/core';
import AXIOS from '../../../../../util/webservices';

function NewOrderIcon(props) {
  return (
    <SvgIcon {...props} width="41" height="38" viewBox="0 0 41 38">
      <path d="M2.32676 37.2828V5.26572C15.4705 -3.882 25.3281 14.4134 38.4718 5.26572V28.135C25.3281 37.2828 15.4704 18.9873 2.32666 28.135" stroke="#0766B0" strokeWidth="4.375" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function PendingIcon(props) {
  return (
    <SvgIcon {...props} width="35" height="33" viewBox="0 0 35 33">
      <path d="M9.61041 17.5833H19.9602L16.3568 20.9271L18.5793 22.9895L25.9767 16.125L18.5793 9.26048L16.3568 11.3229L19.9602 14.6667L9.61041 14.6667V17.5833Z" fill="#FFB03A"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.18124 16.125C0.18124 7.26544 7.92081 0.0833435 17.4681 0.0833435C27.0153 0.0833435 34.7549 7.26544 34.7549 16.125C34.7549 24.9846 27.0153 32.1667 17.4681 32.1667C7.92081 32.1667 0.18124 24.9846 0.18124 16.125ZM3.3243 16.125C3.3243 23.3737 9.65668 29.25 17.4681 29.25C25.2794 29.25 31.6118 23.3737 31.6118 16.125C31.6118 8.87627 25.2794 3.00001 17.4681 3.00001C9.65668 3.00001 3.3243 8.87627 3.3243 16.125Z" fill="#FFB03A"/>
    </SvgIcon>
  );
}

function CompletedIcon(props) {
  return (
    <SvgIcon {...props} width="35" height="33" viewBox="0 0 35 33">
      <path d="M22.615 10.7188L14.2971 18.4376L10.6937 15.0938L8.47126 17.1562L14.2971 22.5624L24.8375 12.7812L22.615 10.7188Z" fill="#1BBC2B"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.4401 32.1667C7.89289 32.1667 0.15332 24.9846 0.15332 16.125C0.15332 7.26544 7.89289 0.0833435 17.4401 0.0833435C26.9874 0.0833435 34.727 7.26544 34.727 16.125C34.727 24.9846 26.9874 32.1667 17.4401 32.1667ZM17.4401 29.25C25.2515 29.25 31.5839 23.3737 31.5839 16.125C31.5839 8.87627 25.2515 3.00001 17.4401 3.00001C9.62876 3.00001 3.29638 8.87627 3.29638 16.125C3.29638 23.3737 9.62876 29.25 17.4401 29.25Z" fill="#1BBC2B"/>
    </SvgIcon>
  );
}

function ClosedIcon(props) {
  return (
    <SvgIcon {...props} width="15" height="15" viewBox="0 0 15 20">
     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-63.000000, -1959.000000)" fill="#e53935">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M16.121,1809.795 L15.414,1810.502 L16.121,1811.209 C16.512,1811.6 16.512,1812.233 16.121,1812.623 C15.73,1813.014 15.097,1813.014 14.707,1812.623 L14,1811.916 L13.293,1812.623 C12.902,1813.014 12.269,1813.014 11.878,1812.623 C11.488,1812.233 11.488,1811.6 11.878,1811.209 L12.585,1810.502 L11.878,1809.795 C11.488,1809.404 11.488,1808.771 11.878,1808.381 C12.269,1807.99 12.902,1807.99 13.293,1808.381 L14,1809.088 L14.707,1808.381 C15.097,1807.99 15.73,1807.99 16.121,1808.381 C16.512,1808.771 16.512,1809.404 16.121,1809.795 L16.121,1809.795 Z M19,1815.916 C19,1816.469 18.552,1817 18,1817 L10,1817 C9.447,1817 9,1816.469 9,1815.916 L9,1803.416 C9,1803.14 9.224,1803 9.5,1803 L10,1803 C10,1804 10.895,1805 12,1805 L16,1805 C17.104,1805 18,1804 18,1803 L18.5,1803 C18.776,1803 19,1803.14 19,1803.416 L19,1815.916 Z M13,1801 L15,1801 C15.552,1801 16,1801.447 16,1802 C16,1802.552 15.552,1803 15,1803 L13,1803 C12.447,1803 12,1802.552 12,1802 C12,1801.447 12.447,1801 13,1801 L13,1801 Z M19,1801 L18,1801 C18,1800 17.104,1799 16,1799 L12,1799 C10.895,1799 10,1800 10,1801 L9,1801 C7.895,1801 7,1801.812 7,1802.916 L7,1816.916 C7,1818.021 7.895,1819 9,1819 L19,1819 C20.104,1819 21,1818.021 21,1816.916 L21,1802.916 C21,1801.812 20.104,1801 19,1801 L19,1801 Z" id="fileboard_close-[#1591]">

</path>
            </g>
        </g>
    </g>
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
   completedOrderBody: {
     backgroundColor: theme.palette.orders.green,
     display: 'flex',
     alignItems: 'center',
     paddingTop: 30,
     paddingBottom: 30,
     paddingLeft: 30,
     paddingRight: 30,
     height: 80
   },
   closedOrderBody: {
    backgroundColor: theme.palette.error.main,
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
   fontSize: 32,
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

 redIconArea: {
  backgroundColor: theme.palette.error.light,
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
    const [closedOrders, setClosedOrders] = useState(0);
    //const [allOrders, setAllOrders] = useState(0);

    useEffect(() => {
      handleMetrics();
   }, []);

   const handleMetrics = (event) => {

    let urls = [
      "workorders/?status=IN_PROGRESS",
      "workorders/?status=COMPLETED",
      "workorders/?status=ON_HOLD",
      "workorders/?status=CLOSED"
    ];

    const requests = urls.map((url) => AXIOS.get(url));

    Promise.all(requests).then(([{data: active}, {data: completed}, {data: suspended}, {data: closed}]) => {
      
      setActiveOrders(active.response.length);
      setCompletedOrders(completed.response.length);
      setPendingOrders(suspended.response.length);
      setClosedOrders(closed.response.length);
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
                <CardContent style={{ width: '100%' }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardTitle}>
                          In Progress
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
                                <PendingIcon fontSize="small" style={{ fill:'none' }} />
                            </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              lg={4}
              xs={12}>
              <Card className={classes.pendingOrderBody} elevation={1}>
                <CardContent style={{ width: '100%' }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardTitle}>
                          Suspended
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
                                <NewOrderIcon fontSize="small" style={{ fill:'none' }} />
                            </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}>
              <Card className={classes.completedOrderBody} elevation={1}>
                <CardContent style={{ width: '100%' }}>
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
                                <CompletedIcon fontSize="small" style={{ fill:'none' }} />
                            </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}>
              <Card className={classes.closedOrderBody} elevation={1}>
                <CardContent style={{ width: '100%' }}>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.cardTitle}>
                          Closed
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
                              {closedOrders}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          className={classes.cardRightArea}>
                            <div className={classes.redIconArea}>
                                <ClosedIcon fontSize="small" style={{ fill:'none' }} />
                            </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
    );
}

export default OrderSummaryArea;
