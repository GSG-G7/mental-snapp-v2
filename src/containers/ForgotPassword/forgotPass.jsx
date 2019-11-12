/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon } from 'antd';

import Header from '../../components/Header';
import { ReactComponent as Vector } from '../assets/images/forgotPass.svg';

import { withFirebase } from '../Firebase';

import './forgotPass.css';

const ForgotPass = props => {
  const {
    history: { goBack },
    form: { getFieldDecorator, validateFields },
    firebase,
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        try {
          await firebase.forgotPassword(values.email);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleClick = () => {
    // here will will call the firebase function again
  };

  return (
    <div className="forgot-password">
      <Header text="forgot password" handleBack={goBack} />
      <Vector className="forgot-password__vector" />
      <p className="forgot-password__text">
        We will send you a verification code to your email, enter your email and
        check it.
      </p>
      <div className="forgot-password__from">
        <Form layout="horizontal" onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'This is not a valid email!',
                },
                { required: true, message: 'Please enter your email' },
              ],
            })(
              <Input
                placeholder="Enter your email"
                size="large"
                prefix={<Icon type="mail" className="forgot-password__icon" />}
                aria-label="Enter email"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              className="forgot-password__button"
              size="large"
              type="primary"
              htmlType="submit"
            >
              Reset My Password
            </Button>
          </Form.Item>
        </Form>
      </div>
      <p className="forgot-password__link">
        Didn’t receive any code?
        <span
          role="button"
          tabIndex="0"
          onClick={handleClick}
          onKeyPress={handleClick}
          className="forgot-password__resend"
        >
          Resend
        </span>
      </p>
    </div>
  );
};

ForgotPass.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
};

const forgotPassForm = Form.create({ name: 'forgot_password_from' })(
  ForgotPass
);

export default withFirebase(forgotPassForm);
