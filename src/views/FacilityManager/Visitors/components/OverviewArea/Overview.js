import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  SvgIcon
} from '@material-ui/core';
import axios from 'axios';


function WhiteArrowIcon(props) {
  return (
    <SvgIcon {...props} width="41" height="39" viewBox="0 0 41 39">
      <path d="M16.7994 14.4286H25.9146M25.9146 14.4286V23.0867M25.9146 14.4286L15.2802 24.5297M38.827 19.4792C38.827 29.0426 30.665 36.7952 20.5967 36.7952C10.5284 36.7952 2.36646 29.0426 2.36646 19.4792C2.36646 9.91576 10.5284 2.16309 20.5967 2.16309C30.665 2.16309 38.827 9.91576 38.827 19.4792Z" stroke="white" stroke-width="2.88601" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

function YellowArrowIcon(props) {
  return (
    <SvgIcon {...props} width="40" height="39" viewBox="0 0 40 39">
      <path d="M15.8839 14.4286H24.999M24.999 14.4286V23.0867M24.999 14.4286L14.3647 24.5297M37.9114 19.4792C37.9114 29.0426 29.7495 36.7952 19.6812 36.7952C9.61289 36.7952 1.45093 29.0426 1.45093 19.4792C1.45093 9.91576 9.61289 2.16309 19.6812 2.16309C29.7495 2.16309 37.9114 9.91576 37.9114 19.4792Z" stroke="#F09700" stroke-width="2.88601" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

/*function BlueArrowIcon(props) {
  return (
    <SvgIcon {...props} width="30" height="29" viewBox="0 0 30 29">
      <path d="M15.9726 14.4286H25.0878M25.0878 14.4286V23.0867M25.0878 14.4286L14.4535 24.5297M38.0002 19.4792C38.0002 29.0426 29.8382 36.7952 19.7699 36.7952C9.70164 36.7952 1.53967 29.0426 1.53967 19.4792C1.53967 9.91576 9.70164 2.16309 19.7699 2.16309C29.8382 2.16309 38.0002 9.91576 38.0002 19.4792Z" stroke="#0500F1" stroke-width="2.88601" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}*/

function GreenArrowIcon(props) {
  return (
    <SvgIcon {...props} width="30" height="29" viewBox="0 0 30 29">
      <path d="M12.0066 10.8733H18.8403M18.8403 10.8733V17.3643M18.8403 10.8733L10.8677 18.4461M28.5208 14.6597C28.5208 21.8294 22.4017 27.6417 14.8535 27.6417C7.30523 27.6417 1.18616 21.8294 1.18616 14.6597C1.18616 7.48996 7.30523 1.67773 14.8535 1.67773C22.4017 1.67773 28.5208 7.48996 28.5208 14.6597Z" stroke="#187616" strokeWidth="2.16366" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function RedArrowIcon(props) {
  return (
    <SvgIcon {...props} width="30" height="29" viewBox="0 0 30 29">
      <path d="M12.3508 10.8733H19.1844M19.1844 10.8733V17.3643M19.1844 10.8733L11.2118 18.4461M28.8649 14.6597C28.8649 21.8294 22.7459 27.6417 15.1976 27.6417C7.64935 27.6417 1.53027 21.8294 1.53027 14.6597C1.53027 7.48996 7.64935 1.67773 15.1976 1.67773C22.7459 1.67773 28.8649 7.48996 28.8649 14.6597Z" stroke="#F10000" strokeWidth="2.16366" strokeLinecap="round" strokeLinejoin="round"/>
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
      justifyContent: 'center'
  },
  cardBodyFirstStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.card.blue,
  },
  cardContentStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px !important',
  },
  yellowIconArea: {
    backgroundColor: '#FFF7CE',
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
  },
  blueIconArea: {
    backgroundColor: '#0B63A9',
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
  },

  greenIconArea: {
    backgroundColor: '#E1FFDC',
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
  },

  redIconArea: {
    backgroundColor: '#FFE2DC',
    height: 50,
    width: 50,
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
    fontSize: 15,
    color: theme.palette.text.yellow,
  },
  actionTitleWhite: {
    fontWeight: 200,
    fontSize: 15,
    color: theme.palette.white,
  },
  actionTitleBlue: {
    fontWeight: 200,
    fontSize: 15,
    color: theme.palette.text.blue,
  },
  actionTitleGreen: {
    fontWeight: 200,
    fontSize: 15,
    color: theme.palette.text.green,
  },

  actionTitleRed: {
    fontWeight: 200,
    fontSize: 15,
    color: theme.palette.text.red,
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
  },

  cardContentRootStyle: {
    padding: 10
  }
}));


const Overview = props => {

  const classes = useStyles();

  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [denied, setDenied] = useState(0);

  useEffect(() => {
    handleGetMetrics();
 }, []);

 const handleGetMetrics = () => {

   let token = localStorage.getItem('spfmtoken');
   let tenantSegment = localStorage.getItem('tenantSegment');
   let userId = localStorage.getItem('userId');

   const requestOne = axios.get(`http://132.145.58.252:8081/spaciofm/api/visits/pending-visits`, { headers: {
     'Authorization': `Bearer ${token}`,
     'provider': 'CRX',
     'tenant-id' : tenantSegment,
     'user-id' : userId
   } });

    const requestTwo = axios.get(`http://132.145.58.252:8081/spaciofm/api/visits/approved-visits`, { headers: {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenant-id' : tenantSegment,
      'user-id' : userId
    } });

    const requestThree = axios.get(`http://132.145.58.252:8081/spaciofm/api/visits/denied-visits`, { headers: {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenant-id' : tenantSegment,
      'user-id' : userId
    } });

   axios.all([requestOne, requestTwo, requestThree])
     .then(axios.spread((...responses) => {
       const responseOne = responses[0];
       const responseTwo = responses[1];
       const responseThree = responses[2];

       //console.log("RESPONSE 1:", JSON.stringify(responseOne));
       //console.log("RESPONSE 2:", JSON.stringify(responseTwo));
      // console.log("RESPONSE 3:", JSON.stringify(responseThree));
       const pendingVal = responseOne.data.response.length;
       const approvedVal = responseTwo.data.response.length;
       const deniedVal = responseThree.data.response.length;
       setPending(pendingVal);
       setApproved(approvedVal);
       setDenied(deniedVal);
     }))
     .catch((error) => {
       console.log(error.response);
       console.log(error.message);
     });

 }

  return (
    <Grid container direction="row" spacing={1}>
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.cardBodyFirstStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle} classes={{ root: classes.cardContentRootStyle }}>
            <Grid container direction="row" className={classes.gridAction}>
                <Grid
                  item
                  lg={4}>
                  <div className={classes.blueIconArea}>
                      <WhiteArrowIcon fontSize="small" style={{ fill:'none' }} />
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
                    All Requests
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.valueStyleWhite}>
                    0
                  </Typography>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.cardBodyStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle} classes={{ root: classes.cardContentRootStyle }}>
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
                  Pending Requests
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
        lg={3}
        xs={12}>
        <Card className={classes.cardBodyStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle} classes={{ root: classes.cardContentRootStyle }}>
            <Grid container direction="row" className={classes.gridAction}>
              <Grid
                item
                lg={4}>
                <div className={classes.greenIconArea}>
                    <GreenArrowIcon fontSize="small" style={{ fill:'none' }} />
                </div>
              </Grid>
              <Grid
                item
                lg={8}
                className={classes.rightAlign}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.actionTitleGreen}>
                  Approved Requests
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.valueStyle}>
                  {approved}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.cardBodyStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle} classes={{ root: classes.cardContentRootStyle }}>
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
                className={classes.rightAlign}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.actionTitleRed}>
                  Denied Requests
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.valueStyle}>
                  {denied}
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
