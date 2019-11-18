import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'antd/es/button';
import { ReactComponent as Logo } from '../../assets/images/vector.svg';
import 'antd/es/button/style';
import './style.css';
import * as ROUTES from '../../../constants/routes';

const ClientError = () => {
  return (
    <div className="error">
      <Logo />
      <p className="error__message">
        Oh sorry about this but this page does not exist
      </p>
      <Link to={ROUTES.LANDING}>
        <Button className="error__btn" type="primary">
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default ClientError;
