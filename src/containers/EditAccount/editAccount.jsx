import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Input, Icon, Button, Checkbox } from 'antd';

import './editAccount.css';
import Header from '../../components/Header';
import { CONFIRM_PASSWORD } from '../../constants/routes';

const EditAccount = props => {
  const {
    userInfo: { name, email },
    checked,
    handleChange,
    handleSubmit,
    errorMessage,
    handleGoBack,
    getFieldDecorator,
  } = props;

  // Redirect to confirm when not confirmed
  if (!localStorage.getItem('confirm'))
    return <Redirect to={CONFIRM_PASSWORD} />;

  return (
    <div className="edit-account">
      <Header
        text="Edit Account"
        handleBack={() => {
          localStorage.removeItem('confirm');
          handleGoBack('/account-settings');
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

EditAccount.defaultProps = {
  errorMessage: '',
};

EditAccount.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default EditAccount;
