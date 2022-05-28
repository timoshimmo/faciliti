import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Badge,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
  smallAvatar: {
    width: 25,
    height: 25,
    border: '1px solid #fff',
    marginLeft: 3,
    backgroundColor: '#bdbdbd'
},
btnIconStyle: {
  backgroundColor: '#FF0000',
  "&:hover":{
    backgroundColor: 'rgba(188, 66, 27, 0.8)',
    opacity: '1 !important'
  }
},
}));

const TaggedPeopleComponent = props => {

  const classes = useStyles();

  const { setAvatarList, obj, key } = props;

  const handleDeletePerson = (personToDelete) => () => {
      setAvatarList((people) => people.filter((person) => person.key !== personToDelete.key));
  };

  return (
    <Badge
        key={key}
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          <IconButton
            classes={{ root: classes.btnIconStyle }}
            size="small"
            onClick={handleDeletePerson(props.obj)}>
            <CloseIcon style={{ fontSize: 6, color: '#ffffff' }} />
          </IconButton>
        }
      >
        <Avatar alt={obj.name} src={obj.avatar} className={classes.smallAvatar} />
      </Badge>
  );


}

export default TaggedPeopleComponent;
