import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  Link,
  Typography,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Checkbox,
  Paper,
  IconButton
} from '@material-ui/core';
import validate from 'validate.js';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
//import { history } from '../../helpers';
//email: true,
const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 150
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length:{
      minimum: 6
    }
  }
};

/*

format: {
 pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/,
 message: 'must have at least 6 characters long with one lower case, one uppercase and a number'
}

*/

const useStyles = makeStyles(theme => ({

  root: {
    maxHeight: '100vh',
    height: '100vh',
    maxWidth: '100%',
    backgroundImage: 'url(/images/onboarding_background.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  grid: {
    maxHeight: '100vh',
  },
  gridItem: {
    width: '100%',
    maxHeight: '100vh',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 70,
    paddingRight: 70,
  },
  formPaper: {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflowY: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  }
},
  formBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: 40
  },
  imageIcon: {
    width: 120,
    height: 35,
  },
  newhere: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },
  redirectLink: {
      color: theme.palette.primary.main,
      fontSize: 13
  },
  signinContainer: {
    height: '100%',
    paddingBottom: 30,
    width: '100%'
  },
  welcome: {
    fontSize: 19,
    color: theme.palette.text.title,
    fontWeight: 'bold'
  },
  already: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },
  dividerSignin: {
    marginTop: 15,
    marginBottom: 15
  },
  signinForm: {
    width: '100%',
    marginTop: 17,

  },
  formComponent: {
  width: '100%',
  marginBottom: theme.spacing(2),
  fontSize: 10
},
helper: {
  fontSize: 11
},
textField: {
  backgroundColor: '#FFFFFF',
  border: '1px solid #8692A6',
  borderRadius: 6,
  transition: theme.transitions.create(['background-color']),
  padding: '7px 25px',
  marginTop: 5,
  '&:hover': {
    border: '1px solid #1565D8',
    backgroundColor: '#FFFFFF',
 },
},
passwordVisibility: {
   margin: 0,
   fontSize: 10,
   backgroundColor: 'transparent',
   boxShadow: 'none',
   textTransform: 'capitalize',
   padding:0,
   minHeight: 0,
   minWidth: 0,
   color: '#000000',
   "&:hover": {
     backgroundColor: 'transparent',
   },
},
termsCheckbox: {
  marginLeft: '-14px'
},
termsText: {
  fontSize: 11,
  color: theme.palette.text.secondary,
},
signInButton: {
  fontSize: 12,
  textTransform: 'none',
  marginTop: 15,
  paddingTop: 15,
  paddingBottom: 15,
  fontFamily: [
    'Open Sans',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
},
buttonArea: {
  display: 'flex',
  alignItems: 'center',
  marginTop: -15
},
secondaryLink: {
  color: theme.palette.text.primary,
  fontSize: 11,
  marginTop: 10
},
forgotLink: {
  marginTop: 5
},
copyrightArea: {
  margin: 0,
  position: 'absolute',
  bottom: 30,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  left: 0,
  right: 0
},
copyright: {
  fontSize: 11,
  color: theme.palette.text.secondary,
},
privacyTerms: {
  color: theme.palette.primary.main,
  fontSize: 11
},
subtitleSpacing: {
    marginBottom: 20,
    fontSize: 12,
  },
buttonProgress: {
   color: theme.palette.primary.main,
   position: 'absolute',
   top: '50%',
   left: '50%',
   marginTop: -10,
   marginLeft: -12,
 },
 helperRoot: {
   height: 17
 }
}));

