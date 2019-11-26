import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form, Spin } from 'antd';

import { ReactComponent as ConfirmImg } from '../assets/images/confirmPass.svg';
import Header from '../../components/Header';

import './confirmPass.css';

const ConfirmPass = props => {
  const {
    getFieldDecorator,
    handelGoBack,
    handleChange,
    handleSubmit,
    errorMessage,
    loading,
  } = props;

  return (
    <div className="confirm-pass">
      <Header text="Confirm Password" handleBack={handelGoBack} />

      <section className="confirm-pass__body">
        <p className="confirm-pass__text">
          This is to make sure it&apos;s you!
        </p>
        <Form className="confirm-pass__form" onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
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
                onChange={handleChange}
                className="confirm-pass__input"
              />
            )}
          </Form.Item>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <Button
            type="primary"
            size="large"
            className="confirm-pass__form__loading"
            onClick={handleSubmit}
          >
            {loading ? <Spin /> : 'Proceed To Edit'}
          </Button>
        </Form>
        <ConfirmImg className="confirm-pass__img" />
      </section>
    </div>
  );
};

ConfirmPass.propTypes = {
  handelGoBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ConfirmPass;
