import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import AccountSettings from './accountSettings';
import { withFirebase } from '../Firebase/index';
import { withAuth } from '../Session/index';
import { LANDING } from '../../constants/routes';

class Account extends Component {
  state = {
    info: {
      name: '',
      email: '',
      createdByGoogle: false,
    },
    loading: true,
  };

  componentDidMount() {
    const { firebase } = this.props;
    const userId = localStorage.getItem('userId');
    firebase.db
      .collection('users')
      .doc(userId)
      .get()
      .then(snapshot => {
        const userEmail = snapshot.data().email;
        const userName = snapshot.data().name;
        const { createdByGoogle } = snapshot.data();
        this.setState({
          info: { name: userName, email: userEmail, createdByGoogle },
          loading: false,
        });
      });
  }

  handleLogOut = () => {
    const { firebase, history } = this.props;
    history.push(LANDING);
    localStorage.removeItem('userId');
    return firebase.doSignOut;
  };

  render() {
    const { info, loading } = this.state;
    return (
      <AccountSettings
        loading={loading}
        info={info}
        handleLogOut={this.handleLogOut}
      />
    );
  }
}

Account.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    user: propTypes.func.isRequired,
    db: propTypes.object.isRequired,
    doSignOut: propTypes.func.isRequired,
  }).isRequired,
};

const AuthAccount = compose(
  withAuth,
  withFirebase
)(Account);

export default AuthAccount;
