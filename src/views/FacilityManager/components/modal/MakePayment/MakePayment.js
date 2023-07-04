import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Collapse,
  Select,
  MenuItem
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import validate from 'validate.js';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import AXIOS from '../../../../../util/webservices';
import moment from 'moment';
import { useModalAction, useModalState } from '../../../../modal/modal-context.tsx';
import { useDispatch } from "react-redux";
import { toggleSnackbarOpen } from "../../../../../actions";

//import { ChipComponent, TaggedPeopleComponent, CategoryDialog, TaggedPeopleDialog } from './components';

/*const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});*/


const schema = {
  amount: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  paymentMethod: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  paymentDate: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3
    }
  },
  reference: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  remarks: {
    presence: { allowEmpty: false, message: 'is required' }
  },
};

const useStyles = makeStyles(theme => ({

  dialogtitleStyle: {
    margin: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 25,
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F8FF'
  },
  dialogContentStyle: {
    paddingBottom: 15,
  },
  formBody: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: 30,
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
  marginBottom: 8,
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
  padding: '7px 5px',
  marginTop: 5,
  '&$focused': {
    border: '1px solid #1565D8',
  },
  '&:hover': {
    border: '1px solid #1565D8',
 },
 '$root.MuiOutlinedInput-input &': {
   padding: 0
 },
},
textFieldDate: {
  backgroundColor: '#FFFFFF',
  width: '98%',
  border: '1px solid #8692A6',
  borderRadius: 6,
  transition: theme.transitions.create(['background-color']),
  padding: '7px 5px',
  marginTop: 5,
  '&$focused': {
    border: '1px solid #1565D8',
  },
  '&:hover': {
    border: '1px solid #1565D8',
 },
 '$root.MuiOutlinedInput-input &': {
   padding: 0
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

addbtnStyle: {
  fontSize: 12,
  textTransform: 'none',
  paddingTop: 12,
  paddingBottom: 12,
  marginTop: 5,
  width: 40,
  height: 45,
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

addbtnArea: {
  display: 'flex',
  justifyContent: 'flex-end'
},

helperRoot: {
  height: 13
},

tenureContainer: {
  maxWidth: '100%'
},

gridItem: {
  width: 'auto'
},


}));

const methodList = [
  { key: 0, label: 'Cash' },
  { key: 1, label: 'Online' },
  { key: 2, label: 'Cheque' }
  ];



const MakePayment = props => {

  const classes = useStyles();

  const { closeModal } = useModalAction();
  const { data } = useModalState();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [serverError, setServerError] = useState(null);
//  const [openSnack, setOpenSnack] = useState(false);
  const [formState, setFormState] = useState({
     isValid: false,
     values: {},
     touched: {},
     errors: {}
   });

   const dispatch = useDispatch();

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


const handleMakePayment = () => {

  if (!loading) {
    setLoading(true);

    const obj = {
        paymentDate: moment(formState.values.paymentDate).format('DD/MM/yyyy'),
        paymentMethod: paymentMethod.key,
        reference: formState.values.reference,
        remarks: formState.values.remarks,
        amount: formState.values.amount,
    };

    let contractId = '';
    let chargeId = '';

    if(Object.keys(data.contract).length > 0) {
      contractId = data.contract.key.uuid;
      chargeId = data.contract.chargeData[0].key.uuid;
    }
    
    //const linkStr = 

  //`contracts/${contractId}/charges/${chargeId}/payments`
      AXIOS.post(`contracts/${contractId}/charges/${chargeId}/payments`, obj)
      .then(response => {
        const res = response.data;
        console.log(JSON.stringify(res.response));
        handleOpenSnackBar();
        setLoading(false);
        closeModal();
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error.response);
        console.log(error.message);
        setServerError("There was a problem creating service order. Pls try again");
        setOpenError(true);
      })

    }
}

 const handleOpenSnackBar = () => {
   dispatch(toggleSnackbarOpen("Payment successful!"));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (

    <div>
         <div className={classes.formBody}>
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
                   <InputLabel shrink htmlFor="amount">
                     Enter Amount
                   </InputLabel>
                   <FormControl error={hasError('amount')} className={classes.formComponent}>
                     <TextField
                         id="amount-input"
                         className={classes.textField}
                         name="amount"
                         type="number"
                         placeholder="0.00"
                         value={formState.values.amount}
                         onChange={handleChange}
                         disabled={loading}
                         InputProps={{
                           disableUnderline: true,
                           style: {fontSize: 12, paddingLeft: 20},
                           startAdornment:<InputAdornment position="start">₦</InputAdornment>
                         }}
                         aria-describedby="amount-error"
                       />
                       <FormHelperText id="amount-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('amount') ? formState.errors.amount[0] : null }
                       </FormHelperText>
                   </FormControl>
                   <InputLabel shrink htmlFor="paymentMethod">
                      Payment Method
                    </InputLabel>
                      <FormControl error={hasError('paymentMethod')} className={classes.formComponent}>
                        <Autocomplete
                            id="paymentMethod-input"
                            name="paymentMethod"
                            className={classes.textField}
                            value={paymentMethod}
                            onChange={(event, newValue) => {
                              setPaymentMethod(newValue);
                            }}
                            options={methodList}
                            getOptionLabel={(option) => {
                              // Regular option
                              return option.label;
                            }}
                            aria-describedby="paymentMethod-error"
                            renderInput={(params) => <TextField {...params} placeholder="-Please select-"
                                InputProps={{
                                  ...params.InputProps,
                                  disableUnderline: true,
                                  type: 'search',
                                  style: {fontSize: 12, paddingLeft: 20}
                                }}
                            />}
                          />
                        <FormHelperText id="paymentMethod-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                          {  hasError('paymentMethod') ? formState.errors.paymentMethod[0] : null }
                        </FormHelperText>
                      </FormControl>
                   <InputLabel shrink htmlFor="paymentDate">
                     Choose Date
                   </InputLabel>
                   <FormControl error={hasError('paymentDate')} className={classes.formComponent}>
                     <TextField
                         id="paymentdate-time"
                         className={classes.textFieldDate}
                         name="paymentDate"
                         type="date"
                         placeholder="Payment Date"
                         fullWidth
                         onChange={handleChange}
                         value={formState.values.paymentDate}
                         InputProps={{
                           disableUnderline: true,
                           style: {fontSize: 12, paddingLeft: 20}
                         }}
                         InputLabelProps={{
                           shrink: true,
                         }}
                         aria-describedby="paymentdate-error"
                       />
                     <FormHelperText id="paymentdate-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('paymentDate') ? formState.errors.paymentDate[0] : null }
                       </FormHelperText>
                   </FormControl>
                   <InputLabel shrink htmlFor="reference">
                     Enter Reference
                   </InputLabel>
                   <FormControl error={hasError('reference')} className={classes.formComponent}>
                     <TextField
                         id="reference-input"
                         className={classes.textField}
                         name="reference"
                         type="text"
                         placeholder="Payment reference"
                         value={formState.values.reference}
                         onChange={handleChange}
                         disabled={loading}
                         InputProps={{
                           disableUnderline: true,
                           style: {fontSize: 12, paddingLeft: 20},
                         }}
                         aria-describedby="reference-error"
                       />
                       <FormHelperText id="reference-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('reference') ? formState.errors.reference[0] : null }
                       </FormHelperText>
                   </FormControl>
                   <InputLabel shrink htmlFor="remarks">
                     Enter Remarks
                   </InputLabel>
                   <FormControl error={hasError('remarks')} className={classes.formComponent}>
                     <TextField
                         id="remarks-input"
                         className={classes.textField}
                         name="remarks"
                         type="text"
                         placeholder="Payment remarks"
                         value={formState.values.remarks}
                         onChange={handleChange}
                         disabled={loading}
                         InputProps={{
                           disableUnderline: true,
                           style: {fontSize: 12, paddingLeft: 20},
                         }}
                         aria-describedby="remarks-error"
                       />
                       <FormHelperText id="remarks-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('remarks') ? formState.errors.remarks[0] : null }
                       </FormHelperText>
                   </FormControl>
             </form>
             <div>
               <Button
                 className={classes.buttonStyle}
                 color="primary"
                 fullWidth
                 startIcon={<LockOutlinedIcon fontSize="small" style={{ marginRight: '10%' }} />}
                 size="small"
                 type="button"
                 onClick={()=>handleMakePayment()}
                 variant="contained"
                 disabled={loading || !formState.values.amount || !formState.values.paymentDate || !formState.values.reference
                   || !formState.values.remarks || paymentMethod === null}>
                 Pay Charge
                 {loading && <CircularProgress size={18} className={classes.buttonProgress} />}
               </Button>
             </div>
         </div>
    </div>
  );
}

export default MakePayment;
