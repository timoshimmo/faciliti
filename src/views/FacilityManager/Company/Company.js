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
  MenuItem,
  Checkbox,
  Collapse,
  IconButton,
  Paper
} from '@material-ui/core';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import validate from 'validate.js';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
//import AXIOS from '../../../util/webservices';
//import { EstateDialog } from '../../../components';
import AddIcon from '@material-ui/icons/Add';
import AutocompleteAddress from "react-google-autocomplete";

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
  businessName: {
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
  businessEmail: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 150
    }
  },
  businessAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 9,
      maximum: 150
    },
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

const NewButton = ({ children, ...other }) => (
  <Paper {...other}>
    {children}
    <Button
      fullWidth
      startIcon={<AddIcon fontSize="small" style={{ marginRight: '10%' }} />}
      style={{ fontSize: 13, textTransform: 'none', backgroundColor: "#fff", color: '#696F79', borderRadius: 0 }}
      onMouseDown={event => {
        event.preventDefault();
      }}
    >
      Add Estate
    </Button>
  </Paper>
);

const estateList = [
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

const bizType = [
  { label: 'Facility Managers', id: 1 },
  { label: 'Realtors', id: 2 },
  { label: 'Real Estate Developers', id: 3 },
  { label: 'Security Managers', id: 4 },
];

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
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
  formArea: {
    height: '100%'
  },
  formPaper: {
    width: '100%',
    maxHeight: '98%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  },
  gridItem: {
    width: '100%',
    maxHeight: '100vh',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 70,
    paddingRight: 70,
  },
  formBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: 40
  },
  backButton: {
    margin: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    fontSize: 11,
    color: '#8692A6',
    textTransform: 'capitalize',
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
    marginTop: 17,
    marginBottom: 20
  },
  formComponent: {
  width: '100%',
  marginBottom: theme.spacing(1),
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
  },
  '&:hover': {
    border: '1px solid #1565D8',
 },
},

textFieldAddress: {
  backgroundColor: '#FFFFFF',
  border: '1px solid #8692A6',
  borderRadius: 6,
  transition: theme.transitions.create(['background-color']),
  padding: '13.5px 25px',
  color: '#696F79',
  fontSize: 12,
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
  marginTop: 5,
  '&$focused': {
    border: '1px solid #1565D8',
    outline: 'none !important',
  },
  '&:focus': {
    border: '1px solid #1565D8',
    outline: 'none !important',
  },
  '&:hover': {
    border: '1px solid #1565D8',
 },
 '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#d5dae0'
    }
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
},

helperRoot: {
  height: 13
}
}));

