import React from 'react';
import {
  ListItem,
  ListItemText
} from '@material-ui/core';

const CategoryListComponent = props => {

  const { setCategoryList, categoryData, setCategoryData, setSelectedCategory, selectedCategory } = props;

  const handleAddCategory = (categoryVal) => () => {
      setCategoryData(categoryData => [...categoryData, categoryVal]);
      setSelectedCategory(selectedCategory => [...selectedCategory, categoryVal.label]);
      setCategoryList((categories) => categories.filter((category) => category.key !== categoryVal.key));
  };

  return(
      <ListItem
        button
        divider
        onClick={handleAddCategory(props.obj)}
        key={props.obj.key}
        >
        <ListItemText primary={props.obj.label}/>
      </ListItem>
  );
}

export default CategoryListComponent;
