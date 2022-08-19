import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  InputLabel,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  FormControl,
  FormHelperText,
  SvgIcon,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import validate from 'validate.js';
//import { ChipComponent, TaggedPeopleComponent, TaggedPeopleDialog } from './components';
import AXIOS from '../../../../../util/webservices';
//import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CalendarIcon(props) {
  return (
    <SvgIcon {...props} width="20" height="20" viewBox="0 0 20 20">
      <path d="M15 12V10H13V12H15Z" fill="#8692A6"/>
      <path d="M11 12H9V10H11V12Z" fill="#8692A6"/>
      <path d="M7 12V10H5V12H7Z" fill="#8692A6"/>
      <path d="M15 14V16H13V14H15Z" fill="#8692A6"/>
      <path d="M9 16H11V14H9V16Z" fill="#8692A6"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1H14V0H16V1H18C19.1046 1 20 1.89543 20 3V18C20 19.1046 19.1046 20 18 20H2C0.89543 20 0 19.1046 0 18V3C0 1.89543 0.89543 1 2 1H4V0H6V1ZM14 4H16V3H18V6H2V3H4V4H6V3H14V4ZM2 8H18V18H2V8Z" fill="#8692A6"/>
    </SvgIcon>
  );
}

function AttachmentIcon(props) {
  return (
    <SvgIcon {...props} width="20" height="20" viewBox="0 0 20 20">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3429 4.54368L12.7679 5.94702L6.44974 12.3628C6.1327 12.6863 6.1327 13.2071 6.44974 13.5307C6.75058 13.8378 7.25315 13.8364 7.55079 13.529L14.5022 6.46741C15.517 5.43179 15.517 3.76857 14.5022 2.73294C13.5339 1.74484 11.8208 1.76682 10.8718 2.73482L3.28454 10.437C1.57154 12.1844 1.57154 14.9904 3.28454 16.7378C4.94795 18.4346 7.80544 18.407 9.44287 16.7362L18.2919 7.74899L19.717 9.1522L10.8696 18.1378C8.45572 20.6008 4.31008 20.6409 1.85633 18.1379C-0.619061 15.6127 -0.619061 11.562 1.85804 9.03517L9.44533 1.33301C11.1687 -0.425057 14.1701 -0.463563 15.9307 1.33316C17.7075 3.14642 17.7075 6.05393 15.9291 7.86883L8.98186 14.9262C7.90719 16.0361 6.10934 16.0411 5.02113 14.9304C3.94224 13.8292 3.94224 12.0643 5.02293 10.9612L11.3429 4.54368Z" fill="#8692A6"/>
    </SvgIcon>
  );
}

const schema = {

  visitorName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3
    }
  },
  dueDate: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3
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
}

