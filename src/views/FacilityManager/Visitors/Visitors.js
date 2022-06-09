import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { Overview, Logs, NewMeetingDialog } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    background: '#efefef'
  },
  grid: {
    minHeight: '100%',
    padding: 40
  },
  areaTitle: {
    fontSize: 18,
    color: theme.palette.secondary.dark,
    fontWeight: 600,
    marginBottom: 20
  },
  middleAreaTitle: {
    fontSize: 18,
    color: theme.palette.secondary.dark,
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 20
  }
}));

const Visitors = props => {

    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [meetingDetails, setMeetingDetails] = useState([]);


    const handleDialogOpen = () => {
      setOpenDialog(true);
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
    };

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          direction="column">
          <Grid
          item
          lg={12}>
            <Overview />
          </Grid>
          <Grid
            item
            lg={12}>
              <Logs handleDialogOpen={handleDialogOpen} setMeetingDetails={setMeetingDetails} meetingDetails={meetingDetails}/>
          </Grid>
        </Grid>
        <NewMeetingDialog
          onClose={handleDialogClose}
          onOpen={openDialog}
          meetingDetails={meetingDetails}
        />
      </div>
    );
}

export default Visitors;