const Company = () => {

  //const { register, company } = props;

   const classes = useStyles();
   let history = useHistory();

   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [open, setOpen] = useState(false);
   const [serverError, setServerError] = useState(null);
   const [value, setValue] = useState(null);
   const [type, setType] = useState(null);
   const [place, setPlace] = useState(null);
   const [estates, setEstates] = useState([]);
   const [newEstateStatus, setNewEstateStatus] = useState(false);

   let companyData = {};
   if (typeof localStorage !== 'undefined') {
     if(localStorage.getItem('company_details') !== null) {
       const data = localStorage.getItem('company_details');
       if(data !== null) {
         companyData = JSON.parse(data);
       }
     }
  }

//   const [openDialog, setOpenDialog] = useState(false);

  /* const handleDialogOpen = () => {
     setOpenDialog(true);
   };

   const handleDialogClose = () => {
     setOpenDialog(false);
   }; */
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

  useEffect(() => {
    if(companyData !== null || companyData !== undefined || companyData.length > 0) {
  //    console.log("COMPANY DATA: " + JSON.stringify(companyData));
      formState.values.businessName = companyData.companyName;
      formState.values.businessEmail = companyData.companyEmail;
      setValue(companyData.estate);
    }
    handleEstates();
    //andleEstates();
   }, []);

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

  const handleBack = () => {
    if (typeof localStorage !== 'undefined') {
      if(localStorage.getItem('company_details') !== null) {
          localStorage.removeItem('company_details');
      }
    }
    history.goBack();
  };

  const handleGoToFacilityPersonal = () => {
     history.push('/fm-personal');
   }

//http://132.145.58.252:8081/spaciofm/api/
   async function handleEstates() {
      axios.get('http://132.145.58.252:8081/spaciofm/api/estates/?index=0&range=5')
      .then(response => {
        const res = response.data;
      //  console.log(res);
        setEstates(res);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

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
     if(formState.values.businessName === '' || formState.values.businessAddress === '' || formState.values.businessEmail === '') {
        setServerError("All fields are required");
        setOpen(true);
        setLoading(false);
      }
      else {
        let estateValue;

        const obj = {
          companyName: formState.values.businessName,
          companyEmail: formState.values.businessEmail,
          officeAddress: place.formatted_address,
          estate: value,
          newEstate: newEstateStatus
      };
      setLoading(false);
      localStorage.setItem('company_details', JSON.stringify(obj));
      history.push('/fm-personal');
      }
    }
  }

/*
<TextField
    id="businessAddress-input"
    className={classes.textField}
    name="businessAddress"
    type="text"
    placeholder="Enter phone number"
    onChange={handleChange}
    disabled={loading}
    InputProps={{
      disableUnderline: true,
      style: {fontSize: 12},
      startAdornment: <InputAdornment position="start">
      <Button
        size='small'
        startIcon={<flagIcon className={classes.flagIconStyle}/>}
        className={classes.passwordVisibility}
      >
        +234
      </Button>
      </InputAdornment>
    }}
    aria-describedby="businessAddress-error"
  />
*/

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
             lg={7}>
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
                      lg={6}>
                        <Button
                            disableripple="true"
                            disabletouchripple="true"
                            className={classes.backButton}
                            startIcon={<BackButtonIcon style={{ width: 8, height: 14, fill:'none' }}/>}
                            onClick={handleBack}
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
                            Business Info
                          </Typography>
                        </Grid>
                  </Grid>
                  <div className={classes.TitleAreaBody}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      className={classes.mainTitle}
                    >
                      Enter your Business Details
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      className={classes.mainSubtitle}
                    >
                      For the purpose of industry regulation, these details are required.
                    </Typography>
                  </div>
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
                                 style={{ fontSize: 12 }}>
                                   {serverError}
                               </Typography>
                            </MuiAlert>
                         </Collapse>
                         <InputLabel shrink htmlFor="businessName">
                            Business name*
                          </InputLabel>
                          <FormControl error={hasError('businessName')} className={classes.formComponent}>
                            <TextField
                              id="businessName-input"
                              className={classes.textField}
                              name="businessName"
                              type="text"
                              placeholder="Enter business name"
                              onChange={handleChange}
                              value={formState.values.businessName}
                              disabled={loading}
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  fontSize: 12,
                                }
                              }}
                              aria-describedby="businessName-error"
                            />
                            <FormHelperText id="businessName-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                              {  hasError('businessName') ? formState.errors.businessName[0] : null }
                            </FormHelperText>
                          </FormControl>

                          <InputLabel shrink htmlFor="businessAddress">
                              Business Address*
                          </InputLabel>
                          <FormControl error={hasError('businessAddress')} className={classes.formComponent}>
                            <AutocompleteAddress
                              apiKey={'AIzaSyDs_8LnDD8HGjgkPO5hLk08MTFOk6FJus8'}
                              id="businessAddress-input"
                              className={classes.textFieldAddress}
                              placeholder="Enter business address"

                              onPlaceSelected={(place) => {
                                setPlace(place);
                              }}
                              options={{
                                types: ["address"],
                                componentRestrictions: { country: "ng" }
                              }}
                              aria-describedby="businessAddress-error"
                            />
                            <FormHelperText id="businessAddress-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                              {  hasError('businessAddress') ? formState.errors.businessAddress[0] : null }
                            </FormHelperText>
                          </FormControl>
                          <InputLabel shrink htmlFor="businessEmail">
                            Business Email*
                          </InputLabel>
                          <FormControl error={hasError('businessEmail')} className={classes.formComponent}>
                            <TextField
                                id="businessEmail-input"
                                className={classes.textField}
                                name="businessEmail"
                                type="email"
                                placeholder="Enter business email"
                                onChange={handleChange}
                                value={formState.values.businessEmail}
                                disabled={loading}
                                InputProps={{
                                  disableUnderline: true,
                                  style: {fontSize: 12}
                                }}
                                aria-describedby="businessEmail-error"
                              />
                              <FormHelperText id="businessEmail-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                                {  hasError('businessEmail') ? formState.errors.businessEmail[0] : null }
                              </FormHelperText>
                        </FormControl>
                        <InputLabel shrink htmlFor="estateFacility">
                          Primary Estate/Facility
                        </InputLabel>
                        <FormControl error={hasError('estateFacility')} className={classes.formComponent}>
                          <Autocomplete
                              id="estateFacility-input"
                              name="estateFacility"
                              className={classes.textField}
                              value={value}
                              onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                //  console.log("New Estate 1: " + newValue);
                                  setValue({
                                    name: newValue,
                                  });
                                } else if (newValue && newValue.inputValue) {
                                  // Create a new value from the user input
                                //  console.log("New Estate 2: " + newValue.inputValue);
                                  setValue(newValue.inputValue);
                                  setNewEstateStatus(true);
                                } else {
                                  setValue(newValue);
                                  setNewEstateStatus(false);
                                }

                              }}
                              filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option.uri);
                                if (inputValue !== '' && !isExisting) {
                                  filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                  });
                                }
                                return filtered;
                              }}
                              selectOnFocus
                              clearOnBlur
                              handleHomeEndKeys
                              options={estates}
                              getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                  return option;
                                }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                  return option.inputValue;
                                }
                                // Regular option
                                return option.name;
                              }}
                              aria-describedby="estateFacility-error"
                              freeSolo
                              renderInput={(params) => <TextField {...params} placeholder="-Please select-"
                                  InputProps={{
                                    ...params.InputProps,
                                    disableUnderline: true,
                                    type: 'search',
                                    style: {fontSize: 12}
                                  }}
                              />}
                            />
                          <FormHelperText id="estatefacility-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                            {  hasError('estateFacility') ? formState.errors.estateFacility[0] : null }
                          </FormHelperText>
                      </FormControl>
                      <Button
                        className={classes.signUpButton}
                        color="primary"
                        fullWidth
                        size="large"
                        type="button"
                        variant="contained"
                        onClick={handleSignUp}
                        disabled={loading || !formState.values.businessName || place === null ||
                          !formState.values.businessEmail || value === null}>
                        Save & Continue
                      </Button>
                   </form>
               </div>
             </Paper>
           </Grid>
       </Grid>
     </div>
   );
};

export default withRouter(Company);
