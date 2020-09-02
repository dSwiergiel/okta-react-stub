import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Profile = () => {
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
    }
  }, [authState, authService]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>
        <i name='drivers license outline' /> My User Profile (ID Token Claims){' '}
      </h1>
      <p>
        Below is the information from your ID token which was obtained during
        the &nbsp;
        <a href='https://developer.okta.com/docs/guides/implement-auth-code-pkce'>
          PKCE Flow
        </a>{' '}
        and is now stored in local storage.
      </p>
      <p>
        This route is protected with the
        <code>&lt;SecureRoute&gt;</code> component, which will ensure that this
        page cannot be accessed until you have authenticated.
      </p>
      <table className='App'>
        <thead>
          <tr>
            <th>Claim</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userInfo).map((claimEntry) => {
            const claimName = claimEntry[0];
            const claimValue = claimEntry[1];
            const claimId = `claim-${claimName}`;
            return (
              <tr key={claimName}>
                <td>{claimName}</td>
                <td id={claimId}>{claimValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;