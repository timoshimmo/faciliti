import React, { useEffect, useState, forwardRef } from 'react';
import { NavLink as RouterLink, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  SvgIcon,
  Divider
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AXIOS from '../../../../../../util/webservices';


const useStyles = makeStyles(theme => ({
  root: {
    height: '85vh',
    position: 'relative',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: 40,
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    }
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 5,
  },
  button: {
    color: '#EFF1F3',
    padding: '10px 16px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: 400,
    fontSize: 13,
    boxShadow: 'none',
    marginBottom: 5,
    borderRadius: 4,
    backgroundColor: 'transparent',
    '&:hover': {
     color: '#FEC545',
     backgroundColor: '#FFFFFF40',
     '& $svg': {
       color: '#FEC545',
       stroke: '#FEC545 !important'
     }
   },
  },
  icon: {
    color: '#EFF1F3',
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: '10%',
    marginLeft: 20
  },
  active: {
    color: '#FEC545',
    fontWeight: theme.typography.fontWeightMedium,
    '& $svg': {
      color: '#FEC545',
      stroke: '#FEC545 !important'
    }
  },
  listroot: {
    flexGrow: 1
  },
  settingsTitleStyle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#04011D',
  },
  actionSidebar: {
    marginTop: 5,
    marginBottom: 15,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: 400,
    fontSize: 13,
    textTransform: 'none',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logout: {
    fontWeight: 400,
    fontSize: 13,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    border: '1px solid #8692A6',
    borderRadius: 4,
    '&:hover': {
     backgroundColor: '#FFFFFF1A',
   },
   width: '100%',
   marginTop: 25
 },
 menuIconStyle: {
   minWidth: 30
 },
 menuTextStyle: {
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
   color: '#52506E'
 }
}));

