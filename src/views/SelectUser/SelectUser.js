import React, { useState } from 'react';
import { Link as RouterLink, withRouter, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Link,
  Typography,
  Card,
  CardActionArea,
  SvgIcon,
  Paper
} from '@material-ui/core';

function UserIcon(props) {
  return (
    <SvgIcon {...props} width="16" height="18" viewBox="0 0 16 18">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.72039 11.8871C2.50179 11.1057 3.5616 10.6667 4.66667 10.6667H11.3333C12.4384 10.6667 13.4982 11.1057 14.2796 11.8871C15.061 12.6685 15.5 13.7283 15.5 14.8334V16.5001C15.5 16.9603 15.1269 17.3334 14.6667 17.3334C14.2064 17.3334 13.8333 16.9603 13.8333 16.5001V14.8334C13.8333 14.1704 13.5699 13.5345 13.1011 13.0656C12.6323 12.5968 11.9964 12.3334 11.3333 12.3334H4.66667C4.00363 12.3334 3.36774 12.5968 2.8989 13.0656C2.43006 13.5345 2.16667 14.1704 2.16667 14.8334V16.5001C2.16667 16.9603 1.79357 17.3334 1.33333 17.3334C0.873096 17.3334 0.5 16.9603 0.5 16.5001V14.8334C0.5 13.7283 0.938987 12.6685 1.72039 11.8871Z" fill="#1B75BC"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 2.33341C6.61929 2.33341 5.5 3.4527 5.5 4.83341C5.5 6.21413 6.61929 7.33341 8 7.33341C9.38071 7.33341 10.5 6.21413 10.5 4.83341C10.5 3.4527 9.38071 2.33341 8 2.33341ZM3.83333 4.83341C3.83333 2.53223 5.69881 0.666748 8 0.666748C10.3012 0.666748 12.1667 2.53223 12.1667 4.83341C12.1667 7.1346 10.3012 9.00008 8 9.00008C5.69881 9.00008 3.83333 7.1346 3.83333 4.83341Z" fill="#1B75BC"/>
    </SvgIcon>
  );
}

function UserIconWhite(props) {
  return (
    <SvgIcon {...props} width="16" height="18" viewBox="0 0 16 18">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.72039 11.8871C2.50179 11.1057 3.5616 10.6667 4.66667 10.6667H11.3333C12.4384 10.6667 13.4982 11.1057 14.2796 11.8871C15.061 12.6685 15.5 13.7283 15.5 14.8334V16.5001C15.5 16.9603 15.1269 17.3334 14.6667 17.3334C14.2064 17.3334 13.8333 16.9603 13.8333 16.5001V14.8334C13.8333 14.1704 13.5699 13.5345 13.1011 13.0656C12.6323 12.5968 11.9964 12.3334 11.3333 12.3334H4.66667C4.00363 12.3334 3.36774 12.5968 2.8989 13.0656C2.43006 13.5345 2.16667 14.1704 2.16667 14.8334V16.5001C2.16667 16.9603 1.79357 17.3334 1.33333 17.3334C0.873096 17.3334 0.5 16.9603 0.5 16.5001V14.8334C0.5 13.7283 0.938987 12.6685 1.72039 11.8871Z" fill="#ffffff"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 2.33341C6.61929 2.33341 5.5 3.4527 5.5 4.83341C5.5 6.21413 6.61929 7.33341 8 7.33341C9.38071 7.33341 10.5 6.21413 10.5 4.83341C10.5 3.4527 9.38071 2.33341 8 2.33341ZM3.83333 4.83341C3.83333 2.53223 5.69881 0.666748 8 0.666748C10.3012 0.666748 12.1667 2.53223 12.1667 4.83341C12.1667 7.1346 10.3012 9.00008 8 9.00008C5.69881 9.00008 3.83333 7.1346 3.83333 4.83341Z" fill="#ffffff"/>
    </SvgIcon>
  );
}


