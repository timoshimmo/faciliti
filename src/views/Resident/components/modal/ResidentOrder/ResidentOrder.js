import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Slide,
  FormControl,
  FormHelperText,
  SvgIcon,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import validate from 'validate.js';
import { ChipComponent, TaggedPeopleComponent, CategoryDialog, TaggedPeopleDialog } from './components';
import AXIOS from '../../../../../util/webservices';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useModalAction } from '../../../../modal/modal-context.tsx';
import moment from 'moment';

/*
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
*/

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

  orderTitle: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 1
    }
  },
  orderDescription: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 1
    }
  },
  dueDate: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 3
    }
  }
}

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
    color: theme.palette.text.primary
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
   marginBottom: theme.spacing(1),
   marginTop: theme.spacing(2),
   fontSize: 11
},
 formComponent: {
   width: '100%',
   marginBottom: theme.spacing(1),
   marginTop: theme.spacing(2),
   fontSize: 11
},
helper: {
  fontSize: 11,
  color: '#e53935'
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
  paddingTop: theme.spacing(1),
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

contentBodyStyle: {
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}
}));


const ResidentOrder = (props) => {

  const classes = useStyles();

  const { row } = props;


  const [openDialog, setOpenDialog] = useState(false);
  const [openPeopleDialog, setOpenPeopleDialog] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

 const { closeModal } = useModalAction();

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
//  const [peopleList, setPeopleList] = useState([]);
  const [avatarList, setAvatarList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [serverError, setServerError] = useState(null);

  const [categoryList, setCategoryList] = useState([
      { key: "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activityCategory/3PKHAH11AT97W22TCCMSW9ZD5", label: 'Carpentry' },
      { key: "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activityCategory/3PKHAH11AT97WRRETVVDDDFFG", label: 'Electrical' },
      { key: "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activityCategory/3PKHAH11AT97WAQPLLLSZXXCV", label: 'Fumigation' },
      { key: "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activityCategory/3PKHAH11AT97WOIYKKKTTTKKD", label: 'Painting' },
      { key: "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activityCategory/3PKHAH11AT97W495WEER59AAS", label: 'Plumbing' },
      { key: "xri://@openmdx*org.opencrx.kernel.activity1/provider/CRX/segment/INJREAM26606/activityCategory/3PKHAH11AT97W596WOPLAASS5", label: 'Welding' },
      ]);

/*    const [peopleList, setPeopleList] = useState([
      { key: 0, name: 'Mr Gbenga Lasisi', email: "gbengalasisi@email.com", avatar: "/images/ga.png", role: "Facility Manager" },
      { key: 1, name: 'Stella Ejiofor', email: "stellaejiofor@email.com", avatar: "/images/ba.png", role: "Exco" },
      { key: 2, name: 'Nnamdi Oji', email: "nnamdioji@email.com", avatar: "/images/ga.png", role: "Exco" },
      { key: 3, name: 'Rhummie West', email: "rhummie_west@email.com", avatar: "/images/ba.png", role: "Exco" },
      ]);
*/

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
  if(row!= null && Object.keys(row).length > 0) {

    //console.log("LOGS 1: " + JSON.stringify(row.name));
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        orderTitle: row.name,
        dueDate: moment(row.dueBy).format('yyyy-MM-DDThh:mm'),
        orderDescription: row.description
      }

    }));
    //setPhoneNo({phone: visitorDetails.phoneNumber});
  //  setAvatarList(dummyList);
  }

}, [row]);

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

  const handleSave = () => {
    if (!loading) {
      setLoading(true);
      /*
      segmentName: userData.crxDetails.segmentName,
      userId: userData.crxDetails.userId
      */

    //  console.log("Categories: " + JSON.stringify(selectedCategory));
      const obj = {
        name: formState.values.orderTitle,
        description: formState.values.description,
        dueBy: formState.values.dueDate,
        contactXris: contactList,
        categories: selectedCategory
      };


      AXIOS.post('/resorders', obj)
      .then(response => {
        const res = response.data;
        console.log(res);
        setLoading(false);
        closeModal();
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error.response);
        console.log(error.message);
        setServerError("There was a problem adding an order. Pls try again");
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


  const categoryItems = () => {
      return categoryData.map((category, i) => {
          return <ChipComponent obj={category} idx={i} setCategoryData={setCategoryData}
            setCategoryList={setCategoryList} categoryList={categoryList} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
      })
  }

  const taggedPeopleItems = () => {
      return avatarList.map((avatar, i) => {
          return <TaggedPeopleComponent obj={avatar} key={i} setAvatarList={setAvatarList} />;
      })
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
      <div>
        <div className={classes.dialogtitleStyle}>
             <Typography variant="h4">Create Order</Typography>
         </div>
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
         <div className={classes.contentBodyStyle}>
             <form autoComplete="off">
              <Grid container>
                <Grid item lg={12}>
                  <FormControl  error={hasError('orderTitle')} className={classes.formComponentSimple}>
                      <TextField
                        id="order-title"
                        label="Order Title"
                        variant="standard"
                        fullWidth
                        name="orderTitle"
                        value={formState.values.orderTitle}
                        type="text"
                        className={classes.ordertitleStyle}
                        onChange={handleChange}
                        aria-describedby="title-error"
                      />
                      <FormHelperText id="title-error" classes={{ error: classes.helper }}>
                        {  hasError('orderTitle') ? formState.errors.orderTitle[0] : null }
                      </FormHelperText>
                    </FormControl>
                  <Grid container className={classes.categoryBody}>
                    <Grid
                    item
                    lg={9}>
                     <Grid container direction="row" spacing={1} alignItems='center'>
                        {categoryItems()}
                     </Grid>
                    </Grid>
                    <Grid
                    item
                    lg={3}
                    className={classes.categoryAddArea}
                    >
                      <Button
                          disableripple="true"
                          disabletouchripple="true"
                          className={classes.categoryButton}
                          startIcon={<AddIcon style={{ fontSize: 16, color: '#8692A6' }}/>}
                          onClick={handleDialogOpen}
                        >
                          Add Category
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
               </Grid>
                 <FormControl className={classes.formComponent}>
                   <TextField
                       id="meeting-date-time"
                       className={classes.textField}
                       name="dueDate"
                       type="datetime-local"
                       placeholder="Select date &amp; time"
                       onChange={handleChange}
                       value={formState.values.dueDate}
                       InputProps={{
                         style: {fontSize: 13}
                       }}
                       InputLabelProps={{
                         shrink: true,
                       }}
                       aria-describedby="meeting-date-time-error"
                     />
                 </FormControl>
               <FormControl error={hasError('orderDescription')} className={classes.formComponent}>
                 <TextField
                   id="description"
                   className={classes.textArea}
                   name="orderDescription"
                   type="text"
                   placeholder="Enter description"
                   value={formState.values.orderDescription}
                   multiline
                   rows={6}
                   onChange={handleChange}
                   InputProps={{
                     disableUnderline: true,
                     style: {fontSize: 13}
                   }}
                   aria-describedby="description-error"
                 />
                 <FormHelperText id="description-error" classes={{ error: classes.helper }}>
                   {  hasError('orderDescription') ? formState.errors.orderDescription[0] : null }
                 </FormHelperText>
               </FormControl>
               <Grid container justify="flex-end" className={classes.attachmentBody}>
                 <Grid
                 item>
                    <IconButton classes={{ root: classes.btnIconStyle }}>
                      <AttachmentIcon style={{ fontSize: 13}} />
                    </IconButton>

                    <IconButton classes={{ root: classes.btnIconStyle }}>
                      <CalendarIcon style={{ fontSize: 13}} />
                    </IconButton>
                 </Grid>
                </Grid>
             </form>
           <Grid container className={classes.btnAreaContainer} direction="column" justify="flex-end">
            <Grid item>
              <Typography
                variant="body1"
                color="secondary"
                className={classes.tagAreaTitle}
              >
                Tag People
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems='center'>
                <Grid
                  item
                  lg={6}
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
                  <Grid
                    item
                    lg={6}
                    className={classes.dialogButtonArea}
                    >
                    <Button
                    variant="outlined"
                    color="secondary"
                    classes={{ root: classes.buttonCancelStyle }}
                    onClick={closeModal}
                    >
                    Cancel
                  </Button>
                  <Button
                      variant="contained"
                      classes={{ root: classes.buttonCreateStyle }}
                      startIcon={<AddIcon style={{ fontSize: 16, color: '#FFFFFF' }}/>}
                      onClick={handleSave}
                      disabled={loading || !formState.values.orderTitle || !formState.values.orderDescription || !formState.values.dueDate
                         || contactList.length < 1 || categoryList.length < 1}
                      >
                      Save & Create
                      {loading && <CircularProgress size={18} className={classes.buttonProgress} />}
                    </Button>
                </Grid>
              </Grid>
            </Grid>
           </Grid>
         </div>

      <CategoryDialog
        onClose={handleDialogClose}
        onOpen={openDialog}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <TaggedPeopleDialog
        onClose={handlePeopleDialogClose}
        onOpen={openPeopleDialog}
        setContactList={setContactList}
        contactList={contactList}
        setAvatarList={setAvatarList}
      />
    </div>
  );
}

export default ResidentOrder;
