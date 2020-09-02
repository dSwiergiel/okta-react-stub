import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();

  useEffect(() => {
    if (authState.isAuthenticated) {
      history.push('/protected');
    }
  }, [authState, authService, history]); // Update if authState changes

  const login = async () => {
    authService.login('/protected');
  };
  return (
    <div>
      <h1> This is the Home page which is not protected.</h1>
      <br></br>
      {!authState.isAuthenticated && (
        <div>
          <p>
            If you&lsquo;re viewing this page then you have successfully started
            this React application.
          </p>
          <p>
            <span>This example shows you how to use the </span>
            <a href='https://github.com/okta/okta-oidc-js/tree/master/packages/okta-react'>
              Okta React Library
            </a>
            <span> to add the </span>
            <a href='https://developer.okta.com/docs/guides/implement-auth-code-pkce'>
              PKCE Flow
            </a>
            <span> to your application.</span>
          </p>
          <p>
            When you click the login button below, you will be redirected to the
            login page on your Okta org. After you authenticate, you will be
            returned to this application with an ID token and access token.
            These tokens will be stored in local storage and can be retrieved at
            a later time.
          </p>
          <button id='login-button' onClick={login}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
