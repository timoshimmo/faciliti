import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';
import { Register } from './components'

function TabContainer(props) {
  const { children, value, index } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      style={{ padding: 8 * 5, width: '100%' }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
    height: '100vh',
    maxWidth: '100%',
    backgroundImage: 'url(/images/onboarding_background.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  grid: {
    maxHeight: '100vh',

  },
  formArea: {
    height: '100%'
  },
  formPaper: {
    width: '100%',
    maxHeight: '98%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
  },
  gridItem: {
    width: '100%',
    maxHeight: '100vh',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 70,
    paddingRight: 70,
  },
}));

const Onboarding = props => {
  const classes = useStyles();
  //let history = useHistory();

  const [value, setValue] = useState(0);

  const handleOpenRegister = () => {
    setValue(1);
  }

  const handleOpenSelectUser = () => {
    setValue(0);
  }

  /*
  <TabContainer value={value} index={0}>
      <SelectUser register={handleOpenRegister} />
  </TabContainer>
  <TabContainer value={value} index={1}>

  </TabContainer>
  */


    return (

      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
            <Grid
              item
              lg={7}
              className={classes.gridItem}
            >

            </Grid>
            <Grid
              item
              lg={5}
              xs={12}
              className={classes.gridItem}
            >
              <div className={classes.formArea}>
                <Paper className={classes.formPaper} elevation={1} square>
                  <Register />
                </Paper>
              </div>
            </Grid>
        </Grid>
      </div>
    );

};

export default withRouter(Onboarding);
