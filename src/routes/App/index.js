import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import * as Containers from '../../containers';
import 'antd/dist/antd.css';
import './style.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path={ROUTES.LANDING} component={Containers.Landing} />
        <Route path={ROUTES.HOME} component={Containers.Home} />
        <Route path={ROUTES.SIGN_IN} component={Containers.SignIn} />
        <Route path={ROUTES.SIGN_UP} component={Containers.SignUp} />
        <Route path={ROUTES.ABOUT} component={Containers.About} />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          component={Containers.ForgotPassword}
        />
        <Route path={ROUTES.FEED} component={Containers.Feed} />
        <Route path={ROUTES.HEAT_MAP} component={Containers.HeatMap} />
        <Route
          path={ROUTES.ACCOUNT_SETTINGS}
          component={Containers.AccountSettings}
        />
        <Route path={ROUTES.EDIT_ACCOUNT} component={Containers.EditAccount} />
        <Route path={ROUTES.QUESTION} component={Containers.Questions} />
        <Route
          path={ROUTES.CONFIRM_PASSWORD}
          component={Containers.ConfirmPassword}
        />
        <Route path={ROUTES.JOURNAL} component={Containers.Journal} />
        <Route
          path={ROUTES.UNAUTHENTICATED}
          component={Containers.Errors.AuthenticationError}
        />
        <Route
          path={ROUTES.SERVER_ERROR}
          component={Containers.Errors.ServerError}
        />
        <Route component={Containers.Errors.ClientError} />
      </Router>
    </div>
  );
};

export default App;
