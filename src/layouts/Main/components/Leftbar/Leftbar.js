import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import { SidebarNav } from './components';

/*
[theme.breakpoints.up('lg')]: {
  marginTop: 64,
  height: 'calc(100% - 64px)'
}

*/

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: '#52506E',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  leftCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65
  },
  badgeStyle: {
    backgroundColor: '#2688FB'
  }
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 23.6 26">
      <g transform="translate(-6.5 -4)">
        <path d="M7.5,13.4,18.3,5l10.8,8.4V26.6A2.4,2.4,0,0,1,26.7,29H9.9a2.4,2.4,0,0,1-2.4-2.4h0Z" transform="translate(0)"/>
        <path d="M22.5,42V30h7.2V42" transform="translate(-7.8 -13)"/>
      </g>
    </SvgIcon>
  );
}
//fill:#010e1c;stroke:#010e1c;stroke-width:0.5px;

function MessageIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 25 24">
      <g transform="translate(0.25 0.25)">
        <path d="M20.258,0H4.2A4.192,4.192,0,0,0,0,4.2v9.938a4.192,4.192,0,0,0,4.2,4.2h8.142l7.377,5.466c.5.382.841.153.764-.459l-.612-5.007,1.529-.153a4.2,4.2,0,0,0,3.058-4.052V4.2A4.192,4.192,0,0,0,20.258,0Zm2.676,14.143a2.659,2.659,0,0,1-2.676,2.676h-2.1l.535,4.319-5.848-4.319H4.2a2.659,2.659,0,0,1-2.676-2.676V4.2A2.659,2.659,0,0,1,4.2,1.529H20.258A2.659,2.659,0,0,1,22.934,4.2Z"/>
        <circle cx="1.529" cy="1.529" r="1.529" transform="translate(6.116 8.027)"/>
        <circle cx="1.529" cy="1.529" r="1.529" transform="translate(10.703 8.027)"/>
        <circle cx="1.529" cy="1.529" r="1.529" transform="translate(15.289 8.027)"/>
      </g>
    </SvgIcon>
  );
}

function NotificationsIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <g transform="translate(-2 -1)">
        <path d="M21,9.2a7.2,7.2,0,1,0-14.4,0C6.6,17.6,3,20,3,20H24.6S21,17.6,21,9.2" transform="translate(0)"/>
        <path d="M14.423,21a2.4,2.4,0,0,1-4.153,0" transform="translate(1.456 3.804)"/>
      </g>
    </SvgIcon>
  );
}

function BookmarksIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
        <path d="M31.167,31.5l-9.333-6.667L12.5,31.5V10.167A2.667,2.667,0,0,1,15.167,7.5H28.5a2.667,2.667,0,0,1,2.667,2.667h0Z" transform="translate(-11.5 -6.5)"/>
    </SvgIcon>
  );
}

function ProfileIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <g transform="translate(-9 -6.5)">
        <path d="M31.333,45.5V42.833A5.333,5.333,0,0,0,26,37.5H15.333A5.333,5.333,0,0,0,10,42.833h0V45.5" transform="translate(0 -14)"/>
        <path d="M30.667,12.833A5.333,5.333,0,1,1,25.333,7.5,5.333,5.333,0,0,1,30.667,12.833Z" transform="translate(-4.667)"/>
      </g>
    </SvgIcon>
  );
}

const Leftbar = props => {

  const { onDialogOpen } = props;
  const classes = useStyles();

/*  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }


  {
    title: 'Home',
    href: '/home',
    icon: <HomeIcon fontSize="small" style={{ fill:'none', stroke:'#010e1c', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
  },

  {
      title: 'Message',
      href: '/notifications',
      icon: <MessageIcon fontSize="small" style={{ width: 15, height: 15, strokeWidth:1 }} />
    },

    {
      title: 'Maintenance',
      href: '/maintenance',
      icon: <BookmarksIcon fontSize="small" style={{ width: 15, height: 15, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
  */

  const pages = [
    {
      title: 'Overview',
      href: '/home',
      icon: <HomeIcon fontSize="small" style={{ width: 15, height: 15, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Payment',
      href: '/payment',
      icon: <NotificationsIcon fontSize="small" style={{ width: 15, height: 15, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Orders',
      href: '/orders',
      icon: <BookmarksIcon fontSize="small" style={{ width: 15, height: 15, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Visitors',
      href: '/visitors',
      icon: <ProfileIcon  fontSize="small" style={{ width: 15, height: 15, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    
  ];

  /*
  <Drawer
    anchor="left"
    classes={{ paper: classes.drawer }}
    onClose={onClose}
    open={open}
    variant={variant}
  >
  */

  return (
    <div
      className={classes.drawer }
    >

        <div
          className={classes.leftCol}
        >

          <RouterLink to="/home">
            <img
              alt="Logo"
              src="/images/spacio_light_logo.png"
              height="40"
              width="135"
            />
          </RouterLink>
        </div>
        <SidebarNav
          pages={pages}
          onDialogOpen={onDialogOpen}
        />
    </div>
  );

};

Leftbar.propTypes = {
  className: PropTypes.string,
  onDialogOpen: PropTypes.func,
};

export default Leftbar;
