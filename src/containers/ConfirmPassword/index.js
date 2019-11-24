import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withAuth } from '../Session/index';
import { withFirebase } from '../Firebase';
import ConfirmPassword from './confirmPass';

class Index extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = () => {
    this.setState({ errorMessage: '' });
  };

  handleErrorMessage = message => {
    this.setState({ errorMessage: message });
  };

  render() {
    const {
      history: { goBack, push },
    } = this.props;
    const { errorMessage } = this.state;
    return (
      <ConfirmPassword
        handelGoBack={goBack}
        handleChange={this.handleChange}
        handleErrorMessage={this.handleErrorMessage}
        handlePush={push}
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
};

const AuthConfirm = compose(
  withAuth,
  withFirebase
)(Index);

export default AuthConfirm;
