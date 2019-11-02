import React, { Component } from 'react';

import ForgotPassword from './forgotPass';
import schema from '../../utils/schema';

export default class index extends Component {
  state = {
    email: '',
    error: '',
  };

  handleChange = ({ target: { value } }) => {
    const { email } = this.state;
    this.setState({ email: value }, async () => {
      const valid = await schema.isValid({ email: email.trim() });
      if (!valid) {
        this.setState({ error: 'Please, enter a valid email' });
      } else {
        this.setState({ error: '' });
      }
    });
  };

  handleClick = () => {
    // Here we need to use the firebase forget password function
  };

  render() {
    const { email, error } = this.state;
    return (
      <ForgotPassword
        email={email}
        error={error}
        handleChange={this.handleChange}
        handleClick={this.handleClick}
        {...this.props}
      />
    );
  }
}
