import React from 'react';
import { Button, Input, Icon } from 'antd';
import MainHeading from '../../components/MainHeading';
import './signIn.css';

const SignIn = () => {
  return (
    <div className="sign-in">
      <MainHeading text="Sign In" />
      <form>
        <Input
          type="email"
          className="sign-in__email-input"
          placeholder="Email"
          prefix={
            <Icon type="mail" style={{ color: 'rgba(36, 36, 36, 0.4)' }} />
          }
        />
        <Input
          type="password"
          className="sign-in__password-input"
          placeholder="Password"
          prefix={
            <Icon type="lock" style={{ color: 'rgba(36, 36, 36, 0.4)' }} />
          }
        />
        <Button type="primary" className="signIn__btn">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
