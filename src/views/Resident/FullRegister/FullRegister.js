import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  Typography,
  SvgIcon,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
  Checkbox,
  Collapse,
  IconButton,
  Paper
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import validate from 'validate.js';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

function BackButtonIcon(props) {
  return (
    <SvgIcon {...props} width="10" height="18" viewBox="0 0 10 18">
      <path d="M9.86245 2.225L8.37912 0.75L0.137451 9L8.38745 17.25L9.86245 15.775L3.08745 9L9.86245 2.225Z" fill="#8692A6"/>
    </SvgIcon>
  );
}

function flagIcon(props) {
  return (
    <SvgIcon {...props} width="24" height="18" viewBox="0 0 24 18">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9975 0H24V18H15.9975V0ZM0 0H7.99875V18H0V0Z" fill="#008753"/>
    </SvgIcon>
  );
}

const schema = {
  fullName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 5,
      maximum: 100
    },
    format: {
     pattern: /^[a-zA-Z ]+$/,
     message: 'should only contain letters'
   }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 150
    }
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: 'is required' },
  length: {
    minimum: 9,
    maximum: 15
  },
  format: {
   pattern: /^[0-9]+$/,
   message: 'should only contain numbers'
 }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 15,
      message: 'must be at least 6 characters'
    },
  },
  confirmPassword: {
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    minimum: 6,
    maximum: 15,
    message: 'must be at least 6 characters'
  },
  equality: "password"
},
estateFacility: {
  presence: { allowEmpty: false, message: 'is required' }
},
policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

/*const estateList = [
  {
    value: 'ajaoestate',
    label: 'Ajao Estate - Lagos',
  },
  {
    value: 'urbanprime',
    label: 'Urban Prime Estate - Lagos',
  },
  {
    value: 'sectorseven',
    label: 'Sector 7 Estate - Abuja',
  },
  {
    value: 'awusheestate',
    label: 'Awuse Estate - Lagos',
  },
  {
    value: 'beachfront',
    label: 'Beach Estate - Port Harcourt',
  },
];
*/
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
    height: 'auto',
    padding: 40,
    position: 'relative'
  },
  backButton: {
     margin: 0,
     fontSize: 11,
     backgroundColor: 'transparent',
     boxShadow: 'none',
     textTransform: 'capitalize',
     padding:0,
     minHeight: 0,
     minWidth: 0,
     "&:hover": {
       backgroundColor: 'transparent',
     },
  },
  leftArrowDefault: {
    width: 8,
    height: 14,
    fill:'none',

  },
  stepsStyle: {
    fontSize: 11,
    color: '#BDBDBD'
  },
  TitleAreaBody: {
    marginTop: 30,
    marginBottom: 10
  },
  mainTitle: {
    fontSize: 19,
    color: theme.palette.text.title,
    fontWeight: 'bold'
  },
  mainSubtitle: {
    fontSize: 13,
    color: theme.palette.text.secondary,
  },
  registerForm: {
    width: '100%',
    marginTop: 17
  },
  formComponent: {
  width: '100%',
  marginBottom: theme.spacing(2),
  fontSize: 10
},
helper: {
  fontSize: 11,
  color: '#e53935'
},
textField: {
  backgroundColor: '#FFFFFF',
  border: '1px solid #8692A6',
  borderRadius: 6,
  transition: theme.transitions.create(['background-color']),
  padding: '7px 25px',
  marginTop: 5,
  '&$focused': {
    border: '1px solid #1565D8',
    backgroundrColor: '#FFFFFF',
  },
  '&:hover': {
    border: '1px solid #1565D8',
    backgroundrColor: '#FFFFFF',
 },
},
disabledtextField: {
  backgroundColor: '#FFFFFF',
  border: '1px solid #8692A6',
  borderRadius: 6,
  transition: theme.transitions.create(['background-color']),
  padding: '7px 25px',
  marginTop: 5,
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
flagIconStyle: {
  width: 20,
  height: 14,
  fill:'none',

},
flagButton: {
   margin: 0,
   fontSize: 10,
   backgroundColor: 'transparent',
   boxShadow: 'none',
   textTransform: 'capitalize',
   padding:0,
   minHeight: 0,
   minWidth: 0,
   color: theme.palette.secondary.main,
   "&:hover": {
     backgroundColor: 'transparent',
   },
},
termsArea: {
  marginTop: -20,
  display: 'flex',
  alignItems: 'center'
},
termsCheckbox: {
  marginLeft: '-14px'
},
termsText: {
  fontSize: 11,
  color: theme.palette.text.secondary,
},
signUpButton: {
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
}
}));

