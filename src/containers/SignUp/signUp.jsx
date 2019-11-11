import React, { Component } from 'react';

import { Form, Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import FacebookButton from '../../components/FacebookButton';
import GoogleButton from '../../components/GoogleButton';
import { HOME } from '../../constants/routes';
import { withFirebase } from '../Firebase';
import './signUp.css';

class SignUpForm extends Component {
  state = {
    errorMessage: '',
  };

  handleSubmit = e => {
    const {
      firebase,
      form: { validateFieldsAndScroll },
      history: { push },
    } = this.props;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        firebase
          .doCreateUserWithEmailAndPassword(values.email, values.password)
          .then(result =>
            firebase
              .user(result.user.uid)
              .set(
                {
                  name: values.name,
                  email: values.email,
                  userID: result.user.uid,
                },
                { merge: true }
              )
              .then(localStorage.setItem('userId', result.user.uid))
          )
          .then(() => {
            push(HOME);
          })
          .catch(error => {
            this.setState({ errorMessage: error.message });
          });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback("Password doesn't match");
    } else {
      callback();
    }
  };

  render() {
    const { errorMessage } = this.state;

    const {
      form: { getFieldDecorator },
      history: { goBack },
    } = this.props;

    return (
      <div className="signup">
        <Header text="Sign Up" handleBack={goBack} />

        <section className="signup__form">
          <Form onSubmit={this.handleSubmit}>
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
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input.Password
                  prefix={<Icon type="check-circle" className="signup__icon" />}
                  placeholder="Confirm password"
                />
              )}
            </Form.Item>
            {errorMessage && <p className="errorMesaage">{errorMessage}</p>}
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
  }
}

const SignUp = Form.create({ name: 'sign up' })(SignUpForm);

SignUpForm.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    user: PropTypes.shape.isRequired,
    doCreateUserWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignUp);
