import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase';
import { EDIT_ACCOUNT } from '../../constants/routes';

import ConfirmPassword from './confirmPass';

class Index extends Component {
  state = {
    errorMessage: '',
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
        try {
          const user = await firebase.auth.currentUser;
          await firebase.doSignInWithEmailAndPassword(
            user.email,
            values.password
          );
          localStorage.setItem('confirm', true);
          push(EDIT_ACCOUNT);
        } catch (error) {
          if (error.message) this.setState({ errorMessage: error.message });
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
    } = this.props;
    const { errorMessage } = this.state;
    return (
      <ConfirmPassword
        handelGoBack={goBack}
        handleChange={this.handleChange}
        handleErrorMessage={this.handleErrorMessage}
        errorMessage={errorMessage}
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
  }).isRequired,
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }).isRequired,
};

const AuthConfirm = compose(
  withAuth,
  withFirebase
)(Index);

export default AuthConfirm;