const SignIn = props => {

  const classes = useStyles();
  let history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const timer = React.useRef();

  const [formState, setFormState] = useState({
     isValid: false,
     values: {},
     touched: {},
     errors: {}
   });

   useEffect(() => {

  /*   if (typeof localStorage !== 'undefined') {
       localStorage.removeItem('spfmtoken');
       localStorage.removeItem('provider');
       localStorage.removeItem('tenantId');
       localStorage.removeItem('userId');
       localStorage.removeItem('userDetails');
     }*/

      const errors = validate(formState.values, schema);
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /*if(emailArr.includes(formState.values.email) && passwordArr.includes(formState.values.password)) {
    history.push('/home');
  }*/

  const handleLogin = () => {


    if (!loading) {
      setLoading(true);

      const obj = {
        username: formState.values.email,
        password: formState.values.password,
      };
      axios.post('http://132.145.58.252:8081/spaciofm/api/authenticate', obj)
      .then(response => {
        //const res = response.data;
        //console.log("SIGN IN: " + JSON.stringify(response.data));
        setLoading(false);

        if(!response.data.userDetails.crxDetails.activated) {
            setServerError("Your account is not validated. Click the link in your email to validate your account");
            setOpenError(true);
        }
        else {
            localStorage.setItem('spfmtoken', response.data.token);
          //  const tenantSegment =
           // localStorage.setItem('provider', JSON.stringify(response.data.userDetails.crxDetails.providerName));
            localStorage.setItem('tenantId', response.data.userDetails.crxDetails.segmentName);
            localStorage.setItem('tenantSegment', response.data.userDetails.crxDetails.tenantSegment);
            localStorage.setItem('userId', response.data.userDetails.crxDetails.userId);
            localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
            localStorage.setItem('currentEstateXri', JSON.stringify(response.data.userDetails.crxDetails.currentEstateXri));

            if(response.data.userDetails.crxDetails.accountCategories[0] === 25) {
          //    console.log("USERDETAILS: " + JSON.stringify(response.data.userDetails));
              history.push('/overview');
            }
            else {
            //  console.log("USERDETAILS: " + JSON.stringify(response.data.userDetails));
              history.push('/home');
            }

        } 

      })
      .catch(function (error) {
        setLoading(false);
        console.log(error.response.status);
        console.log(error.response.data.error);
        setLoading(false);
        setServerError("Invalid login credentials");
        setOpenError(true);

      });
    }
  }

/*  const handleSuccessFulLogin = () => {
    if (!loading) {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
      //  console.log(emailArr.filter(user => user.email === "tokmangwang@gmail.com" && user.password === "12345678"));
        if(formState.values.email === "tokmangwang@gmail.com" && formState.values.password === "12345678") {
          history.push('/home');
        }
        else if(formState.values.email === "testing@gmail.com" && formState.values.password === "12345678") {
          history.push('/overview');
        }
        else {
          setServerError("Invalid login credentials");
          setOpenError(true);
        }
      }, 2000);
    }
  }*/

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
          <Grid
            item
            lg={7}
          >

          </Grid>
          <Grid
            item
            lg={5}
            xs={12}
            className={classes.gridItem}
          >
            <Paper className={classes.formPaper} elevation={1} square>
                <div className={classes.formBody}>
                  <Grid container direction="row" className={classes.topArea}>
                    <Grid
                      item
                      lg={6}
                    >
                      <img src="/images/spacio_logo_blue.png" className={classes.imageIcon} alt="spacio logo"></img>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                    >
                    <Typography
                      variant="body2"
                      gutterBottom
                      align="right"
                      className={classes.newhere}
                    >
                      New here?{' '}
                      <Link
                        component={RouterLink}
                        to="/onboarding"
                        variant="body2"
                        underline="none"
                        className={classes.redirectLink}

                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" className={classes.signinContainer}>
                    <Grid item lg={12}>
                      <Typography
                        variant="h4"
                        gutterBottom
                        className={classes.welcome}
                      >
                        Welcome
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        className={classes.already}
                      >
                        Welcome to Spacio, sign in to continue
                      </Typography>

                      <Divider className={classes.dividerSignin} />

                      <Collapse in={openError}>
                                <MuiAlert
                                  severity="error"
                                  action={
                                     <IconButton
                                       aria-label="close"
                                       color="inherit"
                                       size="small"
                                       onClick={() => {
                                         setOpenError(false);
                                       }}
                                     >
                                       <CloseIcon fontSize="inherit" />
                                     </IconButton>
                                   }
                                   className={classes.subtitleSpacing}
                                  >
                                  <Typography
                                    color="textSecondary"
                                    variant="body2"
                                    style={{ fontSize: 12 }}
                                  >
                                      {serverError}
                                  </Typography>
                               </MuiAlert>
                            </Collapse>

                      <form
                         className={classes.signinForm}
                         autoComplete="off"
                       >
                         <InputLabel shrink htmlFor="email">
                            Email
                          </InputLabel>
                          <FormControl error={hasError('email')} className={classes.formComponent}>
                            <TextField
                              id="email-input"
                              className={classes.textField}
                              name="email"
                              type="text"
                              placeholder="Enter email address"
                              onChange={handleChange}
                              InputProps={{
                                disableUnderline: true,
                                style: {fontSize: 12}
                              }}
                              aria-describedby="email-error"
                            />
                          <FormHelperText id="email-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                              {  hasError('email') ? formState.errors.email[0] : null }
                            </FormHelperText>
                          </FormControl>

                          <InputLabel shrink htmlFor="password">
                            Password
                          </InputLabel>
                          <FormControl error={hasError('password')} className={classes.formComponent}>
                          <TextField
                            id="password-input"
                            className={classes.textField}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">
                              <Button
                                size='small'
                                aria-label="toggle password visibility"
                                className={classes.passwordVisibility}
                                onClick={e => handleClickShowPassword()}
                              >
                                {showPassword ? "Hide" : "Show"}
                              </Button>
                            </InputAdornment>,
                              disableUnderline: true,
                              style: {fontSize: 12}
                            }}
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            aria-describedby="password-error"
                            />
                            <FormHelperText id="password-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                              {  hasError('password') ? formState.errors.password[0] : null }
                            </FormHelperText>
                        </FormControl>
                        <div className={classes.buttonArea}>
                          <Checkbox
                              className={classes.termsCheckbox}
                              color="primary"
                              name="remember"
                              onChange={handleChange}
                            />
                            <Typography
                                className={classes.termsText}
                                color="textSecondary"
                                variant="body1"
                              >
                                Remember me
                              </Typography>

                          </div>
                          <Button
                            className={classes.signInButton}
                            color="primary"
                            fullWidth
                            size="large"
                            type="button"
                            variant="contained"
                            disabled={loading || !formState.values.email || !formState.values.password || hasError('password')}
                            onClick={handleLogin}
                          >
                            Sign In
                            {loading && <CircularProgress size={18} className={classes.buttonProgress} />}
                          </Button>

                         

                          <Typography
                            variant="body2"
                            gutterBottom
                            align="center"
                            className={classes.forgotLink}
                          >
                            <Link
                              component={RouterLink}
                              to="/forgot"
                              variant="body2"
                              underline="none"
                              className={classes.secondaryLink}

                            >
                              Forgot password
                            </Link>
                        </Typography>
                     </form>
                  </Grid>
                </Grid>
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

export default withRouter(SignIn);
