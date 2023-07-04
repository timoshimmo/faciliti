import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  SvgIcon
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AXIOS from '../../../../../util/webservices';


function BuildingIcon(props) {
  return (
    <SvgIcon {...props} width="31" height="25" viewBox="0 0 31 25">
      <path d="M6.17857 9.36364V18.7727M12.3929 9.36364V18.7727M18.6071 9.36364V18.7727M24.8214 9.36364V18.7727M3.07143 18.7727H27.9286M1 24H30M2.03566 9.36364H28.9642L15.4999 1L2.03566 9.36364Z" stroke="#1B75BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function MaintenanceIcon(props) {
  return (
    <SvgIcon {...props} width="22" height="22" viewBox="0 0 22 22">
      <path fillRule="evenodd" clipRule="evenodd" d="M22 15.5563V6.44365L15.5563 0H6.44365L0 6.44365V15.5563L6.44365 22H15.5563L22 15.5563ZM7.27208 2H14.7279L20 7.27208V14.7279L14.7279 20H7.27208L2 14.7279V7.27208L7.27208 2ZM11.0003 16.9983C11.5528 16.9983 12.0007 16.5506 12.0007 15.9983C12.0007 15.4461 11.5528 14.9983 11.0003 14.9983C10.4479 14.9983 10 15.4461 10 15.9983C10 16.5506 10.4479 16.9983 11.0003 16.9983ZM12.0036 4.99835H10.003V12.9983H12.0036V4.99835Z" fill="#BC421B"/>
    </SvgIcon>
  );
}

function PaymentsIcon(props) {
  return (
    <SvgIcon {...props} width="27" height="24" viewBox="0 0 27 24">
      <path fill="#4FBC1B" d="M3.50004 4.5C3.50004 3.67157 2.82846 3 2.00004 3C1.17161 3 0.500038 3.67157 0.500038 4.5H3.50004ZM2.00004 20H0.500038H2.00004ZM2.00166 4.59116L3.50071 4.53786L3.50066 4.5365L2.00166 4.59116ZM4.50004 2V0.5H4.50002L4.50004 2ZM21 3.5C21.8285 3.5 22.5 2.82843 22.5 2C22.5 1.17157 21.8285 0.5 21 0.5V3.5ZM20 14C20 14.2761 19.7762 14.5 19.5 14.5V17.5C21.433 17.5 23 15.933 23 14H20ZM19.5 14.5C19.2239 14.5 19 14.2761 19 14H16C16 15.933 17.567 17.5 19.5 17.5V14.5ZM19 14C19 13.7239 19.2239 13.5 19.5 13.5V10.5C17.567 10.5 16 12.067 16 14H19ZM19.5 13.5C19.7762 13.5 20 13.7239 20 14H23C23 12.067 21.433 10.5 19.5 10.5V13.5ZM0.500038 4.5V20H3.50004V4.5H0.500038ZM0.500038 20C0.500038 20.9283 0.868787 21.8185 1.52516 22.4749L3.64648 20.3536C3.55272 20.2598 3.50004 20.1326 3.50004 20H0.500038ZM1.52516 22.4749C2.18154 23.1313 3.07178 23.5 4.00004 23.5V20.5C3.86743 20.5 3.74025 20.4473 3.64648 20.3536L1.52516 22.4749ZM4.00004 23.5H24V20.5H4.00004V23.5ZM24 23.5C24.6631 23.5 25.299 23.2366 25.7678 22.7678L23.6465 20.6464C23.7403 20.5527 23.8674 20.5 24 20.5V23.5ZM25.7678 22.7678C26.2367 22.2989 26.5 21.663 26.5 21H23.5C23.5 20.8674 23.5527 20.7402 23.6465 20.6464L25.7678 22.7678ZM26.5 21V8H23.5V21H26.5ZM26.5 8C26.5 7.33696 26.2366 6.70108 25.7678 6.23223L23.6465 8.35355C23.5527 8.25978 23.5 8.13261 23.5 8H26.5ZM25.7678 6.23223C25.299 5.76339 24.6631 5.5 24 5.5V8.5C23.8674 8.5 23.7403 8.44732 23.6465 8.35355L25.7678 6.23223ZM24 5.5H4.55995V8.5H24V5.5ZM4.55995 5.5C3.96427 5.5 3.51851 5.03851 3.50071 4.53786L0.502608 4.64446C0.581142 6.85328 2.44446 8.5 4.55995 8.5V5.5ZM3.50066 4.5365C3.49577 4.40219 3.51799 4.26828 3.56601 4.14275L0.764024 3.07089C0.57196 3.57298 0.483068 4.10862 0.502657 4.64582L3.50066 4.5365ZM3.56601 4.14275C3.61403 4.01723 3.68685 3.90267 3.78014 3.80592L1.6205 1.72362C1.24738 2.1106 0.956088 2.56881 0.764024 3.07089L3.56601 4.14275ZM3.78014 3.80592C3.87342 3.70917 3.98525 3.63222 4.10895 3.57965L2.93567 0.818599C2.44092 1.02884 1.99363 1.33664 1.6205 1.72362L3.78014 3.80592ZM4.10895 3.57965C4.23264 3.52709 4.36566 3.5 4.50005 3.5L4.50002 0.5C3.96246 0.500005 3.43041 0.608363 2.93567 0.818599L4.10895 3.57965ZM4.50004 3.5H21V0.5H4.50004V3.5Z" />
  </SvgIcon>
  );
}

function VisitorsIcon(props) {
  return (
    <SvgIcon {...props} width="30" height="29" viewBox="0 0 30 29">
      <path d="M24.5218 5.21612V2.53603M24.5218 5.21612L21.9729 4.38793M24.5218 5.21612L22.9465 7.38436M24.5218 5.21612L26.0971 7.38436M24.5218 5.21612L27.0707 4.38793M1.87354 26.6556C3.19155 24.3743 5.08672 22.4799 7.36864 21.1629C9.65057 19.8459 12.2389 19.1526 14.8736 19.1526C17.5083 19.1526 20.0966 19.846 22.3785 21.1631C24.6604 22.4801 26.5556 24.3745 27.8735 26.6559M22.7297 14.0215C22.0881 15.4816 21.0519 16.7338 19.7376 17.6373C18.4233 18.5408 16.883 19.0597 15.2899 19.1357C13.6968 19.2117 12.1141 18.8418 10.7198 18.0676C9.3254 17.2934 8.17466 16.1455 7.39694 14.7531C6.61921 13.3607 6.24533 11.7789 6.31733 10.1857C6.38934 8.59241 6.90438 7.05083 7.80454 5.73425C8.7047 4.41767 9.95429 3.3783 11.4128 2.73302C12.8713 2.08773 14.4809 1.8621 16.0607 2.08151" stroke="#4D4D4D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
   </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  gridAction: {
    padding: 0,
 },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80
  },
  buildingIconArea: {
    backgroundColor: theme.palette.primary.light,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  maintenanceIconArea: {
    backgroundColor: theme.palette.error.veryLight,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  paymentsIconArea: {
    backgroundColor: theme.palette.success.veryLight,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  visitorsIconArea: {
    backgroundColor: theme.palette.background.light,
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
    color: theme.palette.text.primary
  },
  actionSubtitle: {
    fontSize: 11,
    lineHeight: 1.3,
    color: theme.palette.text.secondary,
  },
  actionSubtitle2: {
    fontSize: 11,
    lineHeight: 1.3,
    color: theme.palette.primary.main,
  },

}));


const OverviewArea = () => {

  const classes = useStyles();
  let history = useHistory();

  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userDetails');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

  const [visitsCount, setVisitsCount] = useState(0);
  const [contractsCount, setContractsCount] = useState(0);
  const [maintenanceCount, setMaintenanceCount] = useState(0);

  useEffect(() => {
    handleMetrics();
 }, []);

 //"resorders/?index=0&range=1000"

  const handleMetrics = () => {

    let urls = [
      "visits/pending-visits",
      "contracts/?index=0&range=1000",
      "meetings/pending-meetings"
    ];

    const requests = urls.map((url) => AXIOS.get(url));

    Promise.all(requests).then(([{data: visits}, {data: contracts}, {data: meetings}]) => {
      
        setVisitsCount(visits.response.length);
        setContractsCount(contracts.response.length);
        setMaintenanceCount(meetings.response.length);
      
  })
    .catch(function (error) {
      console.log(error.message);
    })
  };

  const handleProfile = () => {
    history.push('/profile');
 }

 const handleMeetings = () => {
  history.push('/meetings');
}

const handleServiceContracts = () => {
  history.push('/fm-services');
}

const handleVisits = () => {
  history.push('/fm-visitors');
}

  //console.log(userData);

  return (
    <Grid container direction="row" spacing={1}>
      <Grid
        item
        lg={3}
        xs={12}>

        <Card className={classes.actionButton} elevation={1}>
          <CardActionArea
              disableripple="true"
              disabletouchripple="true"
              style={{ height: '100%'}}
              onClick={handleProfile}
            >
              <CardContent className={classes.cardContent}>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.buildingIconArea}>
                          <BuildingIcon fontSize="small" style={{ fill:'none' }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitle}>
                        {userData.crxDetails.fullName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.actionSubtitle}>
                        {userData.crxDetails.currentEstateName}
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
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
              onClick={handleMeetings}
            >
              <CardContent>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.maintenanceIconArea}>
                          <MaintenanceIcon fontSize="small" style={{ fill:'none' }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitle}>
                        Meetings
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.actionSubtitle2}>
                        {maintenanceCount} pending
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
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
              onClick={handleServiceContracts}
            >
              <CardContent>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.paymentsIconArea}>
                          <PaymentsIcon fontSize="small" style={{ fill:'none' }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitle}>
                        Service Contracts
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.actionSubtitle2}>
                        {contractsCount} Active
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
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
              onClick={handleVisits}
            >
              <CardContent>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.visitorsIconArea}>
                          <VisitorsIcon fontSize="small" style={{ fill:'none' }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitle}>
                        Visitors
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.actionSubtitle2}>
                        {visitsCount} Scheduled
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

export default OverviewArea;
