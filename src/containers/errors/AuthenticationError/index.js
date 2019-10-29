import React from 'react';
import { Button } from 'antd';
import { ReactComponent as Illustration } from '../../assets/images/athentication.svg';
import './style.css';

const UnAthenticated = () => {
  return (
    <div className="error">
      <Illustration />
      <p className="error__message">
        Sorry but you are not authorized to see the content of this page
      </p>
      <Button className="error__button" type="primary">
        Go Home
      </Button>
    </div>
  );
};

export default UnAthenticated;
