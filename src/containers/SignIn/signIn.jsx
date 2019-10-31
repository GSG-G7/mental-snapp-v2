import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Icon } from 'antd';
import MainHeading from '../../components/MainHeading';
import * as ROUTES from '../../constants/routes';
import './signIn.css';

const SignIn = () => {
  return (
    <div className="sign-in">
      <MainHeading text="Sign In" />
      <form className="sign-in__form">
        <Input
          type="email"
          className="sign-in__input sign-in__email-input"
          placeholder="Email"
          prefix={
            <Icon type="mail" style={{ color: 'rgba(36, 36, 36, 0.4)' }} />
          }
        />
        <Input
          type="password"
          className="sign-in__input sign-in__password-input"
          placeholder="Password"
          prefix={
            <Icon type="lock" style={{ color: 'rgba(36, 36, 36, 0.4)' }} />
          }
        />
        <Link to={ROUTES.HOME}>
          <Button type="primary" className="signIn__btn">
            Sign In
          </Button>
        </Link>
        <Link to={ROUTES.FORGOT_PASSWORD}>
          <p>Forgot Password?</p>
        </Link>
        <span>OR</span>
      </form>
      <Button type="primary" icon="google" className="sign-in__google-btn">
        Google
      </Button>
      <Button type="primary" icon="facebook" className="sign-in__facebook-btn">
        Facebook
      </Button>
    </div>
  );
};

export default SignIn;
