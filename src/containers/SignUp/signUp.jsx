import React from 'react';

import { Form, Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import FacebookButton from '../../components/FacebookButton';
import GoogleButton from '../../components/GoogleButton';
import './signUp.css';

const SignUpForm = props => {
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

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback("Password doesn't match");
    } else {
      callback();
    }
  };

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
                  message: 'Please input your Name!',
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
                  message: 'Please input your E-mail!',
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </section>

      <section className="signup__or">OR</section>

      <section className="signup__buttons">
        <FacebookButton />
        <GoogleButton />
      </section>
    </div>
  );
};

const SignUp = Form.create({ name: 'sign up' })(SignUpForm);

SignUpForm.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
