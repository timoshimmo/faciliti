import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Link,
  Typography,
  Divider,
  Paper
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    backgroundImage: 'url(/images/onboarding_background.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
},
  formBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'url(/images/complete_signup.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 40px',
    backgroundSize: '200px 400px',
  },
  imageIcon: {
    width: 120,
    height: 35,
  },
  completedContent: {
    height: '100%',
    maxWidth: '100%',
    padding: 40
  },
  congratsContainer: {
    height: '100%',
    paddingBottom: 50
  },
  congratsMsg: {
    fontSize: 19,
    color: theme.palette.text.title,
    fontWeight: 'bold',
    width: '70%'
  },
  congratsMsgSubtitle: {
    fontSize: 13,
    color: theme.palette.text.secondary,
    width: '75%',
    marginBottom: 20
  },
  redirectLink: {
    color: theme.palette.text.primary,
    fontSize: 13,
    marginTop: 10
  },
  signinLink: {
    marginTop: 20
  }
}));


const CompleteForgot = props => {

  const classes = useStyles();

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
                <div className={classes.completedContent}>
                  <Grid container direction="row" className={classes.topArea}>
                      <Grid
                        item
                        lg={6}
                      >
                        <img src="/images/spacio_logo_blue.png" className={classes.imageIcon} alt="spacio icon"></img>
                      </Grid>
                  </Grid>
                  <Grid container alignItems="flex-end" className={classes.congratsContainer}>
                  <Grid item lg={12}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className={classes.congratsMsg}
                    >
                        Reset email successfully sent
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        className={classes.congratsMsgSubtitle}
                      >
                        Click the link in your email to continue.
                      </Typography>

                      <Divider />
                        <Typography
                          variant="body2"
                          gutterBottom
                          align="center"
                          className={classes.signinLink}
                        >
                        <Link
                          component={RouterLink}
                          to="/signin"
                          variant="body2"
                          underline="none"
                          className={classes.redirectLink}

                        >
                          Process to Sign in
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Paper>
          </Grid>
      </Grid>
    </div>
  );

};

export default withRouter(CompleteForgot);
