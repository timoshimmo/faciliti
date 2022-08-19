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
   SignIn as SignInPage,
   Overview as OverviewPage,
   FMOverview as FMOverviewPage,
   SelectUser as SelectUserPage,
   FullRegister as FullRegisterPage,
   PartialRegister as PartialRegisterPage,
   Payment as PaymentPage,
   FMPayment as FMPaymentPage,
   Orders as OrdersPage,
   Visitors as VisitorsPage,
   FMVisitors as FMVisitorsPage,
   Maintenance as MaintenancePage,
   Meetings as MeetingsPage,
   Profile as ProfilePage
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
              component={FMPaymentPage}
              exact
              layout={ManagersLayout}
              path="/fm-payments"
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
