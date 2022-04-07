import React from 'react';
import {
  ListItem,
  ListItemText
} from '@material-ui/core';

const EstateListComponent = props => {

  const { setCategoryList, categoryData, setCategoryData } = props;

  const handleAddCategory = (categoryVal) => () => {
      setCategoryData(categoryData => [...categoryData, categoryVal]);
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

export default EstateListComponent;