function BriefcaseIcon(props) {
  return (
    <SvgIcon {...props} width="20" height="18" viewBox="0 0 20 18">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 0H12C13.1046 0 14 0.89543 14 2V3H18C19.1046 3 20 3.89543 20 5V16C20 17.1046 19.1046 18 18 18H2C0.89543 18 0 17.1046 0 16V5C0 3.89543 0.89543 3 2 3H6V2C6 0.89543 6.89543 0 8 0ZM2 5H18V10H2V5ZM2 16V12H9V13H11V12H18V16H2ZM12 2V3H8V2H12Z" fill="#1B75BC"/>
    </SvgIcon>
  );
}

function BriefcaseIconWhite(props) {
  return (
    <SvgIcon {...props} width="20" height="18" viewBox="0 0 20 18">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 0H12C13.1046 0 14 0.89543 14 2V3H18C19.1046 3 20 3.89543 20 5V16C20 17.1046 19.1046 18 18 18H2C0.89543 18 0 17.1046 0 16V5C0 3.89543 0.89543 3 2 3H6V2C6 0.89543 6.89543 0 8 0ZM2 5H18V10H2V5ZM2 16V12H9V13H11V12H18V16H2ZM12 2V3H8V2H12Z" fill="#ffffff"/>
    </SvgIcon>
  );
}

function RightArrowIcon(props) {
  return (
    <SvgIcon {...props} width="14" height="14" viewBox="0 0 14 14">
      <path d="M7.58917 0.244078C7.26374 -0.0813592 6.7361 -0.0813592 6.41066 0.244078C6.08523 0.569515 6.08523 1.09715 6.41066 1.42259L10.8214 5.83333H1.16659C0.706348 5.83333 0.333252 6.20643 0.333252 6.66667C0.333252 7.1269 0.706348 7.5 1.16659 7.5H10.8214L6.41066 11.9107C6.08523 12.2362 6.08523 12.7638 6.41066 13.0893C6.7361 13.4147 7.26374 13.4147 7.58917 13.0893L13.4225 7.25592C13.7479 6.93048 13.7479 6.40285 13.4225 6.07741L7.58917 0.244078Z" fill="#1B75BC"/>
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    backgroundImage: 'url(/images/onboarding_background.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  grid: {
    minHeight: '100vh',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 70,
    paddingRight: 70
  },
  formPaper: {
  width: '100%',
  height: '95%',
  display: 'flex',
  justifyContent: 'center',
  overflowY: 'scroll',
},
  formBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingTop: 40,
    paddingBottom: 40,

  },
  already: {
    fontSize: 13,
    color: theme.palette.text.secondary,
    paddingRight: 40,
    paddingLeft: 40
  },
  redirectLink: {
      color: theme.palette.primary.main,
      fontSize: 13
  },

  formArea: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%)'
  },
  welcome: {
    fontSize: 19,
    color: theme.palette.text.title,
    fontWeight: 'bold',
    paddingRight: 40,
    paddingLeft: 40
  },
  actionArea: {
    marginTop: 25,
    paddingRight: 40,
    paddingLeft: 40
  },
  cardContent: {
    padding: '5px 16px 16px 16px'
  },
  cardAction: {
    padding: 15
  },

   gridAction: {
     paddingTop: 20,
     paddingBottom: 20,
     paddingLeft: 25,
     paddingRight: 25
  },
  iconAreaDefault: {
    backgroundColor: theme.palette.primary.light,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  iconAreaHover: {
    backgroundColor: theme.palette.primary.main,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  actionTitle: {
    fontWeight: 600,
    fontSize: 12
  },
  actionSubtitle: {
    marginTop: -3,
    fontSize: 11,
    lineHeight: 1.3
  },
  arrowArea: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  userIconPrimary: {
    fontSize: 16,
    fill:'none'
  },
  userIconWhite: {
    fontSize: 16,
    fill:'none',
    display: 'none'
  },
  rightArrowPrimary: {
    fontSize: 10,
    fill:'none',
    display: 'none'
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid transparent',
    "&:hover": {
      backgroundColor: '#F5F9FF',
      border: '1px solid #1B75BC',
      borderRadius: 4,
    },
  },
  copyrightArea: {
    margin: 0,
    position: 'absolute',
    bottom: 30,
    width: '100%'
  },
  copyright: {
    fontSize: 11,
    color: theme.palette.text.secondary,
  },
  privacyTerms: {
    color: theme.palette.primary.main,
    fontSize: 11
  }
}));


