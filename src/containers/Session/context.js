/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const AuthUserContext = React.createContext(null);

export const withAuth = Component => props => {
  return (
    <AuthUserContext.Consumer>
      {authProps => {
        if (!authProps.loading) {
          if (authProps.authUser)
            return <Component {...props} authUser={authProps.authUser} />;
          return <Redirect to={ROUTES.UNAUTHENTICATED} />;
        }
        return (
          <div style={{ textAlign: 'center', paddingTop: '40vh' }}>
            <Spin size="large" />
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};
export default AuthUserContext;
