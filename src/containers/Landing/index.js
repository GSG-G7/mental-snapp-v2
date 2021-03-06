import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { ReactComponent as Illustration } from '../assets/images/landing.svg';
import MainHeading from '../../components/MainHeading/index';
import SubHeading from '../../components/subHeading/index';
import { SIGN_UP, ABOUT, SIGN_IN } from '../../constants/routes';
import './landing.css';

const LandingPage = () => {
  /* if (localStorage.getItem('userId')) {
    return <Redirect to={HOME} />;
  } */
  const userId = localStorage.getItem('userId');
  return (
    <div className="landing-page">
      <div className="landing__img">
        <Illustration className="Illustration" />
      </div>
      <div className="landing">
        <div className="landing__title">
          <MainHeading text="Practice the art of good mental health" />
        </div>
        <div className="landing__content">
          <SubHeading text="Tell your story and positively guide your thoughts" />
        </div>
        <Link to={SIGN_IN}>
          <Button
            type="primary"
            className="landing__button"
            onClick={() => <Redirect to={SIGN_IN} />}
          >
            {userId ? 'Go to recent journals' : 'Sign In'}
          </Button>
        </Link>
        {!userId && (
          <Link to={SIGN_UP}>
            <p className="landing__link">Create a new account</p>
          </Link>
        )}
        <p className="landing__aboutLink" style={{ paddingTop: '1rem' }}>
          Read more about
          <Link to={ABOUT}>
            <span className="landing__logo link">Mental Snapp</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
