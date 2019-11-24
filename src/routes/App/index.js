import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import withAuthentication from "../../containers/Session";

import * as Containers from "../../containers";
import "antd/dist/antd.css";
import "./style.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path={ROUTES.LANDING}
            render={porps => <Containers.Landing {...porps} />}
          />
          <Route
            exact
            path={ROUTES.HOME}
            render={porps => <Containers.Home {...porps} />}
          />
          <Route
            exact
            path={ROUTES.SIGN_IN}
            render={porps => <Containers.SignIn {...porps} />}
          />
          <Route
            exact
            path={ROUTES.SIGN_UP}
            render={porps => <Containers.SignUp {...porps} />}
          />
          <Route
            exact
            path={ROUTES.ABOUT}
            render={porps => <Containers.About {...porps} />}
          />
          <Route
            exact
            path={ROUTES.FORGOT_PASSWORD}
            render={porps => <Containers.ForgotPassword {...porps} />}
          />
          <Route
            exact
            path={ROUTES.EMAIL_SENT}
            render={props => <Containers.EmailSent {...props} />}
          />
          <Route
            exact
            path={ROUTES.FEED}
            render={porps => <Containers.Feed {...porps} />}
          />
          <Route
            exact
            path={ROUTES.HEAT_MAP}
            render={porps => <Containers.HeatMap {...porps} />}
          />
          <Route
            exact
            path={ROUTES.ACCOUNT_SETTINGS}
            render={porps => <Containers.AccountSettings {...porps} />}
          />
          <Route
            exact
            path={ROUTES.EDIT_ACCOUNT}
            render={porps => <Containers.EditAccount {...porps} />}
          />
          <Route
            exact
            path={ROUTES.QUESTION}
            render={porps => <Containers.Questions {...porps} />}
          />
          <Route
            exact
            path={ROUTES.CONFIRM_PASSWORD}
            render={porps => <Containers.ConfirmPassword {...porps} />}
          />
          <Route
            exact
            path={ROUTES.JOURNAL}
            render={porps => <Containers.Journal {...porps} />}
          />
          <Route
            exact
            path={ROUTES.UNAUTHENTICATED}
            render={porps => (
              <Containers.Errors.AuthenticationError {...porps} />
            )}
          />
          <Route
            exact
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

export default withAuthentication(App);