const FullRegister = props => {

  const { selectUser } = props;

   const classes = useStyles();
   let history = useHistory();

   const [loading, setLoading] = useState(false);
  // const [socialLoading, setSocialLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [open, setOpen] = useState(false);
   const [serverError, setServerError] = React.useState(null);

   const [formState, setFormState] = useState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });


   useEffect(() => {

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

/*  const handleRedirect = () => {
    history.push('/signup/completed');
  }
*/
  const handleSignUp = event => {
    event.preventDefault();

  if (!loading) {
    setLoading(true);

    if(formState.values.fullName === '' || formState.values.phoneNumber === '' || formState.values.email === '' ||
      formState.values.password === '' || formState.values.estateFacility === '') {

        setServerError("All fields are required");
        setOpen(true);
        setLoading(false);

    }
    else {
      history.push('/signup/completed');
    }



  }

}

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
                  <Grid container direction="row" className={classes.topArea}>
                    <Grid
                      item
                      lg={6}>
                        <Button
                            disableripple="true"
                            disabletouchripple="true"
                            className={classes.backButton}
                            startIcon={<BackButtonIcon className={classes.leftArrowDefault}/>}
                            onClick={selectUser}
                          >
                            Back
                        </Button>
                      </Grid>
                      <Grid
                        item
                        lg={6}>
                          <Typography
                            variant="body2"
                            align="right"
                            className={classes.stepsStyle}
                          >
                            STEP 01/02
                          </Typography>
                          <Typography
                            variant="body2"
                            color="primary"
                            align="right"
                            className={classes.stepSubtitle}>
                            Personal Info
                          </Typography>
                        </Grid>
                  </Grid>
                  <div className={classes.TitleAreaBody}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className={classes.mainTitle}
                    >
                      Complete personal data
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      className={classes.mainSubtitle}
                    >
                      Complete the regsitration by entering password
                    </Typography>
                  </div>
                  <Divider />

                  <form
                     className={classes.registerForm}
                     autoComplete="off"
                   >

                         <Collapse in={open}>
                             <MuiAlert
                               severity="error"
                               action={
                                  <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                      setOpen(false);
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

                         <InputLabel shrink htmlFor="email">
                           Primary Estate/Facility
                         </InputLabel>
                         <FormControl error={hasError('estateFacility')} className={classes.formComponent}>
                         <TextField
                           id="estatefacility-input"
                           className={classes.disabledtextField}
                           InputProps={{
                             disableUnderline: true,
                             style: {fontSize: 12},
                             startAdornment: <InputAdornment position="start">
                              <HomeWorkIcon />
                             </InputAdornment>
                           }}
                           name="estateFacility"
                           placeholder="Please Select"
                           onChange={handleChange}
                           type="text"
                           disabled
                           value="Ajao Estate"
                           aria-describedby="estatefacility-error"/>
                           <FormHelperText id="estatefacility-error" classes={{ error: classes.helper }}>
                             {  hasError('estateFacility') ? formState.errors.estateFacility[0] : null }
                           </FormHelperText>
                       </FormControl>

                         <InputLabel shrink htmlFor="fullName">
                            Your fullname*
                          </InputLabel>
                          <FormControl className={classes.formComponent}>
                            <TextField
                              id="fullname-input"
                              className={classes.textField}
                              name="fullName"
                              type="text"
                              placeholder="Enter fullname"
                              disabled
                              value="Tunde Obi Yusuf"
                              onChange={handleChange}
                              InputProps={{
                                disableUnderline: true,
                                style: {fontSize: 12}
                              }}
                              aria-describedby="fullname-error"
                            />
                            <FormHelperText id="fullname-error" classes={{ error: classes.helper }}>
                              {  hasError('fullName') ? formState.errors.fullName[0] : null }
                            </FormHelperText>
                          </FormControl>
                          <InputLabel shrink htmlFor="phoneNumber">
                              Phone number*
                            </InputLabel>
                            <FormControl error={hasError('phoneNumber')} className={classes.formComponent}>
                              <PhoneInput
                                name="phoneNumber"
                                country={'ng'}
                                specialLabel=""
                                aria-describedby="phonenumber-error"
                                inputStyle={{
                                  backgroundColor: '#FFFFFF',
                                  border: '1px solid #8692A6',
                                  borderRadius: 6,
                                  padding: '15px 50px',
                                  width: '100%',
                                  fontSize: 12,
                                  '&:hover': {
                                    border: '1px solid #1565D8',
                                    backgroundrColor: '#FFFFFF',
                                 },
                                 '&$focused': {
                                   border: '1px solid #1565D8',
                                   backgroundrColor: '#FFFFFF',
                                 },
                                }}
                                containerStyle={{
                                  marginTop: 5,
                                }}
                                InputProps={{
                                  disableUnderline: true,
                                  style: {fontSize: 12}
                                }}
                              />
                                <FormHelperText id="phonenumber-error" classes={{ error: classes.helper }}>
                                  {  hasError('phoneNumber') ? formState.errors.phoneNumber[0] : null }
                                </FormHelperText>
                            </FormControl>
                          <InputLabel shrink htmlFor="email">
                              Email Address*
                            </InputLabel>
                            <FormControl error={hasError('email')} className={classes.formComponent}>
                              <TextField
                                  id="email-input"
                                  className={classes.textField}
                                  name="email"
                                  type="text"
                                  placeholder="Enter email address"
                                  disabled
                                  value="tundeobiyusuf@email.com"
                                  onChange={handleChange}
                                  InputProps={{
                                    disableUnderline: true,
                                    style: {fontSize: 12}
                                  }}
                                  aria-describedby="email-error"
                                />
                                <FormHelperText id="email-error" classes={{ error: classes.helper }}>
                                  {  hasError('email') ? formState.errors.email[0] : null }
                                </FormHelperText>
                            </FormControl>
                            <InputLabel shrink htmlFor="email">
                              Create Password*
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
                              disabled={loading}
                              type={showPassword ? "text" : "password"}
                              aria-describedby="password-error"
                              />
                              <FormHelperText id="password-error" classes={{ error: classes.helper }}>
                                {  hasError('password') ? formState.errors.password[0] : null }
                              </FormHelperText>
                          </FormControl>

                          <InputLabel shrink htmlFor="confirmPassword">
                            Confirm Password*
                          </InputLabel>
                          <FormControl error={hasError('confirmPassword')} className={classes.formComponent}>
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
                            name="confirmPassword"
                            placeholder="Re-type password"
                            onChange={handleChange}
                            disabled={loading}
                            type={showPassword ? "text" : "password"}
                            aria-describedby="password-error"
                            />
                            <FormHelperText id="password-error" classes={{ error: classes.helper }}>
                              {  hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null }
                            </FormHelperText>
                        </FormControl>
                      <div className={classes.termsArea}>

                      <Checkbox
                          checked={formState.values.policy || false}
                          className={classes.termsCheckbox}
                          color="primary"
                          name="policy"
                          onChange={handleChange}
                        />
                        <Typography
                            className={classes.termsText}
                            color="textSecondary"
                            variant="body1"
                          >
                            I agree to the Terms and Conditions
                          </Typography>
                      </div>
                      <Button
                        className={classes.signUpButton}
                        color="primary"
                        fullWidth
                        size="large"
                        type="button"
                        variant="contained"
                        onClick={handleSignUp}
                      >
                        Register Account
                      </Button>
                   </form>
               </div>
               </Paper>
             </Grid>
         </Grid>
       </div>
   );

};

export default withRouter(FullRegister);
