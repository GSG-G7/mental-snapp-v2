import React from 'react';
import { Button } from 'antd';
import { ReactComponent as Illustration } from '../assets/images/landing.svg';
import MainHeading from '../../components/MainHeading/index';
import SubHeading from '../../components/subHeading/index';
import './landing.css';

const LandingPage = () => {
  return (
    <div>
      <Illustration className="Illustration" />
      <div className="landing">
        <div className="landing__title">
          <MainHeading text="Practice the art of good mental health" />
        </div>
        <div className="landing__content">
          <SubHeading text="Tell your story and positively guide your thoughts" />
        </div>
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
