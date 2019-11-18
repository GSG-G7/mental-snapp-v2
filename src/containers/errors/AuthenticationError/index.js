import React from 'react';
import { Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { ReactComponent as Illustration } from '../../assets/images/athentication.svg';
import './style.css';

const UnAthenticated = porps => {
  if (localStorage.getItem('userId')) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="authentication-error">
      <Illustration />
      <p className="authentication-error__message">
        Sorry but you are not authenticated to see the content of this page
      </p>
      <Link to="/">
        <Button className="authentication-error__button" type="primary">
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default UnAthenticated;
