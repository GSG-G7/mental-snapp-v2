import React, { Component } from 'react';
import ForgotPassword from './forgotPass';
import schema from './utils/schema';

export default class index extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    email: '',
    error: '',
  };

  handleChange = ({ target: { value } }) => {
    const { email } = this.state;
    this.setState({ email: value }, async () => {
      const valid = await schema.isValid({ email: email.trim() });
      if (!valid) {
        this.setState({ error: 'the input is not a valid email' });
      } else {
        this.setState({ error: '' });
      }
    });
  };

  handleClick = () => {
    // Logic will be added hereW
  };

  render() {
    const { email, error } = this.state;
    const { ...props } = this.props;
    return (
      <ForgotPassword
        email={email}
        error={error}
        handleChange={this.handleChange}
        handleClick={this.handleClick}
        {...props}
      />
    );
  }
}
