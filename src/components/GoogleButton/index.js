import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as GoogleImg } from '../../containers/assets/images/google.svg';
import * as ROUTES from '../../constants/routes';
import './style.css';

class SignInGoogle extends Component {
  state = { error: null };

  handleClick = async () => {
    const {
      firebase,
      history: { push },
    } = this.props;
    try {
      const socialAuthUser = await firebase.doSignInWithGoogle();
      const userInfo = socialAuthUser.additionalUserInfo.profile;
      await firebase.user(socialAuthUser.user.uid).set(
        {
          email: userInfo.email,
          name: userInfo.name,
          goal: '',
          userID: socialAuthUser.user.uid,
          createdByGoogle: true,
        },
        { merge: true }
      );
      await localStorage.setItem('userId', socialAuthUser.user.uid);
      this.setState({ error: null });
      await push(ROUTES.HOME);
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error } = this.state;
    return localStorage.getItem('userId') ? (
      <Redirect to={ROUTES.HOME} />
    ) : (
      <button type="submit" className="google-btn" onClick={this.handleClick}>
        <GoogleImg className="google-btn__img" />
        <span className="google-btn__text">Google</span>
        {error && <p>{error.message}</p>}
      </button>
    );
  }
}

SignInGoogle.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    user: propTypes.func.isRequired,
    doSignInWithGoogle: propTypes.func.isRequired,
  }).isRequired,
};

const AuthSignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogle);

export default AuthSignInGoogle;