const useStyles = makeStyles(theme => ({

  dialogtitleStyle: {
    margin: 0,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F3F8FF'
  },
  dialogContentStyle: {
    paddingBottom: theme.spacing(1),
  },
  categoryBody: {
    backgroundColor: '#F9FBFC',
    padding: 10,
    borderRadius: 4,
  },
  categoryButton: {
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
  ordertitleStyle: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  categoryAddArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textArea: {
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
 formComponentSimple: {
   width: '100%',
   fontSize: 11,
},
 formComponent: {
   width: '100%',
   fontSize: 11
},

labelStyle: {
  width: '100%',
  marginTop: theme.spacing(2),
  fontSize: 15
},

helperError: {
  fontSize: 11,
  color: '#e53935',
},
helperRoot: {
  height: 30
},
attachmentBody: {
  paddingBottom: 10,
},
btnIconStyle: {
  borderRadius: 4,
  backgroundColor: 'rgba(134, 146, 166, 0.15)',
  marginLeft: 8
},
btnAreaContainer: {
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
},
dialogButtonArea: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: 10,
  paddingBottom: 10
},
buttonCreateStyle: {
  backgroundColor: '#1BBC35',
  borderRadius: 4,
  textTransform: "capitalize",
  fontSize: 12,
  color: '#ffffff',
  marginLeft: 8,
  "&:hover": {
    backgroundColor: 'rgba(27, 188, 53, 0.8)',
  }
},
buttonCancelStyle: {
  borderRadius: 4,
  textTransform: "capitalize",
  backgroundColor: 'transparent',
  fontSize: 12
},
tagAreaTitle: {
  fonstSize: 11
},
 avatarListBody: {
   flexWrap: 'nowrap',
   // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
   transform: 'translateZ(0)',
 },
 avatarListContainer: {
   paddingTop: 10,
   paddingBottom: 10
 },
 smallAvatar: {
   width: 25,
   height: 25,
   border: '1px solid #fff',
   fontSize: 13,
   marginLeft: '-3px !important'
},
taggedPeopleArea: {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
},
addButtonArea: {
  marginLeft: 10,
  paddingTop: 10,
  paddingBottom: 10
},
btnAddPeopleStyle: {
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  "&:hover":{
    backgroundColor: '#B9BFCB',
    opacity: '1 !important'
  }
},
dialogTopicStyle: {
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
    fontSize: 21,
    fontWeight: 700,
    color: '#494949'
},
dialogSubTopicStyle: {
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
    fontSize: 13,
    color: '#8692A6'
},
subtitleSpacing: {
    marginBottom: 20,
    fontSize: 12,
  },

  errorArea: {
    paddingTop: 15,
    paddingBottom: 15
  },
  buttonProgress: {
     color: theme.palette.primary.main,
     position: 'absolute',
     top: '50%',
     left: '50%',
     marginTop: -10,
     marginLeft: -12,
   },
   textField: {
     backgroundColor: '#FFFFFF',
     border: '1px solid #8692A6',
     fontSize: 12,
     color: theme.palette.text.primary,
     borderRadius: 6,
     transition: theme.transitions.create(['background-color']),
     padding: '7px 25px',
     marginBottom: theme.spacing(2),
     marginTop: 5,
     '&$focused': {
       border: '1px solid #1565D8',
       backgroundColor: '#FFFFFF',
     },
     '&:hover': {
       border: '1px solid #1565D8',
       backgroundColor: '#FFFFFF',
    },
   },
}));


const NewVisitorDialog = props => {

  const classes = useStyles();

  const { onOpen, onClose, visitorDetails, edit } = props;

  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userDetails');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [openPeopleDialog, setOpenPeopleDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [openError, setOpenError] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const [avatarList, setAvatarList] = useState([]);
  const [phoneNo, setPhoneNo] = useState('');

  const [dummyList, setDummyList] = useState([
      { key: 0,
        xri: "xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/INJREAM26606/account/R766BOBU81L9OS69941RBA7DF",
        name: 'Jagger Grimjaw',
        email: "timoshimmo@yahoo.com",
        accountCategories: [25]
      }
    ]);

  const [contactList, setContactList] = useState([]);
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
      //console.log("EDIT: " + edit);
      if(edit) {

      //  console.log("VISITOR DETAILS: " + JSON.stringify(visitorDetails));
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            visitorName: visitorDetails.name,
            dueDate: moment(visitorDetails.dueBy).format('yyyy-MM-DDThh:mm'),
            phoneNumber: visitorDetails.phoneNumber
          }

        }));
        setPhoneNo({phone: visitorDetails.phoneNumber});
      //  setAvatarList(dummyList);
      }
      else {
        formState.values = {};
      }

   }, [visitorDetails, edit]);

  /*  const [contactList, setContactList] = useState([
      "xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/INJREAM26606/account/9HNUMHC5KFUUK22TCCMSW9ZD5",
      "xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/INJREAM26606/account/9HNUMHC5KFUUK22TCCMSW9ZD5"
    ]);*/

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      }
    }));
  };

  const handleCloseVisitorDialog = () => {
    //setEdit(false);
    onClose()
  }

   const handleDateChange = (date) => {
     setSelectedDate(date);
   };

  const handleSave = () => {

    if (!loading) {
      setLoading(true);

      console.log("New Visitor: " + JSON.stringify(formState.values));
      console.log("Phone: " + phoneNo.phone);
      const obj = {
        name: formState.values.visitorName,
        phoneNumber: phoneNo.phone,
        description: formState.values.visitorName,
        dueBy: formState.values.dueDate,
        contactXris: ["xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/INJREAM26606/account/9HNUMHC5KFUUK22TCCMSW9ZD5"],
      };

      AXIOS.post('/visits', obj)
      .then(response => {
        const res = response.data;
        console.log(res);
        setLoading(false);
        onClose();
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error.response);
        console.log(error.message);
        setServerError("There was a problem adding a meeting. Pls try again");
        setOpenError(true);
      })
    }
  }

  const handleUpdate = () => {

    if (!updateLoading) {
      setUpdateLoading(true);

      const obj = {
        description: formState.values.visitorName
      };


      AXIOS.put(`visits/${visitorDetails.key.uuid}`, obj)
      .then(response => {
        const res = response.data;
        console.log(res);
        setUpdateLoading(false);
        onClose();
      })
      .catch(function (error) {
        setUpdateLoading(false);
        console.log(error.response);
        console.log(error.message);
        setServerError("There was a problem adding a meeting. Pls try again");
        setOpenError(true);
      })
    }
  }


  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePeopleDialogOpen = () => {
    setOpenPeopleDialog(true);
  };

  const handlePeopleDialogClose = () => {
    setOpenPeopleDialog(false);
  };

