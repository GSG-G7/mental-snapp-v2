import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as FacebookImg } from '../../containers/assets/images/facebook.svg';
import * as ROUTES from '../../constants/routes';
import './style.css';

class SignInFacebook extends Component {
  state = { error: null };

  handleClick = () => {
    const {
      firebase,
      history: { push },
    } = this.props;
    firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        firebase.user(socialAuthUser.user.uid).set(
          {
            name: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
          },
          { merge: true }
        );
        return localStorage.setItem('userId', socialAuthUser.user.uid);
      })
      .then(() => {
        push(ROUTES.HOME);
        this.setState({ error: null });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;

    if (localStorage.getItem('userId')) {
      return <Redirect to={ROUTES.HOME} />;
    }

    return (
      <button type="submit" className="facebook-btn" onClick={this.handleClick}>
        <FacebookImg className="facebook-btn__img" />
        <span className="facebook-btn__text">Facebook</span>
        {error && <p>{error.message}</p>}
      </button>
    );
  }
}

SignInFacebook.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    uid: propTypes.string.isRequired,
    user: propTypes.object.isRequired,
    doSignInWithFacebook: propTypes.func.isRequired,
  }).isRequired,
};

const AuthFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebook);

export default AuthFacebook;
