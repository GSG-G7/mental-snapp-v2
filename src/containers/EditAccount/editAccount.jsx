import React from 'react';
import { message, Form, Input, Icon, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import Header from '../../components/Header';
import './editAccount.css';
import * as ROUTES from '../../constants/routes';

const EditAccount = props => {
  const {
    firebase,
    userInfo: { name, email },
    checked,
    handleChange,
    handleErrorMessage,
    errorMessage,
    handleGoBack,
    handlePush,
    form: { getFieldDecorator, validateFieldsAndScroll },
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    const user = firebase.auth.currentUser;
    const userId =
      firebase.auth.currentUser.uid || localStorage.getItem('userId');
    validateFieldsAndScroll(async (err, values) => {
      try {
        if (!err) {
          if (!values.password) {
            await user.updateProfile({
              displayName: values.name,
            });
            await user.updateEmail(values.email);

            firebase
              .user(userId)
              .set({ name: values.name, email: values.email }, { merge: true });
          } else {
            await user.updateProfile({
              displayName: values.name,
            });
            await user.updateEmail(values.email);
            await user.updatePassword(values.password);

            firebase
              .user(userId)
              .set({ name: values.name, email: values.email }, { merge: true });
          }
          localStorage.removeItem('confirm');
          handlePush(ROUTES.ACCOUNT_SETTINGS);
          message.success('account updated successfully');
        }
      } catch (error) {
        if (error.message) handleErrorMessage(error.message);
      }
    });
  };
  if (!localStorage.getItem('confirm'))
    return <Redirect to={ROUTES.CONFIRM_PASSWORD} />;
  return (
    <div className="edit-account">
      <Header
        text="Edit Account"
        handleBack={() => {
          localStorage.removeItem('confirm');
          handleGoBack();
        }}
      />

      <section className="edit-account__form">
        <Form onSubmit={handleSubmit}>
          <Form.Item hasFeedback>
            {getFieldDecorator('name', {
              initialValue: `${name}`,
              rules: [
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" className="edit-account__icon" />}
                placeholder="Name"
              />
            )}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('email', {
              initialValue: `${email}`,

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
                prefix={<Icon type="mail" className="edit-account__icon" />}
                placeholder="Email"
              />
            )}
          </Form.Item>

          <section className="edit-account__checkbox">
            <Checkbox checked={checked} onChange={handleChange}>
              Change Password
            </Checkbox>
          </section>

          {checked && (
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
                  prefix={<Icon type="lock" className="edit-account__icon" />}
                  placeholder="Password"
                  autoComplete="off"
                />
              )}
            </Form.Item>
          )}
          {errorMessage && <p>{errorMessage.message}</p>}
          <Form.Item>
            <div className="edit-account__buttons">
              <Button
                type="default"
                onClick={() => {
                  localStorage.removeItem('confirm');
                  handleGoBack();
                }}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

const editAccount = Form.create({ name: 'Edit Account' })(EditAccount);
EditAccount.defaultProps = {
  errorMessage: '',
};
EditAccount.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    user: PropTypes.func.isRequired,
  }).isRequired,
  handlePush: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default withFirebase(editAccount);
