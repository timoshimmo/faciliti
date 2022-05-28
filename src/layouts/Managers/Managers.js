import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Leftbar, Rightbar, Topbar } from './components';
import { NewResidentDialog } from '../../views/FacilityManager/components';

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
  }
}));

/*
<div className={classes.rightDiv}>
  <Rightbar />
</div>

*/

const Managers = props => {
  const { children } = props;
  const [openNewResidentDialog, setOpenNewResidentDialog] = useState(false);

  const classes = useStyles();
  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userDetails');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

  const handleNewResidentDialogOpen = () => {
    setOpenNewResidentDialog(true);
  };

  const handleNewResidentDialogClose = () => {
    setOpenNewResidentDialog(false);
  };


  return (
    <div className={classes.root}>
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
          <NewResidentDialog
            onClose={handleNewResidentDialogClose}
            onOpen={openNewResidentDialog}
          />
        </div>
    </div>
  );
};

Managers.propTypes = {
  children: PropTypes.node
};

export default Managers;
