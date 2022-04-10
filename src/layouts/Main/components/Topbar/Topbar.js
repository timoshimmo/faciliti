import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Toolbar } from '@material-ui/core';


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
  }

  }));


  const Topbar = props => {

    const classes = useStyles();

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
              lg={12}
            >
              <Typography
                variant="h6"
                className={classes.txtresident}>Resident</Typography>
            </Grid>

          </Grid>
        </Toolbar>
    );

};

export default Topbar;
