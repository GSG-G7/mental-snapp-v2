import React from 'react';
import propTypes from 'prop-types';
import { ReactComponent as Illustration } from '../assets/images/about.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import Aboutdata from './data';
import MainHeading from '../../components/MainHeading/index';
import BackButton from '../../components/BackButton/index';

import './about.css';

const About = props => {
  const {
    history: { goBack },
  } = props;
  return (
    <div className="about">
      <div className="about__heading">
        <BackButton handleBack={goBack} />
        <MainHeading text="About" />
      </div>
      <Illustration />
      {Aboutdata.map(data => (
        <div key={data.id}>
          <p className="about__title">{data.title}</p>
          <p className="about__content">{data.descrption}</p>
        </div>
      ))}
      <Logo className="about__img" />
    </div>
  );
};

About.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
  }).isRequired,
};
export default About;
