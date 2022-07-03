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

  const { handleSetText, setLiveTaggedList, liveTaggedList, setContactList, contactList } = props;

  const [checked, setChecked] = useState([0]);

  let test = 0;

  const handleToggle = (value) => () => {
    //props.obj.map(function (obj) { return obj.name; }).indexOf(studentNameToSearch);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      setLiveTaggedList([...liveTaggedList, value]);
      let num = liveTaggedList.length + 1;
  //    console.log("XRI:" + JSON.stringify(value.xri));
      setContactList([...contactList, value.xri]);
      handleSetText('Invite ' + num.toString() + ' attendee(s)');
    } else {
      newChecked.splice(currentIndex, 1);
      setLiveTaggedList(liveTaggedList.filter(e => e !== value));
      let num = liveTaggedList.length - 1;
  //    console.log("XRI:" + JSON.stringify(value.xri));
    //  setContactList([...contactList, value.xri]);
      setContactList(contactList.filter(e => e !== value.xri));
      handleSetText('Invite ' + num.toString() + ' attendee(s)');
    }

    setChecked(newChecked);
  };

  return(
      <ListItem
        role={'checkbox'}
        dense
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
          {props.obj.accountCategories[0] === 24 ?
            <Chip
              label="Resident"
              classes={{ root: classes.chipStyleExco, label: classes.chipLabelStyleExco }}
              />
            :
            <Chip
              label="Facility Manager"
              classes={{ root: classes.chipStyleFM, label: classes.chipLabelStyleFM  }}
              />
            }
        </ListItemSecondaryAction>
      </ListItem>
  );
}

export default TaggedListComponent;
