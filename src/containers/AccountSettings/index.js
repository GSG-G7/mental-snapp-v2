import React, { Component } from 'react';
import propTypes from 'prop-types';
import AccountSettings from './accountSettings';
import { withFirebase } from '../Firebase/index';
import { SIGN_IN } from '../../constants/routes';

class Account extends Component {
  state = {
    info: {
      name: '',
      email: '',
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
        this.setState({
          info: { name: userName, email: userEmail },
          loading: false,
        });
      });
  }

  handleLogOut = () => {
    const { firebase, history } = this.props;
    history.push(SIGN_IN);
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
    collection: propTypes.object.isRequired,
    doSignOut: propTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Account);
