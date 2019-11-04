import React, { Component } from 'react';

import { Form, Input, Icon, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import './editAccount.css';

class EditAccount extends Component {
  state = {
    checked: false,
  };

  toggleChecked = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  };

  onChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
    const { checked } = this.state;
    const handleSubmit = e => {
      e.preventDefault();
      // submit the data
    };
    const {
      form: { getFieldDecorator },
      history: { goBack },
    } = this.props;
    return (
      <div className="edit-account">
        <Header text="Edit Account" handleBack={goBack} />

        <section className="edit-account__form">
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
                  prefix={<Icon type="user" className="edit-account__icon" />}
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
                  prefix={<Icon type="mail" className="edit-account__icon" />}
                  placeholder="Email"
                />
              )}
            </Form.Item>

            <section className="edit-account__checkbox">
              <Checkbox checked={checked} onChange={this.onChange}>
                Change Password
              </Checkbox>
            </section>

            <Form.Item hasFeedback className={!checked && 'hidden'}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

const editAccount = Form.create({ name: 'Edit Account' })(EditAccount);

EditAccount.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default editAccount;
