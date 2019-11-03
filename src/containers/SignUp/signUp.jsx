import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import FacebookBottun from '../../components/FacebookButton';
import GoogleButton from '../../components/GoogleButton';
import './signUp.css';

const FormItem = Form.Item;

class SignUpForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      history: { goBack },
    } = this.props;
    return (
      <div className="signup">
        <Header text="Sign Up" handleBack={goBack} />

        <section className="signup__form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Item hasFeedback>
              {getFieldDecorator('username', {
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
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
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
                  onBlur={this.handleConfirmBlur}
                  prefix={<Icon type="check-circle" className="signup__icon" />}
                  placeholder="Password"
                />
              )}
            </Form.Item>

            <FormItem>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </FormItem>
          </Form>
        </section>

        <section className="signup__or">OR</section>

        <section className="signup__buttons">
          <FacebookBottun />
          <GoogleButton />
        </section>
      </div>
    );
  }
}

const HorizontalSignUp = Form.create({ name: 'sign up' })(SignUpForm);

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

export default HorizontalSignUp;
