import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import { ReactComponent as ConfirmImg } from '../assets/images/confirmPass.svg';
import Header from '../../components/Header';

import { EDIT_ACCOUNT } from '../../constants/routes';
import { withFirebase } from '../Firebase';

import './confirmPass.css';

class confirmPass extends Component {
  state = {
    errorMesage: '',
  };

  handleSubmit = e => {
    const {
      history: { push },
      form: { validateFields },
      firebase,
    } = this.props;

    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        try {
          await firebase.confirmPassword(values.password);
          await push(EDIT_ACCOUNT);
        } catch (error) {
          this.setState({ errorMesage: error.message });
        }
      }
    });
  };

  render() {
    const { errorMesage } = this.state;

    const {
      history: { goBack },
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className="confirm-pass">
        <Header text="Confirm Password" handleBack={goBack} />

        <section className="confirm-pass__body">
          <p className="confirm-pass__text">
            This is to make sure it&apos;s you!
          </p>
          <Form className="confirm-pass__form" onSubmit={this.handleSubmit}>
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

            {errorMesage && <p>{errorMesage}</p>}

            <Button type="primary" size="large">
              Procceed To Edit
            </Button>
          </Form>
          <ConfirmImg className="confirm-pass__img" />
        </section>
      </div>
    );
  }
}

const confirmPasswordForm = Form.create({ name: 'confirm pass' })(confirmPass);

confirmPass.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,

  firebase: PropTypes.shape({
    confirmPassword: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(confirmPasswordForm);
