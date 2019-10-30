import React from 'react';
import { Icon } from 'antd';
import './backbutton.css';
import propTypes from 'prop-types';

const BackButton = props => {
  // const {
  //   history: { goBack },
  // } = props;
  return (
    // eslint-disable-next-line no-console
    <button type="submit" className="back-button" onClick={console.log('hi')}>
      <Icon type="left" />
    </button>
  );
};

BackButton.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
  }).isRequired,
};
export default BackButton;
