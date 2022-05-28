import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Chip,
  Grid
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({

  chipStyle: {
    borderRadius: 3
  },
  chipSmallStyle: {
    height: 20
  },
  chipColorStyle: {
    backgroundColor: '#DDF0FF'
  },
  chipLabelStyle: {
    color: theme.palette.secondary.contrastText,
    fontSize: 11
  },
  deleteIconColorPrimary: {
    color: 'rgba(73, 73, 73, 0.15)',
  },
}));

const ChipComponent = props => {

  const classes = useStyles();

  const { setCategoryData, setCategoryList, categoryList } = props;


  const handleDeleteCategory = (categoryVal) => () => {
      setCategoryData((chips) => chips.filter((chip) => chip.key !== categoryVal.key));
      setCategoryList(categoryList => [...categoryList, categoryVal]);
  };

  return(
    <Grid item>
      <Chip
        label={props.obj.label}
        size="small"
        color="primary"
        classes={{ root: classes.chipStyle, colorPrimary: classes.chipColorStyle, labelSmall: classes.chipLabelStyle,
          sizeSmall: classes.chipSmallStyle, deleteIconColorPrimary: classes.deleteIconColorPrimary }}
        onDelete={handleDeleteCategory(props.obj)}
      />
    </Grid>
  );
}

export default ChipComponent;
