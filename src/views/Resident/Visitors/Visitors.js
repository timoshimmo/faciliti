import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { Overview, Logs, NewVisitorDialog } from './components';

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
    const [visitorDetails, setVisitorDetails] = useState([]);

    const [edit, setEdit] = useState(false);

    const handleDialogOpen = () => {
      setOpenDialog(true);
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
      setEdit(false);
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
              <Typography
                variant="h4"
                gutterBottom
                className={classes.areaTitle}
              >
                Overview
              </Typography>
          </Grid>
          <Grid
          item
          lg={12}>
            <Overview handleDialogOpen={handleDialogOpen} setEdit={setEdit} />
          </Grid>
          <Grid
            item
            lg={12}>
              <Typography
                variant="h4"
                gutterBottom
                className={classes.middleAreaTitle}
              >
                Visitor Log
              </Typography>
            </Grid>
            <Grid
              item
              lg={12}>
                <Logs handleDialogOpen={handleDialogOpen} setVisitorDetails={setVisitorDetails} visitorDetails={visitorDetails} setEdit={setEdit}/>
              </Grid>
        </Grid>
        <NewVisitorDialog
          onClose={handleDialogClose}
          onOpen={openDialog}
          visitorDetails={visitorDetails}
          edit={edit}
        />
      </div>
    );
}

export default Visitors;
