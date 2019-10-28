import React from 'react';
import { Button } from 'antd';
import { ReactComponent as Illustration } from './vector.svg';
import './landing.css';

const LandingPage = () => {
  return (
    <div>
      <Illustration />
      <div className="landingPAge">
        <p className="landingPage__title">
          Practice the art of good mental health
        </p>
        <p className="landingPage__content">
          Tell your story and positively guide your thoughts
        </p>
        <Button type="primary" className="landingPage__button">
          Sign In
        </Button>
        <p className="landingPage__signUpLink">Create a new account</p>
        <p className="landingPage__aboutLink">
          Read more about
          <span className="landingPage__logo">Mental Snapp</span>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
