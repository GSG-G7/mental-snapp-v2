import React, { Component } from 'react';
import AccountSettings from './accountSettings';

class index extends Component {
  state = {
    info: {
      name: 'fares98',
      email: 'fares98@gmai.com',
      createdAccount: true,
    },
  };

  componentDidMount() {
    // get user info from firebase fire store
    // edit state to update user data
  }

  handleLogOut = () => {
    // clear cockie & redirect to the login page
  };

  render() {
    const { info } = this.state;
    return <AccountSettings info={info} handleLogOut={this.handleLogOut} />;
  }
}

export default index;
