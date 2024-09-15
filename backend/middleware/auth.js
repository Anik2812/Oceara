const { auth } = require('express-oauth2-jwt-bearer');

const authConfig = {
  audience: 'https://dev-dnvzdmhvds1nxn7v.us.auth0.com', // Replace with actual audience
  issuerBaseURL: `dev-dnvzdmhvds1nxn7v.us.auth0.com`, 
  tokenSigningAlg: 'RS256'
};

const checkJwt = auth(authConfig);

module.exports = checkJwt;
