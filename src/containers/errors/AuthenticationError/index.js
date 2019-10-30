import React from 'react';
import { Button } from 'antd';
import { LANDING } from '../../../constants/routes';
import { ReactComponent as Illustration } from '../../assets/images/athentication.svg';
import './style.css';

const UnAthenticated = porps => {
  return (
    <div className="authentication-error">
      <Illustration />
      <p className="authentication-error__message">
        Sorry but you are not authorized to see the content of this page
      </p>
      <Button
        className="authentication-error__button"
        type="primary"
        onClick={() => porps.history.push(LANDING)}
      >
        Go Home
      </Button>
    </div>
  );
};

export default UnAthenticated;
