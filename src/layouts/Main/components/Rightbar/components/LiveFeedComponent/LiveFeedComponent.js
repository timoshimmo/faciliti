import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  ListItem
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({

  listItem: {
    width: '100%'
   },
   cardroot: {
    width: '100%',
    maxWidth: '100%'
  },
  cardAction: {
    width: '100%'
  },
  liveFeedTitle: {
    fontWeight: 600,
    fontSize: 13,
    color: theme.palette.secondary.dark,
  },
  liveFeedSubTitle: {
    fontWeight: 400,
    fontSize: 11,
    color: theme.palette.text.primary
  }
}));

const LiveFeedComponent = props => {

  const { obj } = props;
  const classes = useStyles();

  return (

    <ListItem
        className={classes.listItem}
        disableripple="true"
        disabletouchripple="true"
        key={obj.id}
      >

        <Card className={classes.cardroot} elevation={1}>
          <CardActionArea className={classes.cardAction} >
              <CardContent>
                  <Typography
                    variant="body1"
                    className={classes.liveFeedTitle}
                  >
                    {obj.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.liveFeedSubTitle}
                  >
                    {obj.dateTime}
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      </ListItem>

  );

}

export default LiveFeedComponent;
