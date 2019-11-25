import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as FacebookImg } from '../../containers/assets/images/facebook.svg';
import * as ROUTES from '../../constants/routes';
import './style.css';

class SignInTwitter extends Component {
  state = { error: null };

  handleClick = () => {
    const {
      firebase,
      history: { push },
    } = this.props;
    firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        firebase.user(socialAuthUser.user.uid).set(
          {
            email: socialAuthUser.user.email,
            name: socialAuthUser.user.displayName,
            userID: socialAuthUser.user.uid,
            goal: '',
            createdByTwitter: true,
          },
          { merge: true }
        );
        firebase.journal(socialAuthUser.user.uid).set(
          {
            goal: '',
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

    return localStorage.getItem('userId') ? (
      <Redirect to={ROUTES.HOME} />
    ) : (
      <button type="submit" className="facebook-btn" onClick={this.handleClick}>
        <FacebookImg className="facebook-btn__img" />
        <span className="facebook-btn__text">Twitter</span>
        {error && <p>{error.message}</p>}
      </button>
    );
  }
}

SignInTwitter.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  firebase: propTypes.shape({
    auth: propTypes.object.isRequired,
    uid: propTypes.string.isRequired,
    user: propTypes.object.isRequired,
    journal: propTypes.object.isRequired,
    doSignInWithTwitter: propTypes.func.isRequired,
  }).isRequired,
};

const AuthTwitter = compose(
  withRouter,
  withFirebase
)(SignInTwitter);

export default AuthTwitter;
