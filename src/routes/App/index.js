import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../routesFolder';

import Landing from '../../containers/Landing';
import Home from '../../containers/Home';
import SignIn from '../../containers/SignIn';
import SignUp from '../../containers/SignUp';
import About from '../../containers/About';
import ForgetPassword from '../../containers/ForgetPassword';
import Feed from '../../containers/Feed';
import HeatMap from '../../containers/HeatMap';
import AccountSettings from '../../containers/AccountSettings';
import EditAccount from '../../containers/EditAccount';
import Questions from '../../containers/Questions';
import ConfirmPassword from '../../containers/ConfirmPassword';
import ClientError from '../../containers/errors/ClientError';
import ServerError from '../../containers/errors/ServerError';
import Journal from '../../containers/Journal';
import AuthenticationError from '../../containers/errors/AuthenticationError';
import 'antd/dist/antd.css';
import './style.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.ABOUT} component={About} />
        <Route path={ROUTES.FORGET_PASSWORD} component={ForgetPassword} />
        <Route path={ROUTES.FEED} component={Feed} />
        <Route path={ROUTES.HEAT_MAP} component={HeatMap} />
        <Route path={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} />
        <Route path={ROUTES.EDIT_ACCOUNT} component={EditAccount} />
        <Route path={ROUTES.QUESTION} component={Questions} />
        <Route path={ROUTES.CONFIRM_PASSWORD} component={ConfirmPassword} />
        <Route path={ROUTES.CLIENT_ERROR} component={ClientError} />
        <Route path={ROUTES.SERVER_ERROR} component={ServerError} />
        <Route path={ROUTES.JOURNAL} component={Journal} />
        <Route path={ROUTES.UNAUTHENTICATED} component={AuthenticationError} />
      </Router>
    </div>
  );
};

export default App;
