import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  List
} from '@material-ui/core';
import { RightTopbar, LiveFeedComponent } from './components';

function createLiveFeed(id, title, dateTime) {
  return { id, title, dateTime};
}

const liveFeeds = [
  createLiveFeed(1, 'Fire Drill on 17th & 18th', '12/11/2021, 12:35 pm'),
  createLiveFeed(2, '4 new estate shuttle', '12/11/2021, 12:35 pm'),
  createLiveFeed(3, 'Call Mr. Tok about the plumbing issue', '12/11/2021, 12:35 pm'),
  createLiveFeed(4, '4 new estate shuttle', '12/11/2021, 12:35 pm'),
  createLiveFeed(5, 'Call Mr. Tobi about water supply', '12/11/2021, 12:35 pm'),
  createLiveFeed(6, '4 new estate shuttle', '12/11/2021, 12:35 pm'),
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    maxHeight: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'sticky',
    right: 0,
    top: 0,
  },
  rightContentArea: {
    height: '90%',
    overflowY: 'scroll',
    boxSizing: 'content-box',
    marginRight: -30,
    paddingRight: 30,
    paddingTop: 10
  },
  calendarArea: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  livefeed: {
    maxHeight: '100%',
    paddingTop: theme.spacing(2),
  },
  liveFeedTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: theme.palette.secondary.dark,
    marginLeft: theme.spacing(2)
  },
  livefeedListView: {
    maxHeight: '100%',
    paddingBottom: theme.spacing(2),
    marginRight: -20
  }
}));


/*
<div className={classes.calendarArea}>
  <CalendarComponent />
</div>

*/
const Rightbar = props => {

    const classes = useStyles();

  //  const [liveFeeds, setLiveFeeds] = useState([]);
  //  const [loading, setLoading] = useState(false);
  //  const [serverError, setServerError] = useState(null);

    const livefeedList = () => {
        return liveFeeds.map((object) => {
            return <LiveFeedComponent obj={object}/>;
        })
    }

    return (
      <div className={classes.root}>
        <RightTopbar />

        <div className={classes.rightContentArea}>
          <div className={classes.livefeed}>
            <Typography
              variant="h6"
              className={classes.liveFeedTitle}
            >
              Live Feed
            </Typography>
            <List className={classes.livefeedListView}>
              {livefeedList()}
            </List>
          </div>
        </div>
      </div>
    );
};

Rightbar.propTypes = {
  className: PropTypes.string,
};

export default Rightbar;
