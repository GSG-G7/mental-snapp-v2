import React from 'react';
import { Input, Button, Icon } from 'antd';
import BackButton from '../../components/BackButton';
import { ReactComponent as Vector } from './vector.svg';
import './forgotPass.css';

const forgotPass = () => {
  return (
    <div className="forgot-password">
      <header className="forgot-password__heading">
        <div className="forgot-password__back-btn">
          <BackButton />
        </div>
        <h2 className="forgot-password__title">forgot password</h2>
      </header>
      <Vector className="forgot-password__vector" />
      <p className="forgot-password__text">
        We will send you a verification code to your email, enter your email and
        check it.
      </p>
      <div className="forgot-password__input">
        <Icon type="mail" className="forgot-password__icon" />
        <Input size="large" placeholder="Email" />
      </div>
      <Button className="forgot-password__button" size="large" type="primary">
        Reset My Password
      </Button>
      <p className="forgot-password__link">
        Didn’t receive any code?
        <span className="forgot-password__resend">Resend</span>
      </p>
    </div>
  );
};

export default forgotPass;
