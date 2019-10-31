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
          <Route
            path={ROUTES.LANDING}
            render={porps => <Containers.Landing {...porps} />}
          />
          <Route
            path={ROUTES.HOME}
            render={porps => <Containers.Home {...porps} />}
          />
          <Route
            path={ROUTES.SIGN_IN}
            render={porps => <Containers.SignIn {...porps} />}
          />
          <Route
            path={ROUTES.SIGN_UP}
            render={porps => <Containers.SignUp {...porps} />}
          />
          <Route
            path={ROUTES.ABOUT}
            render={porps => <Containers.About {...porps} />}
          />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            render={porps => <Containers.ForgotPassword {...porps} />}
          />
          <Route
            path={ROUTES.FEED}
            render={porps => <Containers.Feed {...porps} />}
          />
          <Route
            path={ROUTES.HEAT_MAP}
            render={porps => <Containers.HeatMap {...porps} />}
          />
          <Route
            path={ROUTES.ACCOUNT_SETTINGS}
            render={porps => <Containers.AccountSettings {...porps} />}
          />
          <Route
            path={ROUTES.EDIT_ACCOUNT}
            render={porps => <Containers.EditAccount {...porps} />}
          />
          <Route
            path={ROUTES.QUESTION}
            render={porps => <Containers.Questions {...porps} />}
          />
          <Route
            path={ROUTES.CONFIRM_PASSWORD}
            render={porps => <Containers.ConfirmPassword {...porps} />}
          />
          <Route
            path={ROUTES.JOURNAL}
            render={porps => <Containers.Journal {...porps} />}
          />
          <Route
            path={ROUTES.UNAUTHENTICATED}
            render={porps => (
              <Containers.Errors.AuthenticationError {...porps} />
            )}
          />
          <Route
            path={ROUTES.SERVER_ERROR}
            render={porps => <Containers.Errors.ServerError {...porps} />}
          />
          <Route
            render={porps => <Containers.Errors.ClientError {...porps} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
