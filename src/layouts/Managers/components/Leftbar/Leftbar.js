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

function OverviewIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27Z"/>
      <path d="M16 2.5V7.5"/>
      <path d="M2.5 16H7.5"/>
      <path d="M16 29.5V24.5"/>
      <path d="M29.5 16H24.5"/>
      <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z"/>
    </SvgIcon>
  );
}

function PaymentIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M12 7V25"/>
      <path d="M3 20.8988C2.99996 20.6684 3.07957 20.4451 3.22536 20.2667C3.37114 20.0883 3.57412 19.9658 3.7999 19.92C4.70332 19.7354 5.51527 19.2445 6.09839 18.5302C6.68151 17.8159 7 16.9221 7 16C7 15.0779 6.68151 14.1841 6.09839 13.4698C5.51527 12.7555 4.70332 12.2646 3.7999 12.08C3.57412 12.0342 3.37114 11.9117 3.22536 11.7333C3.07957 11.5549 2.99996 11.3316 3 11.1012V8C3 7.73478 3.10536 7.48043 3.29289 7.29289C3.48043 7.10536 3.73478 7 4 7H28C28.2652 7 28.5196 7.10536 28.7071 7.29289C28.8946 7.48043 29 7.73478 29 8V11.1012C29 11.3316 28.9204 11.5549 28.7746 11.7333C28.6289 11.9117 28.4259 12.0342 28.2001 12.08C27.2967 12.2646 26.4847 12.7555 25.9016 13.4698C25.3185 14.1841 25 15.0779 25 16C25 16.9221 25.3185 17.8159 25.9016 18.5302C26.4847 19.2445 27.2967 19.7354 28.2001 19.92C28.4259 19.9658 28.6289 20.0883 28.7746 20.2667C28.9204 20.4451 29 20.6684 29 20.8988V24C29 24.2652 28.8946 24.5196 28.7071 24.7071C28.5196 24.8946 28.2652 25 28 25H4C3.73478 25 3.48043 24.8946 3.29289 24.7071C3.10536 24.5196 3 24.2652 3 24V20.8988Z" />
    </SvgIcon>
  );
}

function DemandNoticeIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M4 12V25C4 25.2652 4.10536 25.5196 4.29289 25.7071C4.48043 25.8946 4.73478 26 5 26H27C27.2652 26 27.5196 25.8946 27.7071 25.7071C27.8946 25.5196 28 25.2652 28 25V12L16 4L4 12Z"/>
      <path d="M13.8182 19L4.30835 25.7174"/>
      <path d="M27.6919 25.7175L18.1819 19"/>
      <path d="M28 12L18.1819 19H13.8181L4 12"/>
    </SvgIcon>
  );
}

function ServicesIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M16 13.5C18.7614 13.5 21 11.2614 21 8.5C21 5.73858 18.7614 3.5 16 3.5C13.2386 3.5 11 5.73858 11 8.5C11 11.2614 13.2386 13.5 16 13.5Z"/>
      <path d="M23.5 26.5C26.2614 26.5 28.5 24.2614 28.5 21.5C28.5 18.7386 26.2614 16.5 23.5 16.5C20.7386 16.5 18.5 18.7386 18.5 21.5C18.5 24.2614 20.7386 26.5 23.5 26.5Z"/>
      <path d="M8.5 26.5C11.2614 26.5 13.5 24.2614 13.5 21.5C13.5 18.7386 11.2614 16.5 8.5 16.5C5.73858 16.5 3.5 18.7386 3.5 21.5C3.5 24.2614 5.73858 26.5 8.5 26.5Z"/>
    </SvgIcon>
  );
}

function VisitorsIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M21.0235 16.6819C20.6791 13.1087 17.5031 10.4911 13.9298 10.8355C10.3566 11.1799 7.73902 14.3559 8.08343 17.9292C8.42783 21.5024 11.6038 24.12 15.177 23.7756C18.7503 23.4312 21.3679 20.2552 21.0235 16.6819Z"/>
      <path d="M26.54 25.1926C25.0053 24.3207 23.7028 23.0923 22.7427 21.6111C21.7826 20.1299 21.1929 18.4395 21.0235 16.6825C20.8541 14.9255 21.1099 13.1536 21.7693 11.5163C22.4288 9.87892 23.4725 8.42429 24.8123 7.27517"/>
    </SvgIcon>
  );
}

function UsersIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M11 20C14.5899 20 17.5 17.0899 17.5 13.5C17.5 9.91015 14.5899 7 11 7C7.41015 7 4.5 9.91015 4.5 13.5C4.5 17.0899 7.41015 20 11 20Z"/>
      <path d="M19.4265 7.24215C20.3205 6.99026 21.2582 6.93287 22.1762 7.07386C23.0943 7.21486 23.9715 7.55095 24.7487 8.0595C25.526 8.56805 26.1852 9.23726 26.682 10.022C27.1789 10.8068 27.5018 11.689 27.629 12.6091C27.7562 13.5291 27.6847 14.4658 27.4194 15.3559C27.1541 16.2461 26.7012 17.069 26.0911 17.7694C25.481 18.4697 24.7278 19.0312 23.8825 19.416C23.0371 19.8008 22.119 19.9999 21.1902 20"/>
      <path d="M1.99951 24.6746C3.01468 23.2306 4.36238 22.052 5.92882 21.2384C7.49527 20.4248 9.23448 20.0001 10.9996 20C12.7648 19.9999 14.504 20.4246 16.0705 21.238C17.637 22.0515 18.9848 23.23 20.0001 24.6739"/>
      <path d="M21.1902 20C22.9555 19.9987 24.6951 20.4228 26.2617 21.2364C27.8284 22.05 29.1759 23.2291 30.1902 24.6739"/>
    </SvgIcon>
  );
}

function WorkOrdersIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M27.9393 7H4.06066C3.47487 7 3 7.47487 3 8.06066V23.9393C3 24.5251 3.47487 25 4.06066 25H27.9393C28.5251 25 29 24.5251 29 23.9393V8.06066C29 7.47487 28.5251 7 27.9393 7Z"/>
      <path d="M7 16H25"/>
      <path d="M7 12H25"/>
      <path d="M7 20H8"/>
      <path d="M12 20H20"/>
      <path d="M24 20H25"/>
    </SvgIcon>
  );
}

function EstatesIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M27 27.0001V14.4425C27 14.3031 26.9709 14.1653 26.9145 14.0379C26.8582 13.9105 26.7758 13.7963 26.6727 13.7025L16.672 4.61066C16.4879 4.44331 16.2481 4.35058 15.9993 4.35059C15.7505 4.35059 15.5106 4.44334 15.3266 4.6107L5.32726 13.7026C5.22418 13.7963 5.14183 13.9105 5.08547 14.0379C5.02911 14.1653 5 14.3031 5 14.4424V27.0001"/>
      <path d="M2 27H30" />
      <path d="M18.9993 26.999V19.999C18.9993 19.7338 18.8939 19.4795 18.7064 19.2919C18.5188 19.1044 18.2645 18.999 17.9993 18.999H13.9993C13.7341 18.999 13.4797 19.1044 13.2922 19.2919C13.1046 19.4795 12.9993 19.7338 12.9993 19.999V26.999"/>
    </SvgIcon>
  );
}

function MeetingsIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M16 2.5V7.5" />
      <path d="M2.5 16H7.5" />
      <path d="M16 29.5V24.5" />
      <path d="M29.5 16H24.5" />
      <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" />
    </SvgIcon>
  );
}

const Leftbar = props => {

  const classes = useStyles();

  const { onOpen, onClose } = props;

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
  */

  const pages = [
    {
      title: 'Overview',
      href: '/overview',
      icon: <OverviewIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Payment',
      href: '/fm-payments',
      icon: <PaymentIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Demand Notice',
      href: '/demand-notice',
      icon: <DemandNoticeIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeWidth:2 }} />
    },
    {
      title: 'Services',
      href: '/services',
      icon: <ServicesIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Visitors',
      href: '/fm-visitors',
      icon: <VisitorsIcon  fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <UsersIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Work Order',
      href: '/work-order',
      icon: <WorkOrdersIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Estate',
      href: '/estates',
      icon: <EstatesIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
    },
    {
      title: 'Meetings',
      href: '/meetings',
      icon: <MeetingsIcon fontSize="small" style={{ width: 18, height: 18, fill:'none', stroke:'#EFF1F3', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
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
    <div className={classes.drawer }>
      <div className={classes.leftCol}>
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
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );

};

Leftbar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

export default Leftbar;
