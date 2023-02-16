import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Link,
  CardActions,
  Button,
  SvgIcon
} from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import { useModalAction } from '../../../../../../modal/modal-context.tsx';

function BuildingIcon(props) {
  return (
    <SvgIcon {...props} width="31" height="25" viewBox="0 0 31 25">
      <path d="M6.17857 9.36364V18.7727M12.3929 9.36364V18.7727M18.6071 9.36364V18.7727M24.8214 9.36364V18.7727M3.07143 18.7727H27.9286M1 24H30M2.03566 9.36364H28.9642L15.4999 1L2.03566 9.36364Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

function WalletIcon(props) {
  return (
    <SvgIcon {...props} width="27" height="24" viewBox="0 0 27 24">
      <path d="M3.21586 4.5C3.21586 3.67157 2.54429 3 1.71586 3C0.887431 3 0.215858 3.67157 0.215858 4.5H3.21586ZM1.71586 20H0.215858H1.71586ZM1.71748 4.59116L3.21653 4.53786L3.21648 4.5365L1.71748 4.59116ZM4.21586 2V0.5H4.21584L4.21586 2ZM20.7159 3.5C21.5443 3.5 22.2159 2.82843 22.2159 2C22.2159 1.17157 21.5443 0.5 20.7159 0.5V3.5ZM19.7159 14C19.7159 14.2761 19.492 14.5 19.2159 14.5V17.5C21.1489 17.5 22.7159 15.933 22.7159 14H19.7159ZM19.2159 14.5C18.9397 14.5 18.7159 14.2761 18.7159 14H15.7159C15.7159 15.933 17.2829 17.5 19.2159 17.5V14.5ZM18.7159 14C18.7159 13.7239 18.9397 13.5 19.2159 13.5V10.5C17.2829 10.5 15.7159 12.067 15.7159 14H18.7159ZM19.2159 13.5C19.492 13.5 19.7159 13.7239 19.7159 14H22.7159C22.7159 12.067 21.1489 10.5 19.2159 10.5V13.5ZM0.215858 4.5V20H3.21586V4.5H0.215858ZM0.215858 20C0.215858 20.9283 0.584607 21.8185 1.24098 22.4749L3.3623 20.3536C3.26854 20.2598 3.21586 20.1326 3.21586 20H0.215858ZM1.24098 22.4749C1.89736 23.1313 2.7876 23.5 3.71586 23.5V20.5C3.58325 20.5 3.45607 20.4473 3.3623 20.3536L1.24098 22.4749ZM3.71586 23.5H23.7159V20.5H3.71586V23.5ZM23.7159 23.5C24.3789 23.5 25.0148 23.2366 25.4836 22.7678L23.3623 20.6464C23.4561 20.5527 23.5833 20.5 23.7159 20.5V23.5ZM25.4836 22.7678C25.9525 22.2989 26.2159 21.663 26.2159 21H23.2159C23.2159 20.8674 23.2685 20.7402 23.3623 20.6464L25.4836 22.7678ZM26.2159 21V8H23.2159V21H26.2159ZM26.2159 8C26.2159 7.33696 25.9525 6.70108 25.4836 6.23223L23.3623 8.35355C23.2685 8.25978 23.2159 8.13261 23.2159 8H26.2159ZM25.4836 6.23223C25.0148 5.76339 24.3789 5.5 23.7159 5.5V8.5C23.5833 8.5 23.4561 8.44732 23.3623 8.35355L25.4836 6.23223ZM23.7159 5.5H4.27577V8.5H23.7159V5.5ZM4.27577 5.5C3.68009 5.5 3.23433 5.03851 3.21653 4.53786L0.218428 4.64446C0.296963 6.85328 2.16028 8.5 4.27577 8.5V5.5ZM3.21648 4.5365C3.21159 4.40219 3.23381 4.26828 3.28183 4.14275L0.479844 3.07089C0.28778 3.57298 0.198888 4.10862 0.218477 4.64582L3.21648 4.5365ZM3.28183 4.14275C3.32985 4.01723 3.40267 3.90267 3.49596 3.80592L1.33632 1.72362C0.963202 2.1106 0.671908 2.56881 0.479844 3.07089L3.28183 4.14275ZM3.49596 3.80592C3.58924 3.70917 3.70107 3.63222 3.82477 3.57965L2.65149 0.818599C2.15674 1.02884 1.70945 1.33664 1.33632 1.72362L3.49596 3.80592ZM3.82477 3.57965C3.94846 3.52709 4.08148 3.5 4.21587 3.5L4.21584 0.5C3.67828 0.500005 3.14623 0.608363 2.65149 0.818599L3.82477 3.57965ZM4.21586 3.5H20.7159V0.5H4.21586V3.5Z" fill="#1B75BC"/>
    </SvgIcon>
  );
}

function DownloadIcon(props) {
  return (
    <SvgIcon {...props} width="23" height="22" viewBox="0 0 23 22">
      <path d="M16.9065 11.7071L15.4923 10.2929L12.9567 12.8284L12.9567 5.34315L10.9567 5.34315V12.8284L8.42121 10.2929L7.00699 11.7071L11.9567 16.6569L16.9065 11.7071Z" fill="#1B75BC"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.7349 18.7782C15.4391 23.0739 8.47433 23.0739 4.17857 18.7782C-0.117202 14.4824 -0.117202 7.51759 4.17857 3.22183C8.47433 -1.07394 15.4391 -1.07394 19.7349 3.22183C24.0307 7.51759 24.0307 14.4824 19.7349 18.7782ZM18.3207 17.364C21.8354 13.8492 21.8354 8.15076 18.3207 4.63604C14.806 1.12132 9.1075 1.12132 5.59278 4.63604C2.07806 8.15076 2.07806 13.8492 5.59278 17.364C9.1075 20.8787 14.806 20.8787 18.3207 17.364Z" fill="#1B75BC"/>
    </SvgIcon>
  );
}

function RightArrowIcon(props) {
  return (
    <SvgIcon {...props} width="20" height="18" viewBox="0 0 20 18">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.4217 10H0.835938V8.00001H15.4217L9.12883 1.70712L10.543 0.292908L19.2502 9.00001L10.543 17.7071L9.12883 16.2929L15.4217 10Z" fill="white"/>
    </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({

  subscriptionCardStyle: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    backgroundImage: 'url(/images/payment_blue_style.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  nextPaymentCardStyle: {
    padding: theme.spacing(3),
    backgroundImage: 'url(/images/payment_white_style.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  subscriptionTitleStyle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 600
  },
  subscriptionPriceStyle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 600,
  },
  subscriptionPackageStyle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 600
  },

  nextPaymentTitleStyle: {
    color: theme.palette.secondary.dark,
    fontSize: 13,
    fontWeight: 600
  },
  nextPaymentPriceStyle: {
    color: theme.palette.secondary.dark,
    fontSize: 30,
    fontWeight: 600
  },
  nextPaymentDateStyle: {
    color: theme.palette.secondary.dark,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 10
  },
  buildingIconArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  walletIconArea: {
    backgroundColor: theme.palette.background.lightShade,
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  learnMorePlanStyles: {
    fontSize: 13,
    color: theme.palette.white,
    fontWeight: 600
  },
  learnMorePaymentStyles: {
    fontSize: 13,
    color: theme.palette.primary.main,
    fontWeight: 600
  },
  btnChangePlanStyles: {
    fontSize: 13,
    fontWeight: 600,
    paddingTop: 10,
    paddingBottom: 10,
    textTransform: 'none',
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    fontFamily: [
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  btnMakePaymentStyles: {
    fontSize: 13,
    fontWeight: 600,
    paddingTop: 10,
    paddingBottom: 10,
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    fontFamily: [
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
}));

/*
<Grid
item
lg={6}>
  <Card className={classes.subscriptionCardStyle}>
    <CardContent>
      <Grid container>
        <Grid
        item
        lg={10}>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.subscriptionTitleStyle}>
            Current subscription plan
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            className={classes.subscriptionPriceStyle}>
            $40
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            className={classes.subscriptionPackageStyle}>
            Spacio Elite
          </Typography>
        </Grid>
        <Grid
        item
        lg={2}
        style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div className={classes.buildingIconArea}>
              <BuildingIcon style={{ fill:'none' }} />
          </div>
        </Grid>
      </Grid>
    </CardContent>
    <CardActions>
      <Grid container alignItems="center">
        <Grid
        item
        lg={6}>
          <Button
            className={classes.btnChangePlanStyles}
            fullWidth
            type="button"
            variant="contained"
            startIcon={<DownloadIcon style={{ fill:'none' }}/>}
          >
            Change Plan
          </Button>
        </Grid>
        <Grid
        item
        lg={6}>
          <Typography
            variant="body2"
            gutterBottom
            align="right"
          >
            <Link
              component={RouterLink}
              to="/signin"
              variant="body2"
              underline="none"
              className={classes.learnMorePlanStyles}

            >
              Learn more
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </CardActions>
  </Card>
</Grid>

*/


const Billing = props => {

  const classes = useStyles();
  const { charges } = props;

//  console.log("CHARGES PROPS: ", charges);

  const [loading, setLoading] = useState(false);
  const { closeModal, openModal } = useModalAction();

  const handleOpenMakePayment = () => {
    closeModal();
    return openModal('MAKE_PAYMENT');
  }
/*  const [outstanding, setOutstanding] = useState({});

  useEffect(() => {
    if(charges !== "undefined") {
        const mCharges = JSON.stringify(charges[0]);
        console.log(outstanding);
        setOutstanding(mCharges);
    }
 }, [charges, outstanding]);

 */

  return (

    <Grid container>
        <Grid
        item
        lg={12}>
          <Card className={classes.nextPaymentCardStyle}>
            <CardContent>
            <Grid container>
              <Grid
              item
              lg={10}>
                <Typography
                  variant="body1"
                  gutterBottom
                  className={classes.nextPaymentTitleStyle}>
                  Next payment
                </Typography>
                {
                  charges.map((values) => {
                    const {amount, amountOutstanding, paymentStatus, endDate} = values;

                    return (
                      <>
                        <Typography
                          variant="h4"
                          gutterBottom
                          className={classes.nextPaymentPriceStyle}>
                            <CurrencyFormat value={amountOutstanding} displayType={'text'} thousandSeparator={true} prefix={'₦'} />
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          className={classes.nextPaymentDateStyle}>
                          {moment(endDate).format('MMMM DD, YYYY')}
                        </Typography>
                      </>
                    );
                  })
                }

              </Grid>
              <Grid
              item
              lg={2}
              style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className={classes.walletIconArea}>
                    <WalletIcon style={{ fill:'none' }} />
                </div>
              </Grid>
            </Grid>
            </CardContent>
            <CardActions>
              <Grid container alignItems="center">
                <Grid
                item
                lg={6}>
                  <Button
                    className={classes.btnMakePaymentStyles}
                    fullWidth
                    color="primary"
                    type="button"
                    variant="contained"
                    startIcon={<RightArrowIcon style={{ fill:'none' }}/>}
                    onClick={handleOpenMakePayment}
                  >
                    Make Payment
                  </Button>
                </Grid>
                <Grid
                item
                lg={6}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    align="right"
                  >
                    <Link
                      component={RouterLink}
                      to="/signin"
                      variant="body2"
                      underline="none"
                      className={classes.learnMorePaymentStyles}
                    >
                      Learn more
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
    </Grid>
  );
}

export default Billing;
