import React from 'react';
import Button from 'antd/es/button';
import { ReactComponent as Logo } from './vector.svg';
import 'antd/es/button/style';
import './style.css';

const ClientError = () => {
  return (
    <div className="error">
      <Logo />
      <p className="error__message">
        Oh sorry about this but this page does not exist
      </p>
      <Button className="error__btn" type="primary">
        Go Home
      </Button>
    </div>
  );
};

export default ClientError;
