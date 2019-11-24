/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, message } from 'antd';

import Header from '../../components/Header';
import { ReactComponent as Vector } from '../assets/images/forgotPass.svg';
import { HOME } from '../../constants/routes';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

import './forgotPass.css';

class ForgotPass extends Component {
  state = { errorMessage: '' };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      firebase,
      history: { push },
    } = this.props;

    validateFields(async (err, values) => {
      if (!err) {
        try {
          await localStorage.setItem('userEmail', values.email);
          await firebase.forgotPassword(values.email);
          await push(ROUTES.EMAIL_SENT);
          message.success('Check your email ');
        } catch (error) {
          this.setState({ errorMessage: error.message });
        }
      }
    });
  };

  render() {
    const { errorMessage } = this.state;

    const {
      history: { goBack },
      form: { getFieldDecorator },
    } = this.props;
    if (localStorage.getItem('userId')) {
      return <Redirect to={HOME} />;
    }
    return (
      <div className="forgot-password">
        <Header text="forgot password" handleBack={goBack} />
        <Vector className="forgot-password__vector" />
        <p className="forgot-password__text">
          We will send you a verification code to your email, enter your email
          and check it.
        </p>
        <div className="forgot-password__from">
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
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
                  prefix={
                    <Icon type="mail" className="forgot-password__icon" />
                  }
                  aria-label="Enter email"
                />
              )}
            </Form.Item>
            {errorMessage && <p>{errorMessage}</p>}
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
          Didn’t receive any email?
          <span
            role="button"
            tabIndex="0"
            onClick={this.handleSubmit}
            onKeyPress={this.handleSubmit}
            className="forgot-password__resend"
          >
            Resend
          </span>
        </p>
      </div>
    );
  }
}

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

const AuthForgotPassword = withFirebase(forgotPassForm);

export default AuthForgotPassword;
