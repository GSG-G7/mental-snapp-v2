import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Form } from 'antd';
import { withAuth } from '../Session/index';

import { withFirebase } from '../Firebase';
import { EDIT_ACCOUNT } from '../../constants/routes';

import ConfirmPassword from './confirmPass';

class Index extends Component {
  state = {
    errorMessage: '',
    loading: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      firebase,
      history: { push },
    } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        try {
          const user = await firebase.auth.currentUser;
          await firebase.doSignInWithEmailAndPassword(
            user.email,
            values.password
          );
          localStorage.setItem('confirm', true);
          this.setState({ loading: false });
          push(EDIT_ACCOUNT);
        } catch (error) {
          if (error) this.setState({ errorMessage: error.message });
        }
      }
    });
  };

  handleChange = () => {
    this.setState({ errorMessage: '' });
  };

  handleErrorMessage = message => {
    this.setState({ errorMessage: message });
  };

  render() {
    const {
      history: { goBack },
      form: { getFieldDecorator },
    } = this.props;
    const { errorMessage, loading } = this.state;
    return (
      <ConfirmPassword
        handelGoBack={goBack}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleErrorMessage={this.handleErrorMessage}
        getFieldDecorator={getFieldDecorator}
        errorMessage={errorMessage}
        loading={loading}
      />
    );
  }
}

Index.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }).isRequired,
};

const confirmPasswordForm = Form.create({ name: 'confirm pass' })(Index);

const AuthConfirm = compose(
  withAuth,
  withFirebase
)(confirmPasswordForm);

export default AuthConfirm;
