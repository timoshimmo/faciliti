import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Grid, Typography, Toolbar, IconButton, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AXIOS from '../../../../util/webservices';

const useStyles = makeStyles(theme => ({

  toolbar: {
    borderBottom: '1px solid #F2F4F7',
    width: '100%',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 1
  },
  grid: {
    height: '100%',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 15
  },
  txtresident: {
    fontSize: 50,
    fontWeight: 800,
    color: '#F5F5F5'
  },
  rightCol: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  topIconButton: {
    padding: 5,
    backgroundColor: 'rgba(27, 117, 188, 0.15)',
    borderRadius: 4,
    marginRight: 20
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
    marginRight: 20
  },
  selectStyle: {
    backgroundColor: '#EDF7FF',
    border: '1px solid #EDF7FF',
    borderRadius: 6,
    transition: theme.transitions.create(['background-color']),
    padding: 10,
    color: '#1C4799',
    fontWeight: 600,
    marginTop: 5,
    '&:focus': {
      border: '1px solid #EDF7FF',
      backgroundColor: '#EDF7FF',
      borderRadius: 6,
    },
    '&:hover': {
      border: '1px solid #EDF7FF',
      backgroundColor: '#EDF7FF',
      borderRadius: 6,
   },
  },

  selectParent: {
    fontSize: 13,
    '&::before': {
      borderBottom: '1px solid transparent !important',
   },
   '&::after': {
     borderBottom: '1px solid transparent !important',
  },
 },

 menuDropStyle: {
   top: '60px !important'
 },

formComponent: {
  width: 160,
  fontSize: 13
},

}));

  function NotificationIcon(props) {
    return (
      <SvgIcon {...props} width="30" height="30" viewBox="0 0 30 30">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 15C18.3579 15 15 11.6421 15 7.5C15 3.35787 18.3579 0 22.5 0C26.6421 0 30 3.35787 30 7.5C30 11.6421 26.6421 15 22.5 15ZM27 7.5C27 9.98528 24.9853 12 22.5 12C20.0147 12 18 9.98528 18 7.5C18 5.01472 20.0147 3 22.5 3C24.9853 3 27 5.01472 27 7.5Z" fill="#1B75BC"/>
          <path d="M24 16.5H27V27C27 28.6569 25.6569 30 24 30H3C1.34315 30 0 28.6569 0 27V6C0 4.34315 1.34315 3 3 3H13.5V6H3V27H24V16.5Z" fill="#1B75BC"/>
      </SvgIcon>
    );
  }


  const Topbar = props => {

    const classes = useStyles();

    //{userData.crxDetails.fullName}

    let userData = {};
    if (typeof localStorage !== 'undefined') {
        const user = localStorage.getItem('userDetails');
        if(user !== null) {
          const data = JSON.parse(user);
          userData = data;
        }
    }

    const [activeEstate, setActiveEstate] = useState([]);
    const [selectedEstate, setSelectedEstate] = useState('');

    const handleChangeEstate = (event) => {
     setSelectedEstate(event.target.value);
  //   console.log("ESTATE VALUE: ", event.target.value);
     const userid = localStorage.getItem('userId');

     AXIOS.put(`http://132.145.58.252:8081/spaciofm/api/user-profiles/current-estate/`,
       {
         userId: userid,
         "contact-id": userData.crxDetails.contactXRI,
      })
     .then(response => {
       const res = response.data;
    //   console.log(res);

     })
     .catch(function (error) {
       console.log(error.response);
       console.log(error.message);
     })
   };



   useEffect(() => {
     handleEstates();
    }, []);

    async function handleEstates() {
      //console.log("User Data: " + JSON.stringify(userData.crxDetails));
       AXIOS.get(`http://132.145.58.252:8081/spaciofm/api/estates/search?index=0&range=5&estate-name=INJ`)
       .then(response => {
         const res = response.data;
      //   console.log(res);
         setActiveEstate(res);
         setSelectedEstate(res[0].uri);
       })
       .catch(function (error) {
         console.log(error.response);
         console.log(error.message);
       })
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
          >
            <Grid
              item
              lg={6}
            >
              <Typography
                variant="h6"
                className={classes.txtresident}>Facility Manager</Typography>
            </Grid>
            <Grid
              item
              lg={6}
              className={classes.rightCol}
            >
              <IconButton
                disableRipple={true}
                disableFocusRipple={true}
                color="primary"
                className={classes.topIconButton}>
                  <NotificationIcon fontSize="small" style={{ width: 17, height: 17, fill: 'none' }} />
              </IconButton>
              <Button
                className={classes.typoUsername}
                startIcon={<AccountCircleIcon fontSize="small" style={{ marginRight: '10%' }} />}
              >

                {userData.crxDetails.fullName}
              </Button>
              <FormControl className={classes.formComponent}>
                 <Select
                   className={classes.selectParent}
                   onChange={handleChangeEstate}
                   MenuProps={{ classes: { paper: classes.menuDropStyle } }}
                   InputProps={{
                     disableUnderline: true,
                     style: {fontSize: 12}
                   }}
                   classes={{
                     standard: classes.selectStyle
                   }}
                 >
                  {
                    activeEstate.map((row, index) => (
                      <MenuItem value={row.uri}>{row.name}</MenuItem>
                    ))
                  }
                 </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
    );

};

export default Topbar;
