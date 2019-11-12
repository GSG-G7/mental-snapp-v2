import React from 'react';
import PropTypes from 'prop-types';

import { withFirebase } from '../../containers/Firebase';
import { ReactComponent as FacebookImg } from '../../containers/assets/images/facebook.svg';
import './style.css';

const handleClick = async props => {
  const { firebase } = props;
  await firebase.auth.signInWithRedirect(firebase.facebookProvider);
};

const Facebook = props => {
  return (
    <>
      <button
        type="submit"
        className="facebook-btn"
        onClick={() => handleClick(props)}
      >
        <FacebookImg className="facebook-btn__img" />
        <span className="facebook-btn__text">Facebook</span>
      </button>
    </>
  );
};

Facebook.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    facebookProvider: PropTypes.object.isRequired,
  }).isRequired,
};

export default withFirebase(Facebook);
