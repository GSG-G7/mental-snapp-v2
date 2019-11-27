import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

import SignUp from './signUp';
import './signUp.css';
import { HOME } from '../../constants/routes';
import { withFirebase } from '../Firebase';

class SignUpForm extends Component {
  state = {
    errorMessage: '',
    loading: false,
  };

  handleSubmit = e => {
    const {
      firebase,
      form: { validateFieldsAndScroll },
      history: { push },
    } = this.props;
    e.preventDefault();
    // Validates the form fields when submitting
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        try {
          const result = await firebase.doCreateUserWithEmailAndPassword(
            values.email,
            values.password
          );
          // Add the user info to the users collection
          await firebase.user(result.user.uid).set(
            {
              name: values.name,
              email: values.email,
              userID: result.user.uid,
              goal: '',
            },
            { merge: true }
          );

          localStorage.setItem('userId', result.user.uid);
          this.setState({ loading: false });
          push(HOME);
        } catch (error) {
          this.setState({ errorMessage: error.message, loading: false });
        }
      }
    });
  };

  // Validator for the confirm password field
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback("Password doesn't match");
    } else {
      callback();
    }
  };

  render() {
    const { errorMessage, loading } = this.state;
    const {
      history: { goBack },
      form: { getFieldDecorator },
    } = this.props;
    return (
      <SignUp
        errorMessage={errorMessage}
        loading={loading}
        goBack={goBack}
        handleSubmit={this.handleSubmit}
        compareToFirstPassword={this.compareToFirstPassword}
        getFieldDecorator={getFieldDecorator}
      />
    );
  }
}

SignUpForm.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    user: PropTypes.shape.isRequired,
    doCreateUserWithEmailAndPassword: PropTypes.func.isRequired,
  }).isRequired,
};

const SignUpPage = Form.create({ name: 'Sign Up Form' })(SignUpForm);

export default withFirebase(SignUpPage);
