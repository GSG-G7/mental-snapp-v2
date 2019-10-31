import React, { Component } from 'react';
import SignUpForm from './signUp';

class SingUp extends Component {
  state = {
    error: '',
  };

  handleSubmit = newUser => {
    // eslint-disable-next-line no-console
    console.log(newUser);

    // eslint-disable-next-line no-console
    console.log('make a request');
  };

  render() {
    const { error } = this.state;
    return (
      <SignUpForm
        error={error}
        handleSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

export default SingUp;
