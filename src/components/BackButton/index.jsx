import React from 'react';
import { Icon } from 'antd';
import './backbutton.css';
import propTypes from 'prop-types';

const BackButton = props => {
  const { back } = props;
  return (
    <button type="submit" className="back-button" onClick={back()}>
      <Icon type="left" />
    </button>
  );
};

BackButton.propTypes = {
  back: propTypes.func.isRequired,
};
export default BackButton;
