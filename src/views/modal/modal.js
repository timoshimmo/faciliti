import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide
} from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: 0
  },
  dialogContentStyle: {
    paddingBottom: theme.spacing(1),
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    '&:first-child': {
      padding: 0
    }
  },
}));


const Modal = ({ open, onClose, children }: any) => {

  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      aria-labelledby="order-dialog"
      open={open}
      TransitionComponent={Transition}>
       <DialogContent className={classes.dialogContentStyle}>
          {children}
       </DialogContent>
    </Dialog>
  );
}

export default Modal;
