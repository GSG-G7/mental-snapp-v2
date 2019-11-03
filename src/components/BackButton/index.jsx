import React from 'react';
import { Icon } from 'antd';
import './backbutton.css';
import propTypes from 'prop-types';

const BackButton = props => {
  const { handleBack } = props;
  return (
    <button type="submit" className="back-button" onClick={() => handleBack()}>
      <Icon type="left" />
    </button>
  );
};

BackButton.propTypes = {
  handleBack: propTypes.func.isRequired,
};
export default BackButton;
