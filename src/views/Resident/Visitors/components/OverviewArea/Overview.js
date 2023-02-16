import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  SvgIcon
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

function RedArrowIcon(props) {
  return (
    <SvgIcon {...props} width="28" height="26" viewBox="0 0 28 26">
      <path d="M11.5596 9.5H17.8764M17.8764 9.5V15.5M17.8764 9.5L10.5068 16.5M26.8247 13C26.8247 19.6274 21.1684 25 14.1911 25C7.21384 25 1.55762 19.6274 1.55762 13C1.55762 6.37258 7.21384 1 14.1911 1C21.1684 1 26.8247 6.37258 26.8247 13Z" stroke="#BC1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function GreenArrowIcon(props) {
  return (
    <SvgIcon {...props} width="28" height="26" viewBox="0 0 28 26">
      <path d="M11.5596 9.5H17.8764M17.8764 9.5V15.5M17.8764 9.5L10.5068 16.5M26.8247 13C26.8247 19.6274 21.1684 25 14.1911 25C7.21384 25 1.55762 19.6274 1.55762 13C1.55762 6.37258 7.21384 1 14.1911 1C21.1684 1 26.8247 6.37258 26.8247 13Z" stroke="#1EBC1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function BlueArrowIcon(props) {
  return (
    <SvgIcon {...props} width="28" height="26" viewBox="0 0 28 26">
      <path d="M11.5596 9.5H17.8764M17.8764 9.5V15.5M17.8764 9.5L10.5068 16.5M26.8247 13C26.8247 19.6274 21.1684 25 14.1911 25C7.21384 25 1.55762 19.6274 1.55762 13C1.55762 6.37258 7.21384 1 14.1911 1C21.1684 1 26.8247 6.37258 26.8247 13Z" stroke="#1B75BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
  cardContentStyle: {
    paddingBottom: '0 !important',
    padding: 0,
    width: '100%'
  },
  redIconArea: {
    backgroundColor: 'rgba(188, 27, 27, 0.15)',
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  greenIconArea: {
    backgroundColor: 'rgba(30, 188, 27, 0.15)',
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  blueIconArea: {
    backgroundColor: 'rgba(27, 117, 188, 0.15)',
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
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
  actionTitle: {
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.text.primary,
    marginLeft: 5
  },
  actionTitleWhite: {
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.white,
    marginLeft: 5
  },
  valueStyle: {
    fontWeight: 600,
    fontSize: 17,
    color: theme.palette.text.primary
  }

}));


const Overview = props => {

  const classes = useStyles();

  const { handleDialogOpen, setEdit } = props;

  const [approved, setApproved] = useState(0);
  const [denied, setDenied] = useState(0);

  useEffect(() => {
    handleGetMetrics();
 }, []);

  const handleGetMetrics = () => {

    let token = localStorage.getItem('spfmtoken');
    let tenantSegment = localStorage.getItem('tenantSegment');
    let userId = localStorage.getItem('userId');

     const requestOne = axios.get(`http://132.145.58.252:8081/spaciofm/api/visits/approved-visits-by-resident`, { headers: {
       'Authorization': `Bearer ${token}`,
       'provider': 'CRX',
       'tenant-id' : tenantSegment,
       'user-id' : userId
     } });
     const requestTwo = axios.get(`http://132.145.58.252:8081/spaciofm/api/visits/denied-visits-by-resident `, { headers: {
       'Authorization': `Bearer ${token}`,
       'provider': 'CRX',
       'tenant-id' : tenantSegment,
       'user-id' : userId
     } });

     axios.all([requestOne, requestTwo])
       .then(axios.spread((...responses) => {
         const responseOne = responses[0];
         const responseTwo = responses[1];

         //console.log("RESPONSE 1:", JSON.stringify(responseOne));
         //console.log("RESPONSE 2:", JSON.stringify(responseTwo));
        // console.log("RESPONSE 3:", JSON.stringify(responseThree));

         const approvedVal = responseOne.data.response.length;
         const deniedVal = responseTwo.data.response.length;

         setApproved(approvedVal);
         setDenied(deniedVal);
       }))
       .catch((error) => {
         console.log(error.response);
         console.log(error.message);
       });
}

  const handleCreateNew = () => {
    setEdit(false);
    handleDialogOpen();
  }

  return (
    <Grid container direction="row" spacing={1}>
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.cardBodyStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle}>
            <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={2}>
                  <div className={classes.redIconArea}>
                      <RedArrowIcon fontSize="small" style={{ fill:'none' }} />
                  </div>
                </Grid>
                <Grid
                  item
                  lg={8}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.actionTitle}>
                    Denied
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={2}>
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
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.cardBodyStyle} elevation={1}>
          <CardContent className={classes.cardContentStyle}>
            <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={2}>
                  <div className={classes.greenIconArea}>
                      <GreenArrowIcon fontSize="small" style={{ fill:'none' }} />
                  </div>
                </Grid>
                <Grid
                  item
                  lg={8}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.actionTitle}>
                    Approved
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={2}>
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
          <CardContent className={classes.cardContentStyle}>
            <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={2}>
                  <div className={classes.blueIconArea}>
                      <BlueArrowIcon fontSize="small" style={{ fill:'none' }} />
                  </div>
                </Grid>
                <Grid
                  item
                  lg={8}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.actionTitle}>
                    History
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={2}>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={classes.valueStyle}>
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
        <Card className={classes.actionButton} elevation={1}>
          <CardActionArea
              disableripple="true"
              disabletouchripple="true"
              style={{ height: '100%'}}
              onClick={handleCreateNew}
            >
              <CardContent className={classes.cardContentStyle}>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={3}>
                      <div className={classes.visitorsIconArea}>
                          <AddIcon fontSize="small" style={{ fill:'#FFFFFF', color: '#FFFFFF' }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={9}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitleWhite}>
                        Schedule Visitor(s)
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
        </Card>
      </Grid>
    </Grid>

  );


};

export default Overview;
