import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Leftbar, Rightbar, Topbar } from './components';
import { OrderDialog } from '../../views/Resident/components';
import { ModalProvider } from '../../views/modal/modal-context.tsx';
import ModalManager from '../../views/modal/modal-manager';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    maxHeight: '100vh',
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
    width: '66%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
  },
  rightDiv: {
    width: '17%',
    position: 'sticky',
    right: 0,
    top: 0,
    backgroundColor: '#E6E9EF',
    maxHeight: '100vh'
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
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  let history = useHistory();

  if (typeof localStorage !== 'undefined') {
    if(!localStorage.getItem('spfmtoken')) {
      //  console.log("LOCAL STORAGE TOKEN: ", localStorage.getItem('spfmtoken'));
        history.push('/signin');
    }
  }

  useEffect(() => {
     window.history.pushState(null, '', window.location.href)
     window.onpopstate = () => {
         window.location.reload();
     }

 }, []);

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <ModalProvider>
       <div className={classes.leftDiv} >
          <Leftbar onDialogOpen={handleDialogOpen} />
        </div>
        <div className={classes.mainDiv}>
            <Topbar />
            <main className={classes.content}>
              {children}
            </main>
            <ModalManager />
            <OrderDialog
              onClose={handleDialogClose}
              onOpen={openDialog}
            />
        </div>
        <div className={classes.rightDiv}>
          <Rightbar />
        </div>
      </ModalProvider>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
