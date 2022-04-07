import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  ListItemAvatar ,
  Avatar,
  Chip,
  Typography,
  ListItemSecondaryAction,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({

  listItemRootStyle: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  chipStyleExco: {
    borderRadius: 3,
    backgroundColor: 'rgba(250, 165, 21, 0.15)',
    height: 30
  },
  chipLabelStyleExco: {
    color: '#FAA515',
    fontSize: 11
  },
  chipStyleFM: {
    borderRadius: 3,
    backgroundColor: 'rgba(5, 0, 255, 0.15)',
    height: 30
  },
  chipLabelStyleFM: {
    color: '#0500FF',
    fontSize: 11
  },
  selectedStyles: {
    backgroundColor: 'rgba(5, 0, 255, 0.15)',
  }
}));

const TaggedListComponent = props => {

  const classes = useStyles();

  const { handleSetText, setLiveTaggedList, liveTaggedList } = props;

  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      setLiveTaggedList(newChecked);
    } else {
      newChecked.splice(currentIndex, 1);
      liveTaggedList.splice(currentIndex, 1);
    }
    let num = liveTaggedList.length + 1;
    handleSetText('Invite ' + num.toString() + ' people');
    setChecked(newChecked);
  };

  return(
      <ListItem
        role="checkbox"
        divider
        selected={checked.indexOf(props.obj) !== -1}
        onClick={handleToggle(props.obj)}
        key={props.obj.key}
        classes={{ root: classes.listItemRootStyle, selected: classes.selectedStyles }}
        >
        <ListItemAvatar>
         <Avatar alt={props.obj.name} src={props.obj.avatar} />
       </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              sx={{ color: '#696F79' }}
              component="span"
              variant="body2"
            >
              {props.obj.name}
            </Typography>

          }
          secondary={
              <Typography
                sx={{ color: '#8692A6' }}
                component="p"
                variant="body2"
              >
                {props.obj.email}
              </Typography>
          }
          />
        <ListItemSecondaryAction>
          {props.obj.role === "Exco" ?
            <Chip
              label={props.obj.role}
              classes={{ root: classes.chipStyleExco, label: classes.chipLabelStyleExco }}
              />
            :
            <Chip
              label={props.obj.role}
              classes={{ root: classes.chipStyleFM, label: classes.chipLabelStyleFM  }}
              />
            }
        </ListItemSecondaryAction>
      </ListItem>
  );
}

export default TaggedListComponent;
