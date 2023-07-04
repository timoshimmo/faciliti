import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardHeader,
  InputAdornment,
  FormControl,
  FormHelperText,
  CardActions,
  TextField,
  InputLabel,
  CircularProgress,
  Button,
  Divider
} from '@material-ui/core';
import validate from 'validate.js';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 2,
      maximum: 100
    },
    format: {
     pattern: /^[a-zA-Z ]+$/,
     message: 'should only contain letters'
   }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 2,
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
  }
};



const useStyles = makeStyles(theme => ({
  gridAction: {
    paddingTop: 5,
    paddingBottom: 20,
 },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    height: 260
  },
  formComponent: {
  width: '100%',
  marginBottom: theme.spacing(1),
  fontSize: 10
},
labelStyle: {
  fontSize: 14,
  fontWeight: 600,
  color: '#2D2D2D'
},
helper: {
  fontSize: 11,
  color: '#e53935'
},
textField: {
  backgroundColor: '#FAFAFA',
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
buttonProgress: {
   color: theme.palette.primary.main,
   position: 'absolute',
   top: '50%',
   left: '50%',
   marginTop: -10,
   marginLeft: -12,
 },
 buttonStyle: {
   fontSize: 14,
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
}));


const Account = props => {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
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

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


  return (
    <Grid container direction="row">
      <Grid
        item
        lg={12}
        xs={12}>
        <Card elevation={1}>
          <CardHeader
            title="Account Information"
            subheader="View/Edit profile information"
         />
          <CardContent>
            <Grid container direction="row" spacing={2} alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={6}>
                    <InputLabel shrink htmlFor="firstName" className={classes.labelStyle}>
                       First name
                     </InputLabel>
                     <FormControl error={hasError('firstName')} className={classes.formComponent}>
                       <TextField
                         id="firstName-input"
                         className={classes.textField}
                         name="firstName"
                         type="text"
                         onChange={handleChange}
                         disabled={loading}
                         InputProps={{
                           disableUnderline: true,
                           style: {fontSize: 12}
                         }}
                         aria-describedby="firstName-error"
                       />
                       <FormHelperText id="firstName-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('firstName') ? formState.errors.firstName[0] : null }
                       </FormHelperText>
                     </FormControl>
                </Grid>
                <Grid
                  item
                  lg={6}
                  >
                    <InputLabel shrink htmlFor="lastName" className={classes.labelStyle}>
                       Last name
                     </InputLabel>
                     <FormControl error={hasError('lastName')} className={classes.formComponent}>
                       <TextField
                         id="lastName-input"
                         className={classes.textField}
                         name="lastName"
                         type="text"
                         onChange={handleChange}
                         disabled={loading}
                         InputProps={{
                           disableUnderline: true,
                           style: {fontSize: 12}
                         }}
                         aria-describedby="lastName-error"
                       />
                       <FormHelperText id="lastName-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('lastName') ? formState.errors.lastName[0] : null }
                       </FormHelperText>
                     </FormControl>
                </Grid>
                <Grid
                  item
                  lg={6}>
                    <InputLabel shrink htmlFor="phoneNumber" className={classes.labelStyle}>
                       Phone number
                     </InputLabel>
                     <FormControl error={hasError('phoneNumber')} className={classes.formComponent}>
                       <TextField
                         id="phoneNumber-input"
                         className={classes.textField}
                         name="phoneNumber"
                         type="text"
                         onChange={handleChange}
                         disabled={loading}
                         InputProps={{
                           disableUnderline: true,
                           style: {fontSize: 12}
                         }}
                         aria-describedby="phoneNumber-error"
                       />
                       <FormHelperText id="phoneNumber-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('phoneNumber') ? formState.errors.phoneNumber[0] : null }
                       </FormHelperText>
                     </FormControl>
                </Grid>
                <Grid
                  item
                  lg={6}
                  >
                    <InputLabel shrink htmlFor="email" className={classes.labelStyle}>
                       Email
                     </InputLabel>
                     <FormControl error={hasError('email')} className={classes.formComponent}>
                       <TextField
                         id="email-input"
                         className={classes.textField}
                         name="email"
                         type="text"
                         onChange={handleChange}
                         disabled={loading}
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
                </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Grid container direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid
              item
              lg={2}
              >
                <Button
                  className={classes.buttonStyle}
                  color="primary"
                  fullWidth
                  size="large"
                  type="button"
                  variant="contained"
                >
                  Update Profile
                  {loading && <CircularProgress size={18} className={classes.buttonProgress} />}
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );

};

export default Account;
