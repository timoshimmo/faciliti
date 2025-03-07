import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';

import {
  Minimal as MinimalLayout,
  Main as MainLayout,
  Managers as ManagersLayout
 } from './layouts';

 import {
   Onboarding as OnboardingPage,
   FMBusiness as FMBusinessPage,
   FMPersonal as FMPersonalPage,
   CompleteSignup as CompleteSignupPage,
   CompleteForgot as CompleteForgotPage,
   SignIn as SignInPage,
   ForgotPassword as ForgotPasswordPage,
   ResetPassword as ResetPasswordPage,
   Overview as OverviewPage,
   FMOverview as FMOverviewPage,
   SelectUser as SelectUserPage,
   FullRegister as FullRegisterPage,
   PartialRegister as PartialRegisterPage,
   Payment as PaymentPage,
   FMPayment as FMPaymentPage,
   FMServices as FMServicesPage,
   Orders as OrdersPage,
   Visitors as VisitorsPage,
   FMVisitors as FMVisitorsPage,
   Maintenance as MaintenancePage,
   Meetings as MeetingsPage,
   Profile as ProfilePage,
   FMPaymentHistory as FMPaymentHistoryPage,
   UserProfile as UserProfilePage
 } from './views';

 const Routes = () => {
   return (
     <Switch>
       <RouteWithLayout
           component={SelectUserPage}
           exact
           layout={MinimalLayout}
           path="/onboarding"
         />
        <RouteWithLayout
            component={OnboardingPage}
            exact
            layout={MinimalLayout}
            path="/signup"
          />
          <RouteWithLayout
              component={FMBusinessPage}
              exact
              layout={MinimalLayout}
              path="/fm-business"
            />
          <RouteWithLayout
              component={FMPersonalPage}
              exact
              layout={MinimalLayout}
              path="/fm-personal"
            />
        <RouteWithLayout
            component={CompleteSignupPage}
            exact
            layout={MinimalLayout}
            path="/signup/completed"
          />

          <RouteWithLayout
            component={CompleteForgotPage}
            exact
            layout={MinimalLayout}
            path="/forgot/sent"
          />


        <RouteWithLayout
            component={FullRegisterPage}
            exact
            layout={MinimalLayout}
            path="/signup/full"
          />
        <RouteWithLayout
            component={PartialRegisterPage}
            exact
            layout={MinimalLayout}
            path="/signup/partial"
          />
        <RouteWithLayout
            component={SignInPage}
            exact
            layout={MinimalLayout}
            path="/signin"
          />

          <RouteWithLayout
            component={ResetPasswordPage}
            exact
            layout={MinimalLayout}
            path="/reset:id"
          />

        <RouteWithLayout
            component={ForgotPasswordPage}
            exact
            layout={MinimalLayout}
            path="/forgot"
          />

        <RouteWithLayout
            component={OverviewPage}
            exact
            layout={MainLayout}
            path="/home"
          />

        <RouteWithLayout
            component={FMOverviewPage}
            exact
            layout={ManagersLayout}
            path="/overview"
          />

          <RouteWithLayout
              component={ProfilePage}
              exact
              layout={ManagersLayout}
              path="/profile"
            />

            <RouteWithLayout
              component={UserProfilePage}
              exact
              layout={ManagersLayout}
              path="/user-profile"
            />

          <RouteWithLayout
              component={FMPaymentPage}
              exact
              layout={ManagersLayout}
              path="/fm-contracts"
            />

            <RouteWithLayout
              component={FMPaymentHistoryPage}
              exact
              layout={ManagersLayout}
              path="/fm-payments"
            />

            <RouteWithLayout
                component={FMServicesPage}
                exact
                layout={ManagersLayout}
                path="/fm-services"
              />

            <RouteWithLayout
                component={FMVisitorsPage}
                exact
                layout={ManagersLayout}
                path="/fm-visitors"
              />

            <RouteWithLayout
              component={MeetingsPage}
              exact
              layout={ManagersLayout}
              path="/meetings"
            />

        <RouteWithLayout
            component={PaymentPage}
            exact
            layout={MainLayout}
            path="/payment"
          />
        <RouteWithLayout
            component={OrdersPage}
            exact
            layout={MainLayout}
            path="/orders"
          />

        <RouteWithLayout
            component={VisitorsPage}
            exact
            layout={MainLayout}
            path="/visitors"
          />
        <RouteWithLayout
            component={MaintenancePage}
            exact
            layout={MainLayout}
            path="/maintenance"
          />
        <Redirect to="/onboarding" />
      </Switch>
    );
 };

export default Routes;
