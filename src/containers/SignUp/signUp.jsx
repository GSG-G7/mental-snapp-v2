import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Icon, Button, Spin } from 'antd';

import Header from '../../components/Header';
import GoogleButton from '../../components/GoogleButton';
import TwitterButton from '../../components/TwitterButton';
import { SIGN_IN, HOME } from '../../constants/routes';

const SignUp = props => {
  const {
    getFieldDecorator,
    goBack,
    errorMessage,
    loading,
    handleSubmit,
    compareToFirstPassword,
  } = props;

  // Redirect the user if already logged in
  if (localStorage.getItem('userId')) {
    return <Redirect to={HOME} />;
  }

  return (
    <div className="signup">
      <Header text="Sign Up" handleBack={goBack} />

      <section className="signup__form">
        <Form onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your Name!',
                },
                {
                  pattern: new RegExp(/^(?=.*[A-Za-z])/),
                  message: 'Please enter a real Name!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" className="signup__icon" />}
                placeholder="Name"
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please enter your E-mail!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="mail" className="signup__icon" />}
                placeholder="Email"
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  pattern: new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{7,}$/
                  ),
                  required: true,
                  message:
                    'The password must be at least 8 alphanumeric characters',
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" className="signup__icon" />}
                placeholder="Password"
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="check-circle" className="signup__icon" />}
                placeholder="Confirm password"
              />
            )}
          </Form.Item>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {loading ? <Spin /> : 'Sign Up'}
            </Button>
          </Form.Item>
        </Form>
      </section>
      <p className="landing__aboutLink">
        Already have account ?
        <Link to={SIGN_IN}>
          <span className="landing__logo link">Sign In</span>
        </Link>
      </p>

      <div className="signup__or">OR</div>

      <section className="signup__buttons">
        <TwitterButton />
        <GoogleButton />
      </section>
    </div>
  );
};

SignUp.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  compareToFirstPassword: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SignUp;
