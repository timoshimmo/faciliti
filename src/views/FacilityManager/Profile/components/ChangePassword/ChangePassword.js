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
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    format: {
     pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/,
     message: 'must have at least 6 characters, one lower case, one uppercase and a number'
   }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    format: {
     pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/,
     message: 'must have at least 6 characters, one lower case, one uppercase and a number'
   },
    equality: "password"
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
}));


const ChangePassword = props => {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            title="Update Password"
            subheader="Enter new password to update password"
         />
          <CardContent>
            <Grid container direction="row" spacing={2} alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={6}>
                  <InputLabel shrink htmlFor="email" className={classes.labelStyle}>
                    New Password
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
                    <FormHelperText id="password-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                      {  hasError('password') ? formState.errors.password[0] : null }
                    </FormHelperText>
                </FormControl>
                </Grid>
                <Grid
                  item
                  lg={6}
                  >
                  <InputLabel shrink htmlFor="confirmPassword">
                    Confirm Password
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
                          onClick={e => handleClickShowConfirmPassword()}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
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
                      <FormHelperText id="password-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                        {  hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null }
                      </FormHelperText>
                  </FormControl>
                </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Grid container direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid
              item
              lg={3}
              >
                <Button
                  className={classes.buttonStyle}
                  color="primary"
                  fullWidth
                  size="large"
                  type="button"
                  variant="contained"
                >
                  Change Password
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

export default ChangePassword;
