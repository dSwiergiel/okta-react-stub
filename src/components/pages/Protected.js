import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../../auth/setAuthToken';

const Home = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
      // NEEDED FOR PROTECTED API CALLS
      // set default http requests to have Bearer accessToken in Authorization Header
      const { accessToken } = authState;
      setAuthToken(accessToken);

      // test call to show Bearer token is set
      axios.get('https://jsonplaceholder.typicode.com/users');
    }
  }, [authState, authService]); // Update if authState changes

  const logout = async () => authService.logout('/');

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>PKCE Flow w/ Okta Hosted Login Page</h1>

        {authState.isAuthenticated && !userInfo && (
          <div>Loading user information...</div>
        )}

        {authState.isAuthenticated && userInfo && (
          <div>
            <p>Welcome back, {userInfo.name}!</p>
            <p>
              You have successfully authenticated against your Okta org, and
              have been redirected back to this application. You now have an ID
              token and access token in local storage. <br></br>
            </p>
            <h3>
              Visit the <a href='/profile'>My Profile</a> page to take a look
              inside the ID token.
            </h3>
            {authState.isAuthenticated && (
              <button id='logout-button' onClick={logout}>
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
