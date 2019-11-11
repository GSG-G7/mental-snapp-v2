import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as GoogleImg } from '../../containers/assets/images/google.svg';
import './style.css';

class GoogleButton extends Component {
  state = {};

  async componentDidMount() {
    const { firebase } = this.props;
    const signedInUser = await firebase.auth.getRedirectResult();
    if (signedInUser.credential) {
      const token = signedInUser.credential.accessToken;
      const { user } = signedInUser;
      console.log(token, user);
    }
  }

  handleClick = async () => {
    const { firebase } = this.props;
    await firebase.auth.signInWithRedirect(firebase.googleProvider);
  };

  render() {
    return (
      <button type="submit" className="google-btn" onClick={this.handleClick}>
        <GoogleImg className="google-btn__img" />
        <span className="google-btn__text">Google</span>
      </button>
    );
  }
}

GoogleButton.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    googleProvider: PropTypes.object.isRequired,
  }).isRequired,
};

export default withFirebase(GoogleButton);
