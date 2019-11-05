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

  render() {
    const { info } = this.state;
    return <AccountSettings info={info} />;
  }
}

export default index;
