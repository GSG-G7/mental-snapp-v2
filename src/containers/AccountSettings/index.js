import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountSettings from './accountSettings';
import { withFirebase } from '../Firebase/index';
import { LANDING } from '../../constants/routes';

class Account extends Component {
  state = {
    info: {
      name: 'fares98',
      email: 'fares98@gmai.com',
      createdAccount: true,
    },
  };

  handleLogOut = () => {
    const { firebase, history } = this.props;
    history.push(LANDING);
    return firebase.doSignOut;
  };

  render() {
    const { info } = this.state;
    return <AccountSettings info={info} handleLogOut={this.handleLogOut} />;
  }
}

Account.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    doSignOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Account);
