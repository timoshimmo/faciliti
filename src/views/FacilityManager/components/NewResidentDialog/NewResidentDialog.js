import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Slide,
  FormControl,
  FormHelperText,
  InputLabel,
  Collapse,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import validate from 'validate.js';
import PhoneInput from 'react-phone-input-2';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
//import AXIOS from '../../../../util/webservices';

//import { ChipComponent, TaggedPeopleComponent, CategoryDialog, TaggedPeopleDialog } from './components';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 2,
      maximum: 100
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 2,
      maximum: 100
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
  emailAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 150
    }
  },
  estateAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 9,
      maximum: 150
    },
  },

  estateFacility: {
    presence: { allowEmpty: false, message: 'is required' }
  },
};

const useStyles = makeStyles(theme => ({

  dialogtitleStyle: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F8FF'
  },
  formBody: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
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
buttonStyle: {
  fontSize: 12,
  textTransform: 'none',
  marginTop: 15,
  paddingTop: 10,
  paddingBottom: 10,
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


const NewResidentDialog = props => {

  const classes = useStyles();

  const { onOpen, onClose } = props;

  /*let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userDetails');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }*/

  const [loading, setLoading] = useState(false);
//  const [openDialog, setOpenDialog] = useState(false);
//  const [openPeopleDialog, setOpenPeopleDialog] = useState(false);
//  const [subMenus, setSubMenus] = useState([]);
  const [phoneNo, setPhoneNo] = useState('');
  const [value, setValue] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [estates, setEstates] = useState([]);
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
  // handleEstates();
}, [formState.values]);

const handleChange = event => {
  event.persist();

  setFormState(formState => ({
    ...formState,
    values: {
      ...formState.values,
      [event.target.name]: event.target.value
    },
    touched: {
      ...formState.touched,
      [event.target.name]: true
    }
  }));
};

useEffect(() => {
  handleEstates();
}, []);

async function handleEstates() {
   axios.get('http://132.145.58.252:8081/spaciofm/api/estates/?index=0&range=5')
   .then(response => {
     const res = response.data;
     //console.log(res);
     setEstates(res);
   })
   .catch(function (error) {
     console.log(error.response);
   })
}

const handleRegister = event => {

  event.preventDefault();

  if (!loading) {
    setLoading(true);

    if(formState.values.firstName === '' || formState.values.lastName === '' || phoneNo.phone === ''
    || formState.values.emailAddress === '' || formState.values.estateAddress === '' || value === null) {

        setServerError("All fields are required");
        setOpenError(true);
        setLoading(false);

    }
    else {
    //  const tenantId = localStorage.getItem('tenantSegment');
      let principalid = formState.values.firstName + getReference();

      const obj = {
        segmentName: 'SPACIOS41826',
        emailAddress: formState.values.emailAddress,
        initialPassword : "123456",
        initialPasswordVerification : "123456",
        firstName: formState.values.firstName,
        lastName: formState.values.lastName,
        telephone: phoneNo.phone,
        role: 23,
        estateXri: value.uri,
        accountCategories: [24],
        enabled: true,
        emailAddressExist: true,
        principalId: principalid,
      };

      axios.post('http://132.145.58.252:8081/spaciofm/api/user-profiles/onboard-resident', obj)
      .then(response => {
        setLoading(false);
      //  const res = response.data;
        //console.log(res);
        onClose();
      //  handleOpenSnackBar();
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error.response);
        console.log(error.message);
      })

    }
 }
}

const getReference = () => {
		  let text = "";
		  let possible = "0123456789";

		  for( let i=0; i < 3; i++ )
			  text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
	 }


/*  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };*/

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;



  /*const categoryItems = () => {
      return categoryData.map((category, i) => {
          return <ChipComponent obj={category} idx={i} setCategoryData={setCategoryData} setCategoryList={setCategoryList} categoryList={categoryList} />;
      })
  }

    */


  return (

    <Dialog maxWidth="xs" onClose={onClose} aria-labelledby="menu-dialog" open={onOpen} TransitionComponent={Transition}>
       <DialogContent>
         <div className={classes.formBody}>
            <div className={classes.TitleAreaBody}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.mainTitle}
              >
                Add the basic user information
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                className={classes.mainSubtitle}
              >
              Add a name and the contact details for the new User to be able to find them on the spacio system.
              </Typography>
            </div>
            <form
               className={classes.registerForm}
               autoComplete="off"
             >

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
                           style={{ fontSize: 12 }}>
                             {serverError}
                         </Typography>
                      </MuiAlert>
                   </Collapse>
                   <InputLabel shrink htmlFor="firstName">
                      Add First Name
                    </InputLabel>
                    <FormControl error={hasError('firstName')} className={classes.formComponent}>
                      <TextField
                        id="firstName-input"
                        className={classes.textField}
                        name="firstName"
                        type="text"
                        placeholder="Enter first name"
                        onChange={handleChange}
                        disabled={loading}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: 12,
                          }
                        }}
                        aria-describedby="firstName-error"
                      />
                      <FormHelperText id="firstName-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                        {  hasError('firstName') ? formState.errors.firstName[0] : null }
                      </FormHelperText>
                    </FormControl>
                    <InputLabel shrink htmlFor="lastName">
                       Add Last Name
                     </InputLabel>
                     <FormControl error={hasError('lastName')} className={classes.formComponent}>
                       <TextField
                         id="lastName-input"
                         className={classes.textField}
                         name="lastName"
                         type="text"
                         placeholder="Enter last name"
                         onChange={handleChange}
                         disabled={loading}
                         InputProps={{
                           disableUnderline: true,
                           style: {
                             fontSize: 12,
                           }
                         }}
                         aria-describedby="lastName-error"
                       />
                       <FormHelperText id="lastName-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('lastName') ? formState.errors.lastName[0] : null }
                       </FormHelperText>
                     </FormControl>
                    <InputLabel shrink htmlFor="phoneNumber">
                        Add Phone number
                      </InputLabel>

                      <FormControl error={hasError('phoneNumber')} className={classes.formComponent}>
                          <PhoneInput
                            name="phoneNumber"
                            country={'ng'}
                            specialLabel=""
                            placeholder="Enter phone number"
                            onChange={phone => setPhoneNo({ phone })}
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

                          <FormHelperText id="phonenumber-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                            {  hasError('phoneNumber') ? formState.errors.phoneNumber[0] : null }
                          </FormHelperText>
                      </FormControl>

                    <InputLabel shrink htmlFor="emailAddress">
                      Add Email address
                    </InputLabel>
                    <FormControl error={hasError('emailAddress')} className={classes.formComponent}>
                      <TextField
                          id="emailAddress-input"
                          className={classes.textField}
                          name="emailAddress"
                          type="email"
                          placeholder="Enter email address"
                          onChange={handleChange}
                          disabled={loading}
                          InputProps={{
                            disableUnderline: true,
                            style: {fontSize: 12}
                          }}
                          aria-describedby="emailAddress-error"
                        />
                        <FormHelperText id="emailAddress-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                          {  hasError('emailAddress') ? formState.errors.emailAddress[0] : null }
                        </FormHelperText>
                  </FormControl>

                  <InputLabel shrink htmlFor="estateAddress">
                    Add House Address
                  </InputLabel>
                  <FormControl error={hasError('estateAddress')} className={classes.formComponent}>
                    <TextField
                      id="estateAddress-input"
                      className={classes.textField}
                      name="estateAddress"
                      type="text"
                      placeholder="Enter house address"
                      onChange={handleChange}
                      disabled={loading}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          fontSize: 12,
                        }
                      }}
                      aria-describedby="estateAddress-error"
                    />
                    <FormHelperText id="estateAddress-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                      {  hasError('estateAddress') ? formState.errors.estateAddress[0] : null }
                    </FormHelperText>
                  </FormControl>
                  <InputLabel shrink htmlFor="estateAddress">
                    Add Primary Facility/Estate
                  </InputLabel>
                  <FormControl error={hasError('estateFacility')} className={classes.formComponent}>
                    <Autocomplete
                        id="estateFacility-input"
                        name="estateFacility"
                        className={classes.textField}
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        options={estates}
                        getOptionLabel={(option) => {
                          // Regular option
                          return option.name;
                        }}
                        aria-describedby="estateFacility-error"
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

             </form>
         </div>
       </DialogContent>
       <DialogActions>
         <Button
           className={classes.buttonStyle}
           color="primary"
           fullWidth
           startIcon={<AddIcon fontSize="small" style={{ marginRight: '10%' }} />}
           size="small"
           type="button"
           onClick={handleRegister}
           variant="contained"
           disabled={loading || !formState.values.firstName || !formState.values.lastName || !phoneNo.phone ||
             !formState.values.emailAddress || !formState.values.estateAddress || value === null}
          >
           Add New User
           {loading && <CircularProgress size={18} className={classes.buttonProgress} />}
         </Button>
       </DialogActions>
    </Dialog>
  );
}

NewResidentDialog.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.bool,
};

export default NewResidentDialog;
