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
import AddIcon from '@material-ui/icons/Add';
import validate from 'validate.js';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
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
  serviceType: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  estateFacility: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  category: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  contacts: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  tenure: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  startDate: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3
    }
  },
  charge: {
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
inputRoot: {
  padding: 0,
  marginTop: 5,

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

const serviceTypeList = [
  { key: 1, label: 'Maintenance Service Charge' },
  { key: 2, label: 'Estate Management Dues' },
  { key: 3, label: 'Generator Plant Management' },
  { key: 4, label: 'Security Levy' },
  { key: 5, label: 'Gate Pass Sticker' },
  { key: 6, label: 'Electricity' },
  { key: 7, label: 'Internet' }
  ];



const ServiceContract = props => {

  const classes = useStyles();

  const { closeModal } = useModalAction();
  const { data } = useModalState();

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  //const [openDialog, setOpenDialog] = useState(false);
//  const [openPeopleDialog, setOpenPeopleDialog] = useState(false);
  const [value, setValue] = useState(null);
  const [serviceTypeValue, setServiceTypeValue] = useState(null);
//  const [categoryValue, setCategoryValue] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [openError, setOpenError] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [estates, setEstates] = useState([]);
  const [contacts, setContacts] = useState([]);
//  const [openSnack, setOpenSnack] = useState(false);
  const [formState, setFormState] = useState({
     isValid: false,
     values: {},
     touched: {},
     errors: {}
   });

   const dispatch = useDispatch();
/*   const [serviceTypeList, setServiceTypeList] = useState([
     { key: 1, label: 'Estate Management Dues' },
     { key: 2, label: 'Generator Plant Management' },
     { key: 3, label: 'Security Levy' },
     { key: 4, label: 'Gate Pass Sticker' },
     { key: 5, label: 'Electricity' },
     { key: 5, label: 'Internet' }
     ]); */

useEffect(() => {
   const errors = validate(formState.values, schema);
   setFormState(formState => ({
     ...formState,
     isValid: errors ? false : true,
     errors: errors || {}
   }));
  // handleEstates();
}, [formState.values]);

/*
serviceType: {
  presence: { allowEmpty: false, message: 'is required' }
},
estateFacility: {
  presence: { allowEmpty: false, message: 'is required' }
},
category: {
  presence: { allowEmpty: false, message: 'is required' }
},
contacts: {
  presence: { allowEmpty: false, message: 'is required' }
},
tenure: {
  presence: { allowEmpty: false, message: 'is required' }
},
startDate: {
  presence: { allowEmpty: false, message: 'is required' },
  length: {
    minimum: 3
  }
},
charge: {
  presence: { allowEmpty: false, message: 'is required' }
},
*/
useEffect(() => {
  if(data.editStatus) {
    console.log("SELECTED CONTRACT: " + JSON.stringify(data.contractDetails));
    //console.log("MEETING DETAILS LENGTH: " + JSON.stringify(meetingDetails));
    setFormState(formState => ({
      ...formState,
      values: {
        charge: data.contractDetails.charge,
        startDate: moment(data.contractDetails.createdAt).format('yyyy-MM-DDThh:mm'),
        tenure: data.contractDetails.frequency
      }
    }));
    const sType = serviceTypeList.filter(type => {
      return type.label === data.contractDetails.serviceType
    });
  /*  const sType = serviceTypeList.filter(type => {
      return type.label === data.contractDetails.serviceType
    });
    const sType = serviceTypeList.filter(type => {
      return type.label === data.contractDetails.serviceType
    });*/
    console.log("STYPE:", sType[0]);
    setServiceTypeValue(sType[0]);
  }

}, [data.contractDetails]);


useEffect(() => {
  handleEstates();
  handleGetContacts();
}, []);

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

async function handleEstates() {
   axios.get('http://132.145.58.252:8081/spaciofm/api/estates/?index=0&range=5')
   .then(response => {
     const res = response.data;
     setEstates(res);
   })
   .catch(function (error) {
     console.log(error);
   })
}

const handleGetContacts = () => {
//  event.persist();
//  setSearchQuery(event.target.value);

//  let token = localStorage.getItem('spfmtoken');
//  let tenantSegment = localStorage.getItem('tenantSegment');
//  let userId = localStorage.getItem('userId');
/*  const config = {
      headers:{
        'Authorization': `Bearer ${token}`,
        'provider': 'CRX',
        'tenant-id' : tenantSegment,
        'user-id' : userId
      }
  }; */

  AXIOS.get('contacts?index=0&range=10')
  .then(response => {
    const res = response.data;
//    if(res.errorCode !== null) {
    //  console.log("CONTACTS: " + JSON.stringify(res.response));
      setContacts(res.response);
  //  }

  })
  .catch(function (error) {
    console.log(error.response);
    console.log(error.message);
  })

};

const handleService = event => {

  event.preventDefault();

//  const tenantId = localStorage.getItem('tenantId');
  //const currentEstate = localStorage.getItem('currentEstateXri');

  //const userId = localStorage.getItem('userId');



  if (!loading) {
    setLoading(true);

    if(formState.values.charge === '' || formState.values.startDate === '' || formState.values.category === ''
    || formState.values.tenure === '' || serviceTypeValue === null || value === null) {

        setServerError("All fields are required");
        setOpenError(true);
        setLoading(false);

    }
    else {

      const serviceContractCreator = localStorage.getItem('serviceContractCreator');

      const obj = {
          activeDate: moment(formState.values.startDate).format('yyyy-MM-DDThh:mm:ss.SSS+00:00'),
          name: serviceTypeValue.label,
          description: serviceTypeValue.label,
          serviceType: serviceTypeValue.label,
          contractCreatorXri: serviceContractCreator,
          accountXri: contactValue.uri,
          frequency: 30,
          priority: 0,
          durationUnit: formState.values.tenure
      };

      //console.log("CONTRACT: ", obj);
  //data: "{\"activeDate\":\"2022-09-05T02:43:00 PM\",\"name\":\"Estate Management Dues\",\"description\":\"Estate Management Dues\",\"groupXri\":{\"uri\":\"xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/SPACIOS41826/account/L482PW5MO27E48MCTM1LGLCLS\",\"name\":\"INJREAL Medium Housing Estate\"},\"accountXri\":\"\\\"twang15\\\"\",\"priority\":0,\"durationUnit\":30}"
      AXIOS.post('contracts/', obj)
      .then(response => {
        const res = response.data;
      //  console.log(JSON.stringify(res.response));
        const xri = res.response;
        const uuid = xri.substring(xri.lastIndexOf('/') + 1);
        const endDate = moment(formState.values.startDate, "yyyy-MM-DDThh:mm:ss.SSS+00:00").add(formState.values.tenure, 'days').format('yyyy-MM-DDThh:mm:ss.SSS+00:00');
      //  console.log("UUID: ", uuid);
      //  console.log("END: ", endDate);
        const amt = parseInt(formState.values.charge);
      //  console.log("AMT: ", amt);

        const obj2 = {
            startDate: moment(formState.values.startDate).format('yyyy-MM-DDThh:mm:ss.SSS+00:00'),
            endDate: endDate,
            paymentStatus: "0",
            durationFrequency: "0",
            amount: amt,
            durationUnit: formState.values.tenure
        };

        AXIOS.post(`contracts/${uuid}/charges`, obj2)
        .then(response => {
            const result = response.data;
            console.log(JSON.stringify(result));
            setLoading(false);
            handleOpenSnackBar();
            closeModal();

        })
        .catch(function (err) {
          setLoading(false);
          console.log(err.response);
          console.log(err.message);
          setServerError("There was a problem creating service charge. Pls try again");
          setOpenError(true);
        })

      //  handleOpenSnackBar();
      //  closeModal();
      //console.log("CONTRACT CREATED:" + res);
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
}

const handleUpdate = event => {

  event.preventDefault();

  if (!updateLoading) {
      setLoading(true);

      const serviceContractCreator = localStorage.getItem('serviceContractCreator');

      const obj = {
          activeDate: moment(formState.values.startDate).format('yyyy-MM-DDThh:mm:ss.SSS+00:00'),
          name: serviceTypeValue.label,
          description: serviceTypeValue.label,
          serviceType: serviceTypeValue.label,
          contractCreatorXri: serviceContractCreator,
          accountXri: contactValue.uri,
          frequency: 30,
          priority: 0,
          durationUnit: formState.values.tenure
      };

      AXIOS.put('contracts/', obj)
      .then(response => {
        const res = response.data;
        setUpdateLoading(false);
        handleOpenSnackBar();
        closeModal();
      })
      .catch(function (err) {
        setUpdateLoading(false);
        console.log(err.response);
        console.log(err.message);
        setServerError("There was a problem creating service charge. Pls try again");
        setOpenError(true);
      });

  }

}


/*  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  */


 const handleOpenSnackBar = () => {
   dispatch(toggleSnackbarOpen("Service Contract successfully created!"));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;



  /*const categoryItems = () => {
      return categoryData.map((category, i) => {
          return <ChipComponent obj={category} idx={i} setCategoryData={setCategoryData} setCategoryList={setCategoryList} categoryList={categoryList} />;
      })
  }*/


  return (

    <div>
         <div className={classes.formBody}>
            <div className={classes.TitleAreaBody}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.mainTitle}
              >
                Add a new service & information
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                className={classes.mainSubtitle}
              >
              Add some information of the service you want to create, (e.g service title and basic details) on the spacio system.
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
                   <InputLabel shrink htmlFor="serviceType">
                      Service Type
                    </InputLabel>
                      <FormControl error={hasError('serviceType')} className={classes.formComponent}>
                        <Autocomplete
                            id="serviceType-input"
                            name="serviceType"
                            className={classes.textField}
                            value={serviceTypeValue}
                            onChange={(event, newValue) => {
                              setServiceTypeValue(newValue);
                            }}
                            options={serviceTypeList}
                            getOptionLabel={(option) => {
                              // Regular option
                              return option.label;
                            }}
                            aria-describedby="serviceType-error"
                            renderInput={(params) => <TextField {...params} placeholder="-Please select-"
                                InputProps={{
                                  ...params.InputProps,
                                  disableUnderline: true,
                                  type: 'search',
                                  style: {fontSize: 12, paddingLeft: 20}
                                }}
                            />}
                          />
                        <FormHelperText id="serviceType-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                          {  hasError('serviceType') ? formState.errors.serviceType[0] : null }
                        </FormHelperText>
                      </FormControl>
                      <InputLabel shrink htmlFor="estateFacility">
                         Service Group
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
                                  style: {fontSize: 12, paddingLeft: 20}
                                }}
                            />}
                          />
                        <FormHelperText id="estatefacility-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                          {  hasError('estateFacility') ? formState.errors.estateFacility[0] : null }
                        </FormHelperText>
                    </FormControl>
                    <InputLabel shrink htmlFor="category-id">
                       Set Category
                     </InputLabel>
                     <Grid container spacing={1}>
                        <Grid
                        item
                        lg={10}>
                          <FormControl error={hasError('category')} className={classes.formComponent}>
                            <Select
                                value={formState.values.category}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{
                                    name:"category",
                                    id:"category-id",
                                    disableUnderline: true,
                                    placeholder:"-Please select-",
                                    style: {fontSize: 12, paddingLeft: 20}
                                  }}
                                 className={classes.textField}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="elite">Spacio Elite</MenuItem>
                                <MenuItem value="spacio-pro">Spacio Pro</MenuItem>
                                <MenuItem value="spacio-deluxe">Spacio Deluxe</MenuItem>
                              </Select>
                              <FormHelperText id="category-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                                {  hasError('category') ? formState.errors.category[0] : null }
                              </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid
                        item
                        lg={2}
                        className={classes.addbtnArea}>
                          <Button
                            className={classes.addbtnStyle}
                            color="primary"
                            fullWidth
                            size="small"
                            type="button"
                            variant="contained">
                              <AddIcon fontSize="small"/>
                            </Button>
                        </Grid>
                     </Grid>
                     <InputLabel shrink htmlFor="contacts">
                        Resident
                      </InputLabel>
                     <FormControl error={hasError('contacts')} className={classes.formComponent}>
                       <Autocomplete
                           id="resident-input"
                           name="contacts"
                           className={classes.textField}
                           value={contactValue}
                           onChange={(event, newValue) => {
                             setContactValue(newValue);
                           }}
                           options={contacts}
                           getOptionLabel={(option) => {
                             // Regular option
                             return option.fullName;
                           }}
                           aria-describedby="contacts-error"
                           renderInput={(params) => <TextField {...params} placeholder="-Please select-"
                               InputProps={{
                                 ...params.InputProps,
                                 disableUnderline: true,
                                 type: 'search',
                                 style: {fontSize: 12, paddingLeft: 20}
                               }}
                           />}
                         />
                       <FormHelperText id="contacts-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                         {  hasError('contacts') ? formState.errors.contacts[0] : null }
                       </FormHelperText>
                   </FormControl>

                    <InputLabel shrink htmlFor="tenure">
                        Choose Tenure
                      </InputLabel>

                      <Grid container spacing={1} className={classes.tenureContainer}>
                         <Grid
                         item
                         lg={6}>
                          <FormControl error={hasError('tenure')} className={classes.formComponent}>
                           <Select
                               value={formState.values.tenure}
                               onChange={handleChange}
                               fullWidth
                               inputProps={{
                                   name:"tenure",
                                   id:"tenure-id",
                                   disableUnderline: true,
                                   placeholder:"-Please select-",
                                   style: {fontSize: 12, paddingLeft: 20}
                                 }}
                                className={classes.textField}

                             >
                               <MenuItem value="">
                                 <em>None</em>
                               </MenuItem>
                               <MenuItem value={30}>30 Days</MenuItem>
                               <MenuItem value={90}>90 Days</MenuItem>
                               <MenuItem value={180}>6 Months</MenuItem>
                               <MenuItem value={365}>Annually</MenuItem>
                             </Select>
                             <FormHelperText id="tenure-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                               {  hasError('tenure') ? formState.errors.tenure[0] : null }
                             </FormHelperText>
                            </FormControl>
                         </Grid>
                         <Grid
                         item
                         lg={6}>
                         <TextField
                             id="startdate-time"
                             className={classes.textField}
                             name="startDate"
                             type="date"
                             fullWidth
                             onChange={handleChange}
                             value={formState.values.startDate}
                             InputProps={{
                               disableUnderline: true,
                               style: {fontSize: 12, paddingLeft: 20}
                             }}
                             InputLabelProps={{
                               shrink: true,
                             }}
                             aria-describedby="startdate-error"
                           />
                         </Grid>
                      </Grid>
                      <InputLabel shrink htmlFor="charge">
                        Service Charge
                      </InputLabel>
                      <FormControl error={hasError('charge')} className={classes.formComponent}>
                        <TextField
                            id="charge-input"
                            className={classes.textField}
                            name="charge"
                            type="number"
                            placeholder="0.00"
                            value={formState.values.charge}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                              disableUnderline: true,
                              style: {fontSize: 12, paddingLeft: 20},
                              startAdornment:<InputAdornment position="start">₦</InputAdornment>
                            }}
                            aria-describedby="charge-error"
                          />
                          <FormHelperText id="charge-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                            {  hasError('charge') ? formState.errors.charge[0] : null }
                          </FormHelperText>
                    </FormControl>
             </form>
             <div>
               {data.editStatus ?
                 (<Button
                   className={classes.buttonStyle}
                   color="primary"
                   fullWidth
                   size="small"
                   type="button"
                   onClick={handleUpdate}
                   variant="contained"
                   disabled={loading || !formState.values.charge || !formState.values.startDate || !formState.values.category
                     || !formState.values.tenure || value === null || serviceTypeValue === null}>
                  Update
                   {updateLoading && <CircularProgress size={18} className={classes.buttonProgress} />}
                 </Button>)
                   :
                   (<Button
                     className={classes.buttonStyle}
                     color="primary"
                     fullWidth
                     startIcon={<AddIcon fontSize="small" style={{ marginRight: '10%' }} />}
                     size="small"
                     type="button"
                     onClick={handleService}
                     variant="contained"
                     disabled={loading || !formState.values.charge || !formState.values.startDate || !formState.values.category
                       || !formState.values.tenure || value === null || serviceTypeValue === null}>
                     Add New Service
                     {loading && <CircularProgress size={18} className={classes.buttonProgress} />}
                   </Button>)
               }

             </div>
         </div>
    </div>
  );
}

export default ServiceContract;