const SelectUser = () => {

   const classes = useStyles();
   let history = useHistory();

   const [isHoverResidents, setIsHoverResidents] = useState(false);
   const [isHoverManagers, setIsHoverManagers] = useState(false);

   const handleGoToResident = () => {
      history.push('/signup');
    }

    const handleGoToFacilityManager = () => {
       history.push('/fm-business');
     }

    return(
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
            <Grid
              item
              lg={8}
            >

            </Grid>
            <Grid
              item
              lg={4}
              xs={12}
            >
              <Paper className={classes.formPaper} elevation={1} square>
                <div className={classes.formBody}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="right"
                    className={classes.already}
                  >
                    Already have an account?{' '}
                    <Link
                      component={RouterLink}
                      to="/signin"
                      variant="body2"
                      underline="none"
                      className={classes.redirectLink}

                    >
                      Sign In
                    </Link>
                  </Typography>
                  <div className={classes.formArea}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className={classes.welcome}
                    >
                      Join Us!
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      className={classes.already}
                    >
                      Welcome to Spacio, to begin this journey, tell us what type of account you’d be opening.
                    </Typography>

                    <div className={classes.actionArea}>
                        <Card className={classes.actionButton} elevation={1}>
                          <CardActionArea
                              disableripple="true"
                              disabletouchripple="true"
                              onClick={handleGoToResident}
                              onMouseEnter={() => setIsHoverResidents(true)}
                              onMouseLeave={() => setIsHoverResidents(false)}
                            >
                              <cardContent>
                                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                                    <Grid
                                      item
                                      lg={2}>
                                      <div className={ !isHoverResidents ? classes.iconAreaDefault : classes.iconAreaHover}>
                                        {!isHoverResidents ?
                                          <UserIcon style={{ fontSize: 16, fill:'none' }} />
                                          :
                                          <UserIconWhite style={{ fontSize: 16, fill:'none' }} />
                                        }

                                      </div>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={8}>
                                      <Typography
                                        variant="body1"
                                        color="primary"
                                        className={classes.actionTitle}>
                                        Resident
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="secondary"
                                        className={classes.actionSubtitle}>
                                        Personal account to manage all your activities.
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={2}
                                      className={classes.arrowArea}>
                                        {isHoverResidents && <RightArrowIcon style={{ fontSize: 10, fill:'none' }} /> }
                                    </Grid>
                                </Grid>
                              </cardContent>
                            </CardActionArea>
                        </Card>

                        <Card className={classes.actionButton} elevation={1} style={{ marginTop: 15 }}>
                          <CardActionArea
                              disableripple="true"
                              disabletouchripple="true"
                              onMouseEnter={() => setIsHoverManagers(true)}
                              onMouseLeave={() => setIsHoverManagers(false)}
                              onClick={handleGoToFacilityManager}
                            >
                              <cardContent>
                                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                                    <Grid
                                      item
                                      lg={2}>
                                      <div className={ !isHoverManagers ? classes.iconAreaDefault : classes.iconAreaHover}>
                                        {!isHoverManagers ?
                                          <BriefcaseIcon style={{ fontSize: 16, fill:'none' }} />
                                          :
                                          <BriefcaseIconWhite style={{ fontSize: 16, fill:'none' }} />
                                        }
                                      </div>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={8}>
                                      <Typography
                                        variant="body1"
                                        color="primary"
                                        className={classes.actionTitle}>
                                        Facility Manager
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="secondary"
                                        className={classes.actionSubtitle}>
                                        Own or belong to a company, this is for you.
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={2}
                                      className={classes.arrowArea}>
                                      {isHoverManagers && <RightArrowIcon style={{ fontSize: 10, fill:'none' }} /> }

                                    </Grid>
                                </Grid>
                              </cardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                  </div>
                  <div className={classes.copyrightArea}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      align="center"
                      className={classes.copyright}
                    >
                    <Link
                      component={RouterLink}
                      to="/signin"
                      variant="body2"
                      underline="none"
                      className={classes.privacyTerms}

                    >
                      Privacy Policy  Terms & Conditions
                    </Link>
                    {' | '}
                      2021 Spacio Systems
                    </Typography>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
    );

};

export default withRouter(SelectUser);
