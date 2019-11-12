import React from 'react';
import PropTypes from 'prop-types';

import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as GoogleImg } from '../../containers/assets/images/google.svg';
import './style.css';

const handleClick = async props => {
  const { firebase } = props;
  await firebase.auth.signInWithRedirect(firebase.googleProvider);
};

const GoogleButton = props => {
  return (
    <button
      type="submit"
      className="google-btn"
      onClick={() => handleClick(props)}
    >
      <GoogleImg className="google-btn__img" />
      <span className="google-btn__text">Google</span>
    </button>
  );
};

GoogleButton.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    googleProvider: PropTypes.object.isRequired,
  }).isRequired,
};

export default withFirebase(GoogleButton);
