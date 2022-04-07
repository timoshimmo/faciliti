import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  InputAdornment,
  List
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { CategoryListComponent } from './components';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  dialogtitleStyle: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #8692A6',
    borderRadius: 6,
    transition: theme.transitions.create(['background-color']),
    padding: '7px 25px',
    marginTop: 5,
    '&$focused': {
      border: '1px solid #1565D8',
      backgroundrColor: '#FFFFFF',
    },
    '&:hover': {
      border: '1px solid #1565D8',
      backgroundrColor: '#FFFFFF',
   },
  },
  dialogContentStyle: {
    paddingBottom: theme.spacing(1),
  },
}));

const CategoryDialog = props => {

  const classes = useStyles();

  const { onOpen, onClose, categoryData, setCategoryData, categoryList, setCategoryList } = props;

  const [searchQuery, setSearchQuery] = useState(false);

  const handleChange = event => {
    event.persist();
    setSearchQuery(event.target.value);
  };

  const categoryItems = () => {
      return categoryList.map((category, i) => {
          return <CategoryListComponent obj={category} idx={i} setCategoryList={setCategoryList} categoryData={categoryData} setCategoryData={setCategoryData} />;
      })
  }


  return (

    <Dialog fullWidth maxWidth="xs" onClose={onClose} aria-labelledby="category-dialog" open={onOpen} TransitionComponent={Transition}>
      <DialogTitle disableTypography className={classes.dialogtitleStyle}>
      <TextField
          fullWidth
          id="search-category"
          className={classes.textField}
          name="searchCategory"
          type="text"
          placeholder="Search"
          onChange={handleChange}
          InputProps={{
            disableUnderline: true,
            style: {fontSize: 12},
            startAdornment: <InputAdornment position="start">
              <SearchIcon style={{ fontSize: 16, color: '#8692A6' }} />
            </InputAdornment>
          }}
        />
       </DialogTitle>
       <DialogContent className={classes.dialogContentStyle}>
          <List component="nav" aria-label="category list">
            {categoryItems()}
          </List>
       </DialogContent>
    </Dialog>
  );
}

CategoryDialog.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.bool,
};

export default CategoryDialog;
