const CLIENT_ID = '0oa4q3u5qr7BWh8yU297';
const ISSUER = 'https://login-qa.ny.gov/oauth2/default';
const REDIRECTURI = 'http://localhost:3001/callback';
const LOGOUTURI = '/';
const OKTA_TESTING_DISABLEHTTPSCHECK = false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECTURI,
    postLogoutRedirectUri: LOGOUTURI,
    scopes: ['openid', 'profile', 'email', 'ITS'],
    pkce: true,
    storage: sessionStorage,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  // ,
  // resourceServer: {
  //   messagesUrl: "http://localhost:8000/api/messages",
  // },
};
