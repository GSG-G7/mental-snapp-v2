import React, { Component } from 'react';
import propTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as TwitterImage } from '../../containers/assets/images/twitter.svg';
import * as ROUTES from '../../constants/routes';
import './style.css';

class SignInTwitter extends Component {
  state = { error: null };

  handleClick = async () => {
    const {
      firebase,
      history: { push },
    } = this.props;

    try {
      const socialAuthUser = await firebase.doSignInWithTwitter();
      const userInfo = socialAuthUser.additionalUserInfo.profile;

      await firebase.user(socialAuthUser.user.uid).set(
        {
          email: userInfo.email,
          name: userInfo.name,
          userID: socialAuthUser.user.uid,
          goal: '',
          createdByTwitter: true,
        },
        { merge: true }
      );
      localStorage.setItem('userId', socialAuthUser.user.uid);

      push(ROUTES.HOME);
      this.setState({ error: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error } = this.state;

    return localStorage.getItem('userId') ? (
      <Redirect to={ROUTES.HOME} />
    ) : (
      <div>
        <button
          type="submit"
          className="twitter-btn"
          onClick={this.handleClick}
        >
          <TwitterImage className="twitter-btn__img" />
          <span className="twitter-btn__text">Twitter</span>
        </button>
        {error && <p>{error.message}</p>}
      </div>
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
