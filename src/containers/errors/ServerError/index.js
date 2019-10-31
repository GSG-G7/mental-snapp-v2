import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ReactComponent as Image } from '../../assets/serverError.svg';
import * as ROUTES from '../../../constants/routes';
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
        <Link to={ROUTES.HOME}>
          <Button className="server-error__btn" type="primary">
            Go Home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default ServerError;
