import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withAuth } from '../Session/index';
import EditAccount from './editAccount';

import { withFirebase } from '../Firebase';

class Index extends Component {
  state = {
    info: {
      name: '',
      email: '',
    },
    checked: false,
    error: '',
  };

  componentDidMount() {
    const { firebase } = this.props;

    const userId = localStorage.getItem('userId');
    firebase
      .user(userId)
      .get()
      .then(snapshot => {
        const userInfo = {
          name: snapshot.data().name,
          email: snapshot.data().email,
        };
        this.setState({
          info: userInfo,
        });
      });
  }

  handleErrorMessage = message => {
    this.setState({ error: message });
  };

  onChange = ({ target: { checked } }) => this.setState({ checked });

  render() {
    const {
      history: { goBack, push },
    } = this.props;
    const { info, checked, error } = this.state;
    return (
      <EditAccount
        userInfo={info}
        checked={checked}
        handleChange={this.onChange}
        handlePush={push}
        handleErrorMessage={this.handleErrorMessage}
        error={error}
        handleGoBack={goBack}
      />
    );
  }
}

Index.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
};

const AuthEditAccount = compose(
  withAuth,
  withFirebase
)(Index);

export default AuthEditAccount;
