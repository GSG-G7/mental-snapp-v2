import React from 'react';
import { ReactComponent as Illustration } from '../assets/images/about.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import Aboutdata from './data';
import MainHeading from '../../components/MainHeading/index';
import './about.css';

const About = () => {
  return (
    <div className="about">
      <MainHeading text="About" />
      <Illustration />
      {Aboutdata.map(data => (
        <div key={data.id}>
          <p className="about__title">{data.title}</p>
          <p className="about__content">{data.descrption}</p>
        </div>
      ))}
      <Logo />
    </div>
  );
};

export default About;
