import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as FacebookImg } from '../../containers/assets/images/facebook.svg';
import './style.css';

const handleClick = () => {
  // handle login or sign up with facebook
};

class Facebook extends Component {
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
    await firebase.auth.signInWithRedirect(firebase.facebookProvider);
  };

  render() {
    return (
      <button type="submit" className="facebook-btn" onClick={handleClick}>
        <FacebookImg className="facebook-btn__img" />
        <span className="facebook-btn__text">Facebook</span>
      </button>
    );
  }
}

Facebook.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    facebookProvider: PropTypes.object.isRequired,
  }).isRequired,
};

export default withFirebase(Facebook);
