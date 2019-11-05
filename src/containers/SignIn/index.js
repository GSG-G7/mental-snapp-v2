import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import FacebookButton from '../../components/FacebookButton';
import GoogleButton from '../../components/GoogleButton';
import './signIn.css';
import * as ROUTES from '../../constants/routes';

const SignInForm = props => {
  const {
    form: { getFieldDecorator, validateFieldsAndScroll },
    history: { goBack },
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-console
        console.log('Received values of form: ', values);
      }
    });
  };

  return (
    <div className="signin">
      <Header text="Sign In" handleBack={goBack} />

      <section className="signin__form">
        <Form onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="mail" className="signin__icon" />}
                placeholder="Email"
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  pattern: new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{8,}$/
                  ),
                  required: true,
                  message:
                    'The password must contain at lest 8 numbers and characters',
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" className="signin__icon" />}
                placeholder="Password"
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback></Form.Item>
          <Form.Item>
            <Button className="signin__btn" type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </section>
      <Link to={ROUTES.FORGOT_PASSWORD}>
        <p className="forgot-password__link">Forgot Password?</p>
      </Link>

      <section className="signin__or">OR</section>

      <section className="signin__buttons">
        <FacebookButton />
        <GoogleButton />
      </section>
    </div>
  );
};

const SignIn = Form.create({ name: 'sign in' })(SignInForm);

SignInForm.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
