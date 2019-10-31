import React from 'react';

import { Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import GoogleButton from '../../components/GoogleButton';
import FacebookButton from '../../components/FacebookButton';
import './signUp.css';

const SignUp = props => {
  const {
    history: { goBack },
  } = props;
  return (
    <div className="signup">
      <Header text="Sign Up" handleBack={goBack} />

      <form className="signup__form">
        <Input
          prefix={<Icon type="user" className="signup__icon" />}
          className="signup__input"
          placeholder="Name"
        />

        <Input
          prefix={<Icon type="mail" className="signup__icon" />}
          className="signup__input"
          placeholder="Email"
        />

        <Input
          prefix={<Icon type="lock" className="signup__icon" />}
          className="signup__input"
          placeholder="Password"
        />

        <Input
          prefix={<Icon type="check-circle" className="signup__icon" />}
          className="signup__input"
          placeholder="Confirm Password"
        />

        <Button type="primary" size="large" className="signup__submit-btn">
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
};

SignUp.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
export default SignUp;
