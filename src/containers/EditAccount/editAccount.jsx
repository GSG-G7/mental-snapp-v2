import React from 'react';
import { message, Form, Input, Icon, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';
import Header from '../../components/Header';
import './editAccount.css';

const EditAccount = props => {
  const {
    firebase,
    userInfo: { name, email },
    checked,
    handleChange,
    handlePush,
    handleErrorMessage,
    errorMessage,
    handleGoBack,
    form: { getFieldDecorator, validateFieldsAndScroll },
  } = props;

  const handleSubmit = e => {
    e.preventDefault();
    const user = firebase.auth.currentUser;
    validateFieldsAndScroll(async (err, values) => {
      try {
        if (!err) {
          if (!values.password) {
            await user.updateProfile({
              displayName: values.name,
            });
            await user.updateEmail(values.email);
          } else {
            await user.updateProfile({
              displayName: values.name,
            });
            await user.updateEmail(values.email);
            await user.updatePassword(values.password);
          }
          message.success('account updated successfully');
        }
      } catch (error) {
        if (error.message) handleErrorMessage(error.message);
        // should do better handling here
      }
    });
  };
  return (
    <div className="edit-account">
      <Header text="Edit Account" handleBack={handleGoBack} />

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
                    required: checked,
                    message: 'Enter your password',
                  },
                ],
              })(
                <Input.Password
                  prefix={<Icon type="lock" className="edit-account__icon" />}
                  placeholder="Password"
                />
              )}
            </Form.Item>
          )}
          {errorMessage && <p>{errorMessage.message}</p>}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

const editAccount = Form.create({ name: 'Edit Account' })(EditAccount);

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
  }).isRequired,
  handlePush: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default withFirebase(editAccount);
