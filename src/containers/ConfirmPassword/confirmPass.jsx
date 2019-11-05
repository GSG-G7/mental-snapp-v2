import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import { ReactComponent as ConfirmImg } from '../assets/images/confirmPass.svg';
import Header from '../../components/Header';

import './confirmPass.css';

const confirmPass = props => {
  const {
    history: { goBack },
    form: { getFieldDecorator, validateFieldsAndScroll },
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
    <div className="confirm-pass">
      <Header text="Confirm Password" handleBack={goBack} />

      <section className="confirm-pass__body">
        <p className="confirm-Password__text">
          This is to make sure it&apos;s you!
        </p>
        <Form className="confirm-pass__form" onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Enter Your Password',
                },
              ],
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" className="confirm-pass__form__icon" />
                }
                placeholder="Enter your password"
              />
            )}
          </Form.Item>

          <Button type="primary" size="large">
            Procceed To Edit
          </Button>
        </Form>
        <ConfirmImg className="confirm-pass__img" />
      </section>
    </div>
  );
};

const confirmPasswordForm = Form.create({ name: 'confirm pass' })(confirmPass);

confirmPass.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};

export default confirmPasswordForm;