/*  const taggedPeopleItems = () => {
      return avatarList.map((avatar, i) => {
          return <TaggedPeopleComponent obj={avatar} key={i} setAvatarList={setAvatarList} />;
      })
  } */

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (

    <Dialog fullWidth maxWidth="sm" onClose={onClose} aria-labelledby="order-dialog" open={onOpen} TransitionComponent={Transition}>
      <DialogTitle disableTypography className={classes.dialogtitleStyle}>
           <Typography variant="h4" gutterBottom className={classes.dialogTopicStyle}>Create Schedule</Typography>
           <Typography variant="body1" className={classes.dialogSubTopicStyle}>For the security reasons it is important to give accurate details of your guest(s)</Typography>
       </DialogTitle>
       <DialogContent className={classes.dialogContentStyle}>
         <div className={classes.errorArea}>
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
         </div>
           <form autoComplete="off">
            <Grid container>
              <Grid item lg={12}>
                <FormControl  error={hasError('visitorName')} className={classes.formComponentSimple}>
                    <TextField
                      id="vistor-name"
                      label="Enter Visitor name"
                      variant="standard"
                      fullWidth
                      name="visitorName"
                      type="text"
                      className={classes.ordertitleStyle}
                      onChange={handleChange}
                      value={formState.values.visitorName}
                      aria-describedby="visitor-name-error"
                      InputProps={{
                        style: {fontSize: 13}
                      }}
                    />
                  <FormHelperText id="visitor-name-error" classes={{ root:classes.helperRoot, error: classes.helperError }}>
                      {  hasError('visitorName') ? formState.errors.visitorName[0] : null }
                    </FormHelperText>
                  </FormControl>
              </Grid>

              <Grid item lg={12}>
                <InputLabel className={classes.labelStyle} shrink htmlFor="dueDate">
                   Set Due Date &amp; Time
                 </InputLabel>
                <FormControl className={classes.formComponent}>
                  <TextField
                      id="meeting-date-time"
                      name="dueDate"
                      type="datetime-local"
                      onChange={handleChange}
                      value={formState.values.dueDate}
                      className={classes.textField}
                      InputProps={{
                        disableUnderline: true,
                        style: {fontSize: 13}
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      aria-describedby="meeting-date-time-error"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <InputLabel className={classes.labelStyle} shrink htmlFor="phoneNumber">
                    Add Phone number
                  </InputLabel>
                  <FormControl className={classes.formComponent}>
                      <PhoneInput
                        country={'ng'}
                        name="phoneNumber"
                        onChange={phone => setPhoneNo({ phone })}
                        value={formState.values.phoneNumber}
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
                          style: {fontSize: 13}
                        }}
                      />

                      <FormHelperText id="phonenumber-error" classes={{ root: classes.helperRoot, error: classes.helper }}>
                        {  hasError('phoneNumber') ? formState.errors.phoneNumber[0] : null }
                      </FormHelperText>
                  </FormControl>
              </Grid>
             </Grid>
           </form>
       </DialogContent>
       <DialogActions>
         <Grid container className={classes.btnAreaContainer} direction="column" justify="flex-end">
          {/*

            <Grid item>
              <Typography
                variant="body1"
                color="secondary"
                className={classes.tagAreaTitle}
              >
                Invite People
              </Typography>
            </Grid>
          */}
          <Grid item>
            <Grid container alignItems='center' justify="flex-end">
            {/*

              <Grid
                  item
                  lg={7}
                  className={classes.taggedPeopleArea}
                  >
                    <div className={classes.avatarListContainer}>
                      <AvatarGroup max={7} spacing="small" classes={{ avatar: classes.smallAvatar }}>
                        {taggedPeopleItems()}
                      </AvatarGroup>
                    </div>
                    <div className={classes.addButtonArea}>
                      <IconButton
                      size="small"
                      classes={{ root: classes.btnAddPeopleStyle }}
                      onClick={handlePeopleDialogOpen}>
                        <AddIcon style={{ fontSize: 16, color: '#FFFFFF' }} />
                      </IconButton>
                    </div>
                  </Grid>

            */}
                <Grid
                  item
                  lg={5}
                  className={classes.dialogButtonArea}
                  >
                  <Button
                  variant="outlined"
                  color="secondary"
                  classes={{ root: classes.buttonCancelStyle }}
                  onClick={handleCloseVisitorDialog}
                  >
                  Cancel
                </Button>
                {edit ?
                  (<Button
                      variant="contained"
                      classes={{ root: classes.buttonCreateStyle }}
                      startIcon={<AddIcon style={{ fontSize: 16, color: '#FFFFFF' }}/>}
                      onClick={handleUpdate}
                      disabled={updateLoading}
                      >
                      Update
                      {updateLoading && <CircularProgress size={18} className={classes.buttonProgress} />}
                    </Button>)
                    :
                    (<Button
                          variant="contained"
                          classes={{ root: classes.buttonCreateStyle }}
                          startIcon={<AddIcon style={{ fontSize: 16, color: '#FFFFFF' }}/>}
                          onClick={handleSave}
                          disabled={loading || !formState.values.visitorName || !formState.values.dueDate || !phoneNo.phone}
                          >
                          Save & Create
                          {loading && <CircularProgress size={18} className={classes.buttonProgress} />}
                        </Button>)
                }
                </Grid>
            </Grid>
          </Grid>
         </Grid>
      </DialogActions>
      {/*

        <TaggedPeopleDialog
          onClose={handlePeopleDialogClose}
          onOpen={openPeopleDialog}
          setAvatarList={setAvatarList}
          setContactList={setContactList}
          contactList={contactList}
        />
      */}

    </Dialog>
  );
}

NewVisitorDialog.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.bool,
};

export default NewVisitorDialog;
