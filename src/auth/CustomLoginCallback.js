import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
const CustomLoginCallback = () => {
  const { authService, authState } = useOktaAuth();
  const history = useHistory();
  useEffect(() => {
    authService.handleAuthentication();
    if (!authState.isAuthenticated) {
      setTimeout(() => {
        history.push('/');
      }, 10000);
    } else {
    }
    // eslint-disable-next-line
  }, [authService]);

  if (authState.error) {
    console.log('auth error', authState.error);
    return (
      <div>
        <h1>Whoa!</h1>
        <p style={{ color: 'red' }}>{authState.error.toString()}</p>
        <p>You will be redirected to the home screen after 10 seconds.</p>
      </div>
    );
  }

  return null;
};

export default CustomLoginCallback;
