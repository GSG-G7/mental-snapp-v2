/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import AccountSettings from './accountSettings';
import { withFirebase } from '../Firebase/index';
import { SIGN_IN } from '../../constants/routes';

class index extends Component {
  state = {
    info: {
      name: 'fares98',
      email: 'fares98@gmai.com',
      createdAccount: true,
    },
  };

  // handleLogOut = () => {
  //   // clear cockie & redirect to the login page
  //   const { firebase } = this.props;
  //   firebase.doSignOut;
  //   this.props.history.push(SIGN_IN);
  // };

  render() {
    const { info } = this.state;
    return (
      <AccountSettings
        info={info}
        handleLogOut={() => {
          this.props.history.push(SIGN_IN);
          return this.props.firebase.doSignOut;
        }}
      />
    );
  }
}

export default withFirebase(index);
