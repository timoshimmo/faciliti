import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Divider
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  gridAction: {
    paddingTop: 5,
    paddingBottom: 20,
 },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    height: 260
  },
  buildingIconArea: {
    backgroundColor: theme.palette.primary.light,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  maintenanceIconArea: {
    backgroundColor: theme.palette.error.veryLight,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  paymentsIconArea: {
    backgroundColor: theme.palette.success.veryLight,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  visitorsIconArea: {
    backgroundColor: theme.palette.background.light,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  actionTitle: {
    fontWeight: 800,
    fontSize: 15,
    color: theme.palette.text.primary
  },
  actionSubtitle: {
    fontSize: 11,
    lineHeight: 1.3,
    color: theme.palette.text.secondary,
  },
  actionSubtitle2: {
    fontSize: 11,
    lineHeight: 1.3,
    color: theme.palette.primary.main,
  },
  cardContentArea: {
    width: '100%',
  },
  detailsArea: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  detailsStyle: {
    fontSize: 12,
    color: theme.palette.card.blue,
    textTransform: 'none',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
    borderRadius: 4,
  },
  contentRow: {
    paddingTop: 15,
    paddingBottom: 15
  },
  contentTitle: {
    fontWeight: 600,
    fontSize: 13,
    color: theme.palette.text.content
  },
  contentGreen: {
    backgroundColor: 'rgba(2, 161, 18, 0.15)',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.palette.success.main
  },
  contentBlue: {
    backgroundColor: 'rgba(67, 171, 240, 0.15)',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.palette.card.blue
  },
  contentRed: {
    backgroundColor: 'rgba(255, 102, 0, 0.15)',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.palette.card.orange
  },
  revenueContent: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  revenueText: {
    fontWeight: 400,
    fontSize: 26,
    color: '#4D4D4D',
    textAlign: 'center'
  },
  revenueGrowth: {
    fontWeight: 600,
    fontSize: 13,
    color: '#02A112',
    textAlign: 'center'
  }
}));


const OverviewArea = props => {

  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={1}>
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.actionButton} elevation={1}>
          <CardContent className={classes.cardContentArea}>
            <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={6}>
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.actionTitle}>
                    Revenue
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={6}
                  className={classes.detailsArea}
                  >
                  <Button
                    className={classes.detailsStyle}
                  >
                    Details
                  </Button>
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" justifyContent="center" className={classes.revenueContent}>
                <Grid
                  item
                  lg={6}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    className={classes.revenueText}>
                     $100K
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.revenueGrowth}>
                     10% Growth
                  </Typography>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        lg={4}
        xs={12}>
        <Card className={classes.actionButton} elevation={1}>
          <CardContent className={classes.cardContentArea}>
            <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={6}>
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.actionTitle}>
                    In-Flow Status
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={6}
                  className={classes.detailsArea}
                  >
                  <Button
                    className={classes.detailsStyle}
                  >
                    Details
                  </Button>
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" className={classes.contentRow}>
                <Grid
                  item
                  lg={6}>
                  <Typography
                    variant="body1"
                    className={classes.contentTitle}>
                    Total Transaction(s)
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={6}
                  className={classes.detailsArea}
                  >
                  <Typography
                    variant="body2"
                    className={classes.contentGreen}>
                    0
                  </Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container direction="row" alignItems="center" className={classes.contentRow}>
              <Grid
                item
                lg={6}>
                <Typography
                  variant="body1"
                  className={classes.contentTitle}>
                  Successful Transaction(s)
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                className={classes.detailsArea}
                >
                <Typography
                  variant="body2"
                  className={classes.contentBlue}>
                  0
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container direction="row" alignItems="center" className={classes.contentRow}>
              <Grid
                item
                lg={6}>
                <Typography
                  variant="body1"
                  className={classes.contentTitle}>
                  Overdue Transaction(s)
                </Typography>
              </Grid>
              <Grid
                item
                lg={6}
                className={classes.detailsArea}
                >
                <Typography
                  variant="body2"
                  className={classes.contentRed}>
                  0
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        lg={5}
        xs={12}>

        <Card className={classes.actionButton} elevation={1}>
          <CardContent className={classes.cardContentArea}>
            <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                <Grid
                  item
                  lg={6}>
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.actionTitle}>
                    Revenue Chart
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={6}
                  className={classes.detailsArea}
                  >
                  <Button
                    className={classes.detailsStyle}
                  >
                    Details
                  </Button>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );


};

export default OverviewArea;
