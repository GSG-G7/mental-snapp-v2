import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import * as Containers from '../../containers';
import 'antd/dist/antd.css';
import './style.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Containers.Landing} />
          <Route exact path={ROUTES.HOME} component={Containers.Home} />
          <Route exact path={ROUTES.SIGN_IN} component={Containers.SignIn} />
          <Route exact path={ROUTES.SIGN_UP} component={Containers.SignUp} />
          <Route exact path={ROUTES.ABOUT} component={Containers.About} />
          <Route
            exact
            path={ROUTES.FORGOT_PASSWORD}
            component={Containers.ForgotPassword}
          />
          <Route exact path={ROUTES.FEED} component={Containers.Feed} />
          <Route exact path={ROUTES.HEAT_MAP} component={Containers.HeatMap} />
          <Route
            exact
            path={ROUTES.ACCOUNT_SETTINGS}
            component={Containers.AccountSettings}
          />
          <Route
            exact
            path={ROUTES.EDIT_ACCOUNT}
            component={Containers.EditAccount}
          />
          <Route
            exact
            path={ROUTES.QUESTION}
            component={Containers.Questions}
          />
          <Route
            exact
            path={ROUTES.CONFIRM_PASSWORD}
            component={Containers.ConfirmPassword}
          />
          <Route exact path={ROUTES.JOURNAL} component={Containers.Journal} />
          <Route
            exact
            path={ROUTES.UNAUTHENTICATED}
            render={props => (
              <Containers.Errors.AuthenticationError {...props} />
            )}
          />
          <Route
            exact
            path={ROUTES.SERVER_ERROR}
            component={Containers.Errors.ServerError}
          />
          <Route component={Containers.Errors.ClientError} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
