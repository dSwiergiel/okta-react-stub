import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute } from '@okta/okta-react';
// import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import CustomLoginCallback from './auth/CustomLoginCallback';
import Protected from './components/pages/Protected';
import oktaConfig from './auth/oktaConfig';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';

/**
 * @returns {React.ReactElement} Routes the supported paths to components
 */
function Routes() {
  return (
    <Security {...oktaConfig.oidc}>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/callback' component={CustomLoginCallback}></Route>
        {/* uncomment if you want user to be authenticated as soon as they enter the app. 
          All protected routes must be made with the SecureRoute component*/}
        {/* <SecureRoute path='/'>
            <Redirect to='/protected' component={Protected} />
          </SecureRoute> */}
        <SecureRoute path='/protected' component={Protected}></SecureRoute>
        <SecureRoute path='/profile' component={Profile}></SecureRoute>
      </Switch>
    </Security>
  );
}

export default Routes;
