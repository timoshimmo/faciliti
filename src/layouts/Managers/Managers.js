import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Leftbar, Topbar } from './components';
import { NewResidentDialog } from '../../views/FacilityManager/components';
import { useHistory } from 'react-router-dom';
import { ModalProvider } from '../../views/modal/modal-context.tsx';
import ModalManager from '../../views/modal/modal-manager';
import { Provider } from "react-redux";
import configureStore from "../../store";
import SnackbarComponent from '../../components/SnackbarComponent';
//import { history } from '../../helpers';


/*

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);


<Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
  open={openSnack}
  autoHideDuration={6000}
  onClose={handleCloseSnackBar}
>
  <MySnackbarContentWrapper
    onClose={handleCloseSnackBar}
    variant="success"
    message="New resident successfully created!"
  />
</Snackbar>

*/

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    maxHeight: '100vh',
    maxWidth: '100% !important',
    overflowX: 'hidden !important',
    display: 'flex',
    flexDirection: 'row',
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%',
    display: 'block',
    backgroundColor: '#efefef',
    width: '100%',
  },
  leftDiv: {
    width: '17%',
    position: 'sticky',
    right: 0,
    top: 0,
    backgroundColor: '#52506E',
    borderRight: '1px solid #F2F4F7',
    maxHeight: '100vh'
  },
  mainDiv: {
    display: 'flex',
    maxHeight: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    width: '83%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
  },
  rightDiv: {
    width: '17%',
    position: 'fixed',
    right: 15,
    top: 60,
    backgroundColor: '#E6E9EF',
    maxHeight: '90vh',
    height: '100%',
    overflowY: 'hidden !important',
  },
  grid: {
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    position: 'relative'
  },
  topArea: {
    height: 64,
    width: '100%',
  },
  contentBody: {
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  margin: {
   margin: theme.spacing.unit,
 },
}));

/*
<div className={classes.rightDiv}>
  <Rightbar />
</div>

*/

const Managers = props => {
  const { children } = props;
  const [openNewResidentDialog, setOpenNewResidentDialog] = useState(false);
//  const [openSnack, setOpenSnack] = useState(false);

  const classes = useStyles();
  let history = useHistory();

  const store = configureStore();

  if (typeof localStorage !== 'undefined') {
    if(!localStorage.getItem('spfmtoken')) {
      //  console.log("LOCAL STORAGE TOKEN: ", localStorage.getItem('spfmtoken'));
        history.push('/signin');
    }
  }

/*  history.listen((newLocation, action) => {
  if (action === "POP") {
      // If a "POP" action event occurs,
      // Send user back to the originating location
      history.go(1);

    }

  });*/

  useEffect(() => {
     window.history.pushState(null, '', window.location.href)
     window.onpopstate = () => {
         window.location.reload();
     }

 }, []);

/*  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userDetails');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }*/

  const handleNewResidentDialogOpen = () => {
    setOpenNewResidentDialog(true);
  };

  const handleNewResidentDialogClose = () => {
    setOpenNewResidentDialog(false);
  };

/*  const handleCloseSnackBar = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   setOpenSnack(false);
  }

  const handleOpenSnackBar = () => {
   setOpenSnack(true);
  }*/


  return (
    <div className={classes.root}>
      <ModalProvider>
        <Provider store={store}>
         <div className={classes.leftDiv} >
            <Leftbar
              onClose={handleNewResidentDialogClose}
              onOpen={handleNewResidentDialogOpen}
              />
          </div>
          <div className={classes.mainDiv}>
            <Topbar />
            <main className={classes.content}>
              {children}
            </main>
            <ModalManager />
            <NewResidentDialog
              onClose={handleNewResidentDialogClose}
              onOpen={openNewResidentDialog}
            />
          </div>
          <SnackbarComponent timeout={6000} />
        </Provider>
      </ModalProvider>
    </div>
  );
};

Managers.propTypes = {
  children: PropTypes.node
};

export default Managers;