function ResidentIcon(props) {
  return (
    <SvgIcon {...props} width="20" height="20" viewBox="0 0 20 20">
      <path d="M10.0001 14C13.5899 14 16.5001 11.0899 16.5001 7.5C16.5001 3.91015 13.5899 1 10.0001 1C6.41021 1 3.50006 3.91015 3.50006 7.5C3.50006 11.0899 6.41021 14 10.0001 14Z" stroke="#52506E" strokeWidth="2" strokeMiterlimit="10"/>
      <path d="M0.999512 18.6746C2.01468 17.2306 3.36238 16.052 4.92882 15.2384C6.49527 14.4248 8.23448 14.0001 9.99962 14C11.7648 13.9999 13.504 14.4246 15.0705 15.238C16.637 16.0515 17.9848 17.23 19.0001 18.6739" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function NewUserIcon(props) {
  return (
    <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32">
      <path d="M11.0001 20C14.5899 20 17.5001 17.0899 17.5001 13.5C17.5001 9.91015 14.5899 7 11.0001 7C7.41021 7 4.50006 9.91015 4.50006 13.5C4.50006 17.0899 7.41021 20 11.0001 20Z" stroke="#52506E" strokeWidth="2" strokeMiterlimit="10"/>
      <path d="M19.4266 7.24215C20.3206 6.99026 21.2582 6.93287 22.1763 7.07386C23.0944 7.21486 23.9716 7.55095 24.7488 8.0595C25.526 8.56805 26.1853 9.23726 26.6821 10.022C27.1789 10.8068 27.5018 11.689 27.629 12.6091C27.7562 13.5291 27.6848 14.4658 27.4195 15.3559C27.1542 16.2461 26.7013 17.069 26.0911 17.7694C25.481 18.4697 24.7279 19.0312 23.8825 19.416C23.0371 19.8008 22.1191 19.9999 21.1903 20" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.99951 24.6746C3.01468 23.2306 4.36238 22.052 5.92882 21.2384C7.49527 20.4248 9.23448 20.0001 10.9996 20C12.7648 19.9999 14.504 20.4246 16.0705 21.238C17.637 22.0515 18.9848 23.23 20.0001 24.6739" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.1902 20C22.9555 19.9987 24.6952 20.4228 26.2618 21.2364C27.8284 22.05 29.176 23.2291 30.1903 24.6739" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function NewFacilityIcon(props) {
  return (
    <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32">
      <path d="M27 27V14.4424C27 14.303 26.9709 14.1652 26.9145 14.0378C26.8582 13.9104 26.7758 13.7962 26.6727 13.7024L16.672 4.61054C16.4879 4.44318 16.2481 4.35046 15.9993 4.35046C15.7505 4.35047 15.5106 4.44322 15.3266 4.61058L5.32726 13.7024C5.22418 13.7962 5.14183 13.9104 5.08547 14.0378C5.02911 14.1652 5 14.303 5 14.4423V27" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 27H30" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.9993 26.9989V19.9989C18.9993 19.7337 18.8939 19.4793 18.7064 19.2918C18.5188 19.1043 18.2645 18.9989 17.9993 18.9989H13.9993C13.7341 18.9989 13.4797 19.1043 13.2922 19.2918C13.1046 19.4793 12.9993 19.7337 12.9993 19.9989V26.9989" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function NewPropertyIcon(props) {
  return (
    <SvgIcon {...props} width="26" height="28" viewBox="0 0 26 28">
      <path d="M1 20L13 27L25 20M1 14L13 21L25 14M1 8L13 15L25 8L13 1L1 8Z" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function NewServiceIcon(props) {
  return (
    <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32">
      <path d="M16 13.5C18.7614 13.5 21 11.2614 21 8.5C21 5.73858 18.7614 3.5 16 3.5C13.2386 3.5 11 5.73858 11 8.5C11 11.2614 13.2386 13.5 16 13.5Z" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.5 26.5C26.2614 26.5 28.5 24.2614 28.5 21.5C28.5 18.7386 26.2614 16.5 23.5 16.5C20.7386 16.5 18.5 18.7386 18.5 21.5C18.5 24.2614 20.7386 26.5 23.5 26.5Z" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 26.5C11.2614 26.5 13.5 24.2614 13.5 21.5C13.5 18.7386 11.2614 16.5 8.5 16.5C5.73858 16.5 3.5 18.7386 3.5 21.5C3.5 24.2614 5.73858 26.5 8.5 26.5Z" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function NewWorkOrderIcon(props) {
  return (
    <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32">
      <path d="M27.9393 7H4.06066C3.47487 7 3 7.47487 3 8.06066V23.9393C3 24.5251 3.47487 25 4.06066 25H27.9393C28.5251 25 29 24.5251 29 23.9393V8.06066C29 7.47487 28.5251 7 27.9393 7Z" stroke="#52506E" strokeWidth="2.12132" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 16H25" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 12H25" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 20H8" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20H20" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 20H25" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}

function DemandNoticeIcon(props) {
  return (
    <SvgIcon {...props} width="32" height="32" viewBox="0 0 32 32">
      <path d="M4 12V25C4 25.2652 4.10536 25.5196 4.29289 25.7071C4.48043 25.8946 4.73478 26 5 26H27C27.2652 26 27.5196 25.8946 27.7071 25.7071C27.8946 25.5196 28 25.2652 28 25V12L16 4L4 12Z" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.8182 19L4.30835 25.7174" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27.6918 25.7175L18.1818 19" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 12L18.1819 19H13.8181L4 12" stroke="#52506E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </SvgIcon>
  );
}



const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));


const SidebarNav = props => {
  const { pages, onOpen, onClose } = props;

  const classes = useStyles();
  let history = useHistory();
  const loc = useLocation();

  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('userDetails');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuData, setMenuData] = useState([]);
//  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('spfmtoken');
      localStorage.removeItem('provider');
      localStorage.removeItem('tenantId');
      localStorage.removeItem('userId');
      localStorage.removeItem('userDetails');
    }
    history.push('/signin');
  }

  useEffect(() => {
    handleMenus();
   }, []);

   async function handleMenus() {
  //   console.log("User Data: " + JSON.stringify(userData.crxDetails));
      AXIOS.get(`http://132.145.58.252:8081/spaciofm/api/user-profiles/new-menu?id=twang15&segmentName=SPACIOS41826`)
      .then(response => {
        const res = response.data;
        console.log(res);
        //setEstates(res);
      })
      .catch(function (error) {
        console.log(error.response.status) // 401
        console.log(error.response.data.error)
      })
  }

  const handleOpenSubMenu = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

 const open = Boolean(anchorEl);

 const handleClickAway = () => {
   setAnchorEl(null);
 };

 const opneNewResident = () => {
   setAnchorEl(null);
   onOpen();
 }


  return (
      <div className={classes.root}>
        <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <Popper open={open} anchorEl={anchorEl} placement={'right-start'} transition>
           {({ TransitionProps }) => (
             <Fade {...TransitionProps} timeout={350}>
               <Paper>
                 <List component="nav" aria-label="main menu">
                   <ListItem
                     button
                     onClick={opneNewResident}
                     >
                     <ListItemIcon classes={{ root: classes.menuIconStyle }}>
                       <ResidentIcon fontSize="small" style={{ width: 13, height: 13, fill:'none', stroke:'#52506E', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }}/>
                     </ListItemIcon>
                     <ListItemText primary="New Resident" classes={{ primary: classes.menuTextStyle }}/>
                   </ListItem>
                   <ListItem button>
                     <ListItemIcon classes={{ root: classes.menuIconStyle }}>
                       <NewUserIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#52506E', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }}/>
                     </ListItemIcon>
                     <ListItemText primary="New User" classes={{ primary: classes.menuTextStyle }}/>
                   </ListItem>
                   <ListItem button>
                     <ListItemIcon classes={{ root: classes.menuIconStyle }}>
                       <NewFacilityIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#52506E', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }}/>
                     </ListItemIcon>
                     <ListItemText primary="New Facility/Estate" classes={{ primary: classes.menuTextStyle }}/>
                   </ListItem>
                   <ListItem button>
                     <ListItemIcon classes={{ root: classes.menuIconStyle }}>
                       <NewPropertyIcon fontSize="small" style={{ width: 16, height: 16, fill:'none', stroke:'#52506E', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }}/>
                     </ListItemIcon>
                     <ListItemText primary="New Property" classes={{ primary: classes.menuTextStyle }}/>
                   </ListItem>
                   <Divider />
                   <ListItem button>
                     <ListItemIcon classes={{ root: classes.menuIconStyle }}>
                       <NewServiceIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#52506E', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }}/>
                     </ListItemIcon>
                     <ListItemText primary="New Service" classes={{ primary: classes.menuTextStyle }}/>
                   </ListItem>
                   <Divider />
                   <ListItem button>
                     <ListItemIcon classes={{ root: classes.menuIconStyle }}>
                       <NewWorkOrderIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#52506E', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }}/>
                     </ListItemIcon>
                     <ListItemText primary="New Work Order" classes={{ primary: classes.menuTextStyle }}/>
                   </ListItem>
                   <Divider />
                   <ListItem button>
                     <ListItemIcon classes={{ root: classes.menuIconStyle }}>
                       <DemandNoticeIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#52506E', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }}/>
                     </ListItemIcon>
                     <ListItemText primary="Demand Notice" classes={{ primary: classes.menuTextStyle }}/>
                   </ListItem>
                 </List>
               </Paper>
             </Fade>
           )}
         </Popper>
       </ClickAwayListener>
        <Button
          fullWidth
          className={classes.actionSidebar}
          variant="contained"
          color="primary"
          startIcon={<AddIcon fontSize="small" style={{ marginLeft: 20, marginRight: '10%' }} />}
          onClick={handleOpenSubMenu}
          >
          New Order
        </Button>

        <List>
          {pages.map(page => (
            <ListItem
              className={classes.item}
              disableGutters
              key={page.title}
            >
               <Button
                 activeClassName={classes.active}
                 className={classes.button}
                 component={CustomRouterLink}
                 to={page.href}
               >
                 <div className={classes.icon}>{page.icon}</div>
                 {page.title}
               </Button>
            </ListItem>
          ))}
        </List>
        <Button
          className={classes.logout}
          variant="outline"
          onClick={handleLogout}
          >
          Log out
        </Button>
      </div>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

export default SidebarNav;
