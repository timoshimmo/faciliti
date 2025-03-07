import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  SvgIcon
} from '@material-ui/core';
//import AddIcon from '@material-ui/icons/Add';
import AXIOS from '../../../../../util/webservices';


function RedArrowIcon(props) {
  return (
    <SvgIcon {...props} width="41" height="39" viewBox="0 0 41 39">
      <path d="M16.7994 14.4286H25.9146M25.9146 14.4286V23.0867M25.9146 14.4286L15.2802 24.5297M38.827 19.4792C38.827 29.0426 30.665 36.7952 20.5967 36.7952C10.5284 36.7952 2.36646 29.0426 2.36646 19.4792C2.36646 9.91576 10.5284 2.16309 20.5967 2.16309C30.665 2.16309 38.827 9.91576 38.827 19.4792Z" stroke="white" strokeWidth="2.88601" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function YellowArrowIcon(props) {
  return (
    <SvgIcon {...props} width="40" height="39" viewBox="0 0 40 39">
      <path d="M15.8839 14.4286H24.999M24.999 14.4286V23.0867M24.999 14.4286L14.3647 24.5297M37.9114 19.4792C37.9114 29.0426 29.7495 36.7952 19.6812 36.7952C9.61289 36.7952 1.45093 29.0426 1.45093 19.4792C1.45093 9.91576 9.61289 2.16309 19.6812 2.16309C29.7495 2.16309 37.9114 9.91576 37.9114 19.4792Z" stroke="#F09700" strokeWidth="2.88601" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function BlueArrowIcon(props) {
  return (
    <SvgIcon {...props} width="40" height="39" viewBox="0 0 40 39">
      <path d="M15.9726 14.4286H25.0878M25.0878 14.4286V23.0867M25.0878 14.4286L14.4535 24.5297M38.0002 19.4792C38.0002 29.0426 29.8382 36.7952 19.7699 36.7952C9.70164 36.7952 1.53967 29.0426 1.53967 19.4792C1.53967 9.91576 9.70164 2.16309 19.7699 2.16309C29.8382 2.16309 38.0002 9.91576 38.0002 19.4792Z" stroke="#0500F1" strokeWidth="2.88601" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}


const useStyles = makeStyles(theme => ({
  gridAction: {
    padding: 7
 },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  cardBodyStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
  },
  cardBodyFirstStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.palette.card.red,
  },
  cardContentStyle: {
    padding: 20,
    width: '100%'
  },
  redIconArea: {
    backgroundColor: '#F95959',
    height: 65,
    width: 65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
  },
  yellowIconArea: {
    backgroundColor: '#FFF7CE',
    height: 65,
    width: 65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
  },
  blueIconArea: {
    backgroundColor: '#DCF2FF',
    height: 65,
    width: 65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
  },
  visitorsIconArea: {
    backgroundColor: 'transaparent',
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  actionTitleYellow: {
    fontWeight: 200,
    fontSize: 16,
    color: theme.palette.text.yellow,
  },
  actionTitleWhite: {
    fontWeight: 200,
    fontSize: 16,
    color: theme.palette.white,
  },
  actionTitleBlue: {
    fontWeight: 200,
    fontSize: 16,
    color: theme.palette.text.blue,
  },
  valueStyle: {
    fontWeight: 400,
    fontSize: 30,
    color: theme.palette.text.primary,
    marginTop: 15
  },
  valueStyleWhite: {
    fontWeight: 400,
    fontSize: 30,
    color: theme.palette.white,
    marginTop: 15
  },
  rightAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }

}));


const Overview = () => {

  const classes = useStyles();

  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [allMeetings, setAllMeetings] = useState(0);

  useEffect(() => {
    handleMetrics();
 }, []);

 const handleMetrics = () => {

  let urls = [
    "meetings/pending-meetings",
    "meetings/completed-meetings",
    "meetings/count"
  ];

  const requests = urls.map((url) => AXIOS.get(url));

  Promise.all(requests).then(([{data: pending}, {data: completed}, {data: all}]) => {
      setPending(pending.response.length);
      setCompleted(completed.response.length);
      setAllMeetings(all);
    
})
  .catch(function (error) {
    console.log(error.message);
    console.log(error.response);
  })
};

 /* const handleGetMetrics = () => {

   let token = localStorage.getItem('spfmtoken');
   let tenantSegment = localStorage.getItem('tenantSegment');
   let userId = localStorage.getItem('userId');

   const requestOne = axios.get(`http://132.145.58.252:8081/spaciofm/api/meetings/pending-meetings`, { headers: {
     'Authorization': `Bearer ${token}`,
     'provider': 'CRX',
     'tenant-id' : tenantSegment,
     'user-id' : userId
   } });

    const requestTwo = axios.get(`http://132.145.58.252:8081/spaciofm/api/meetings/completed-meetings`, { headers: {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenant-id' : tenantSegment,
      'user-id' : userId
    } });

  /*  const requestThree = axios.get(`http://132.145.58.252:8081/spaciofm/api/meetings`, { headers: {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenant-id' : tenantSegment,
      'user-id' : userId
    } });

   axios.all([requestOne, requestTwo])
     .then(axios.spread((...responses) => {
       const responseOne = responses[0];
       const responseTwo = responses[1];
       //const responseThree = responses[2];

       //console.log("RESPONSE 3:", JSON.stringify(responseOne.data.response.length));
       const pendingVal = responseOne.data.response.length;
       const completedVal = responseTwo.data.response.length;
       //const allVal = responseThree.data.response.length;
       setPending(pendingVal);
       setCompleted(completedVal);
      // setAllMeetings(allVal);
     }))
     .catch(function (error) {
       console.log(error.response);
       console.log(error.message);
     });

 }*/

  return (
    <Grid container direction="row" spacing={1}>
      <Grid
        item
        lg={4}
        xs={12}>
        <Card className={classes.cardBodyFirstStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle}>
            <Grid container direction="row" className={classes.gridAction}>
                <Grid
                  item
                  lg={4}>
                  <div className={classes.redIconArea}>
                      <RedArrowIcon fontSize="small" style={{ fill:'none' }} />
                  </div>
                </Grid>
                <Grid
                  item
                  lg={8}
                  className={classes.rightAlign}
                  >
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.actionTitleWhite}>
                    All Meetings
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.valueStyleWhite}>
                    {allMeetings}
                  </Typography>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        lg={4}
        xs={12}>
        <Card className={classes.cardBodyStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle}>
            <Grid container direction="row" className={classes.gridAction}>
              <Grid
                item
                lg={4}>
                <div className={classes.yellowIconArea}>
                    <YellowArrowIcon fontSize="small" style={{ fill:'none' }} />
                </div>
              </Grid>
              <Grid
                item
                lg={8}
                className={classes.rightAlign}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.actionTitleYellow}>
                  Pending Meetings
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.valueStyle}>
                  {pending}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        lg={4}
        xs={12}>
        <Card className={classes.cardBodyStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle}>
            <Grid container direction="row" className={classes.gridAction}>
              <Grid
                item
                lg={4}>
                <div className={classes.blueIconArea}>
                    <BlueArrowIcon fontSize="small" style={{ fill:'none' }} />
                </div>
              </Grid>
              <Grid
                item
                lg={8}
                className={classes.rightAlign}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.actionTitleBlue}>
                  Completed Meetings
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.valueStyle}>
                  {completed}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Overview;
