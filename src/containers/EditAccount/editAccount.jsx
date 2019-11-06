import React from 'react';

import { Form, Input, Icon, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import './editAccount.css';

const EditAccount = props => {
  const {
    userInfo: { name, email },
    checked,
    handleChange,
    handleGoBack,
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
};

export default editAccount;
