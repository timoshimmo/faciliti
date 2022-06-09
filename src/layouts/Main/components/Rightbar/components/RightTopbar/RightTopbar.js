import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { Toolbar, IconButton, Button } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles(theme => ({

  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },

  grid: {
    height: '100%',
  },
  leftCol: {
    display: 'flex',
    alignItems: 'center',

  },
  rightCol: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  txtSuggestions: {
    marginLeft: 20,
    color: theme.palette.text.primary,
    fontSize: 14
  },
  toolbar: {
    borderBottom: '1px solid #F2F4F7',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#fff'
  },
  topIconButton: {
    padding: 5,
    backgroundColor: 'rgba(27, 117, 188, 0.15)',
    borderRadius: 4
  },
  typoUsername: {
    fontSize: 13,
    color: theme.palette.secondary.dark,
    textTransform: 'none',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  }
  }));

  function NotificationIcon(props) {
    return (
      <SvgIcon {...props} width="30" height="30" viewBox="0 0 30 30">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 15C18.3579 15 15 11.6421 15 7.5C15 3.35787 18.3579 0 22.5 0C26.6421 0 30 3.35787 30 7.5C30 11.6421 26.6421 15 22.5 15ZM27 7.5C27 9.98528 24.9853 12 22.5 12C20.0147 12 18 9.98528 18 7.5C18 5.01472 20.0147 3 22.5 3C24.9853 3 27 5.01472 27 7.5Z" fill="#1B75BC"/>
          <path d="M24 16.5H27V27C27 28.6569 25.6569 30 24 30H3C1.34315 30 0 28.6569 0 27V6C0 4.34315 1.34315 3 3 3H13.5V6H3V27H24V16.5Z" fill="#1B75BC"/>
      </SvgIcon>
    );
  }


  const RightTopbar = props => {
  //  const { className, onSidebarOpen, refreshAction, filterData } = props;

    const classes = useStyles();

    let userData = {};
    if (typeof localStorage !== 'undefined') {
        const user = localStorage.getItem('userDetails');
        if(user !== null) {
          const data = JSON.parse(user);
          userData = data;
        }
    }

    return (

        <Toolbar
          disableGutters={true}
          className={classes.toolbar}
        >
          <Grid
            className={classes.grid}
            container
            alignItems="center"
            direction="row"
          >

          <Grid
            item
            lg={2}
            className={classes.leftCol}
          >
            <IconButton
              disableRipple={true}
              disableFocusRipple={true}
              color="primary"
              className={classes.topIconButton}>
                <NotificationIcon fontSize="small" style={{ width: 17, height: 17, fill: 'none' }} />
            </IconButton>
          </Grid>

            <Grid
              item
              lg={10}
              className={classes.rightCol}
            >
                <Button
                  className={classes.typoUsername}
                  startIcon={<AccountCircleIcon fontSize="small" style={{ marginRight: '10%' }} />}
                >
                  {userData.crxDetails.fullName}
                </Button>
            </Grid>
          </Grid>
        </Toolbar>
    );

};

RightTopbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default RightTopbar;
