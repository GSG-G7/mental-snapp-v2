import React from 'react';
import Button from 'antd/es/button';
import { ReactComponent as Image } from '../../assets/serverError.svg';
import 'antd/es/button/style';
import './style.css';

const ServerError = () => {
  return (
    <div className="servererror">
      <Image className="servererror__img" />
      <p className="servererror__msg">
        Oh sorry about this problem our development team is working to on it
        now.
      </p>
      <Button className="servererror__btn">Go Home</Button>
    </div>
  );
};

export default ServerError;
