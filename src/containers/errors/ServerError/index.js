import React from 'react';
import { Button } from 'antd';
import { ReactComponent as Image } from '../../assets/serverError.svg';
import './style.css';

const ServerError = () => {
  return (
    <main aria-label="main content of the page">
      <div className="server-error">
        <Image className="server-error__img" alt="server error image" />
        <p className="server-error__msg">
          Oh sorry about this problem our development team is working to on it
          now.
        </p>
        <Button className="server-error__btn" type="primary">
          Go Home
        </Button>
      </div>
    </main>
  );
};

export default ServerError;
