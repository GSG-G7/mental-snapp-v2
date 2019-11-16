import React from 'react';
import UnAthenticated from '../errors/AuthenticationError';

const AuthUserContext = React.createContext(null);

export const withAuth = Component => props => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <Component {...props} authUser={authUser} />
      ) : (
        <UnAthenticated />
        // eslint-disable-next-line prettier/prettier
      )}
  </AuthUserContext.Consumer>
);
export default AuthUserContext;
