import React, { Component } from 'react';

import { Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import GoogleButton from '../../components/GoogleButton';
import FacebookButton from '../../components/FacebookButton';
import schema from '../../utils/signup-validation';

import './signUp.css';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  handleSubmit = async () => {
    await schema.validate(this.state, { abortEarly: false });
  };

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    const {
      history: { goBack },
    } = this.props;
    const { name, password, passwordConfirm, email } = this.state;
    return (
      <div className="signup">
        <Header text="Sign Up" handleBack={goBack} />

        <form className="signup__form" onSubmit={this.handleSubmit}>
          <Input
            prefix={<Icon type="user" className="signup__icon" />}
            className="signup__input"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <Input
            prefix={<Icon type="mail" className="signup__icon" />}
            className="signup__input"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <Input
            prefix={<Icon type="lock" className="signup__icon" />}
            className="signup__input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
            type="password"
          />

          <Input
            prefix={<Icon type="check-circle" className="signup__icon" />}
            className="signup__input"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={this.handleChange}
            type="password"
          />

          <Button
            type="primary"
            onClick={this.handleSubmit}
            size="large"
            className="signup__submit-btn"
          >
            Create Account
          </Button>

          <p className="signup__or">OR</p>

          <div className="signup__buttons">
            <GoogleButton />
            <FacebookButton />
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
export default SignUp;
