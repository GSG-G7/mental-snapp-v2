import React from 'react';
import { Button } from 'antd';
import { ReactComponent as Illustration } from '../assets/images/landing.svg';
import './landing.css';

const LandingPage = () => {
  return (
    <div>
      <Illustration className="Illustration" />
      <div className="landing">
        <p className="landing__title">Practice the art of good mental health</p>
        <p className="landing__content">
          Tell your story and positively guide your thoughts
        </p>
        <Button type="primary" className="landing__button">
          Sign In
        </Button>
        <p className="landing__link">Create a new account</p>
        <p className="landing__aboutLink">
          Read more about
          <span className="landing__logo">Mental Snapp</span>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
