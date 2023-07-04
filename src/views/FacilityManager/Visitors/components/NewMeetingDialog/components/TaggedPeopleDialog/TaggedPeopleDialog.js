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
  DialogActions,
  List,
  Typography,
  SvgIcon,
  Grid,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { TaggedListComponent } from './components';
import AXIOS from '../../../../../../../util/webservices';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UserIcon(props) {
  return (
    <SvgIcon {...props} width="53" height="53" viewBox="0 0 53 53">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5 33.7273C21.1057 33.7273 16.8636 29.9387 16.8636 21.6818C16.8636 16.2752 20.6678 12.0455 26.5 12.0455C32.316 12.0455 36.1364 16.6747 36.1364 22.1636C36.1364 30.0645 31.8436 33.7273 26.5 33.7273ZM21.6818 21.6818C21.6818 27.1487 23.653 28.9091 26.5 28.9091C29.3372 28.9091 31.3182 27.2189 31.3182 22.1636C31.3182 19.1533 29.4286 16.8636 26.5 16.8636C23.4495 16.8636 21.6818 18.829 21.6818 21.6818Z" fill="#D8D8D8"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5 53C11.8645 53 0 41.1355 0 26.5C0 11.8645 11.8645 0 26.5 0C41.1355 0 53 11.8645 53 26.5C53 41.1355 41.1355 53 26.5 53ZM44.3261 38.8457C46.7571 35.3421 48.1818 31.0874 48.1818 26.5C48.1818 14.5255 38.4745 4.81818 26.5 4.81818C14.5255 4.81818 4.81818 14.5255 4.81818 26.5C4.81818 31.0874 6.24288 35.3421 8.67394 38.8457C11.3853 35.2644 17.7565 33.7273 26.5 33.7273C35.2435 33.7273 41.6148 35.2644 44.3261 38.8457ZM40.8695 42.7367C40.1644 40.2013 35.099 38.5455 26.5 38.5455C17.901 38.5455 12.8356 40.2013 12.1305 42.7367C15.9561 46.1249 20.9879 48.1818 26.5 48.1818C32.0121 48.1818 37.0439 46.1249 40.8695 42.7367Z" fill="#D8D8D8"/>
    </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  dialogtitleStyle: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #8692A6',
    borderRadius: 6,
    transition: theme.transitions.create(['background-color']),
    padding: '7px 25px',
    marginTop: 20,
    width: '80%',
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
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.lightBlue
  },
  titleStyle: {
    fontSize: 17,
    color: theme.palette.text.title,
    fontWeight: 600
  },
  subtitleStyle: {
    fontSize: 13,
    color: theme.palette.text.title,
    fontWeight: 400
  },
  peopleList: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonCreateStyle: {
    backgroundColor: '#1BBC35',
    borderRadius: 4,
    textTransform: "capitalize",
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 8,
    "&:hover": {
      backgroundColor: 'rgba(27, 188, 53, 0.8)',
    }
  },
  buttonCancelStyle: {
    borderRadius: 4,
    textTransform: "capitalize",
    backgroundColor: 'transparent',
    fontSize: 12
  },

  buttonAllStyle: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    textTransform: "capitalize",
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 8,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    }
  },
  dialogActionAreaBody: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  dialogButtonArea: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}));

const TaggedPeopleDialog = props => {

  const classes = useStyles();

  const { onOpen, onClose, peopleList, setAvatarList, setContactList, contactList } = props;

  const [, setSearchQuery] = useState(false);
  const [btnText, setBtnText] = useState('Invite');
  const [liveTaggedList, setLiveTaggedList] = useState([]);

  const handleChange = event => {
    event.persist();
    setSearchQuery(event.target.value);
    /*const obj = {
      segment : "INJREAM26606",
      userId : "JAGG66",
      index : 0,
      range : 10,
      name : "et"
    };

    AXIOS.get('http://132.145.58.252:8081/spaciofm/api/contacts/search', { params: obj })
    .then(response => {
      const res = response.data;
    //  console.log(res);
    })
    .catch(function (error) {
      console.log(error.response);
      console.log(error.message);
    })
    */

  };

  const handleInvite = () => {
    setAvatarList(liveTaggedList);
    onClose();
  }

  const handleSetText = (fullText) => {
    setBtnText(fullText);
  }

  const taggedPeopleListItems = () => {
      return peopleList.map((people, i) => {
          return <TaggedListComponent obj={people} handleSetText={handleSetText} setLiveTaggedList={setLiveTaggedList}
            liveTaggedList={liveTaggedList} setContactList={setContactList} contactList={contactList}/>;
      })
  }

  /*
  <Button
    variant="contained"
    classes={{ root: classes.buttonAllStyle }}
    onClick={handleInvite}
    >
    Select All
  </Button>
  */


  return (

    <Dialog fullWidth maxWidth="xs" onClose={onClose} aria-labelledby="category-dialog" open={onOpen} TransitionComponent={Transition}>
      <DialogTitle disableTypography className={classes.dialogtitleStyle}>
          <UserIcon style={{ marginBottom: 10, fontSize: 50 }}/>
          <Typography
            variant="h4"
            className={classes.titleStyle}
          >
            Tag people to this meeting
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitleStyle}
          >
            Invite Exco’s and facility managers or residents
          </Typography>
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
          <List component="nav" aria-label="tag people list" className={classes.peopleList}>
            {taggedPeopleListItems()}
          </List>
       </DialogContent>
       <DialogActions>
          <Grid container alignItems='center' className={classes.dialogActionAreaBody}>
            <Grid
              item
              lg={12}
              className={classes.dialogButtonArea}
              >
              <Button
                variant="outlined"
                color="secondary"
                classes={{ root: classes.buttonCancelStyle }}
                onClick={onClose}
                >
                Cancel
            </Button>
            <Button
              variant="contained"
              classes={{ root: classes.buttonCreateStyle }}
              onClick={handleInvite}
              >
              {btnText}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

TaggedPeopleDialog.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.bool,
};

export default TaggedPeopleDialog;
