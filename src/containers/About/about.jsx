import React from 'react';
import { ReactComponent as Illustration } from '../assets/images/about.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import Aboutdata from './data';
import './about.css';

const About = () => {
  return (
    <div className="about">
      <p className="about__heading">About</p>
      <Illustration />
      {Aboutdata.map(data => {
        return (
          <div key={data.id}>
            <p className="about__title">{data.title}</p>
            <p className="about__content">{data.descrption}</p>
          </div>
        );
      })}
      <Logo />
    </div>
  );
};

export default About;
