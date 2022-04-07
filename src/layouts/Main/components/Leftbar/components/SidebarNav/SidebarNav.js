import React, { forwardRef } from 'react';
import { NavLink as RouterLink, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
  root: {
    height: '80vh',
    position: 'relative',
    padding: theme.spacing(2),
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: '#ffffff',
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
    color: '#ffffff',
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
    marginBottom: 5,
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
   position: 'absolute',
   bottom: 0,
   width: 'calc(100% - 32px)'
  }
}));


const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));


const SidebarNav = props => {
  const { pages, onDialogOpen } = props;

  const classes = useStyles();
  let history = useHistory();
  const loc = useLocation();

  const handleLogout = () => {
    history.push('/signin');
  }

  const handleReload = () => {
    console.log("LOCATION: " + loc.pathname);
    if(loc.pathname === '/home') {
      window.location.reload(true);
    }
  }


  return (
    <div className={classes.root}>

        <Button
          fullWidth
          className={classes.actionSidebar}
          variant="contained"
          color="primary"
          startIcon={<AddIcon fontSize="small" style={{ marginLeft: 20, marginRight: '10%' }} />}
          onClick={onDialogOpen}
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
             {
               page.title === "Home" ?

               (
                 <Button
                   disableripple="true"
                   disabletouchripple="true"
                   activeClassName={classes.active}
                   className={classes.button}
                   component={CustomRouterLink}
                   to={page.href}
                   onClick={handleReload}
                 >
                   <div className={classes.icon}>{page.icon}</div>
                   {page.title}
                 </Button>
               )
               :
               (
                 <Button
                   activeClassName={classes.active}
                   className={classes.button}
                   component={CustomRouterLink}
                   to={page.href}
                 >
                   <div className={classes.icon}>{page.icon}</div>
                   {page.title}
                 </Button>
               )

             }

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
  onDialogOpen: PropTypes.func,
};

export default SidebarNav;
