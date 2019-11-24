import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';

import { ReactComponent as ConfirmImg } from '../assets/images/confirmPass.svg';
import Header from '../../components/Header';
import { EDIT_ACCOUNT } from '../../constants/routes';
import { withFirebase } from '../Firebase';

import './confirmPass.css';

const ConfirmPass = props => {
  const {
    form: { getFieldDecorator },
    handelGoBack,
    handleChange,
    handleErrorMessage,
    handlePush,
    errorMessage,
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      firebase,
    } = props;
    validateFields(async (err, values) => {
      if (!err) {
        try {
          const user = await firebase.auth.currentUser;
          await firebase.doSignInWithEmailAndPassword(
            user.email,
            values.password
          );
          localStorage.setItem('confirm', true);
          await handlePush(EDIT_ACCOUNT);
        } catch (error) {
          if (error.message) handleErrorMessage(error.message);
        }
      }
    });
  };

  return (
    <div className="confirm-pass">
      <Header text="Confirm Password" handleBack={handelGoBack} />

      <section className="confirm-pass__body">
        <p className="confirm-pass__text">
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
                onChange={handleChange}
                className="confirm-pass__input"
              />
            )}
          </Form.Item>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <Button type="primary" size="large" onClick={handleSubmit}>
            Proceed To Edit
          </Button>
        </Form>
        <ConfirmImg className="confirm-pass__img" />
      </section>
    </div>
  );
};

const confirmPasswordForm = Form.create({ name: 'confirm pass' })(ConfirmPass);

ConfirmPass.propTypes = {
  handelGoBack: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired,
  handlePush: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string.isRequired,
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }).isRequired,
};

export default withFirebase(confirmPasswordForm);
