import React from 'react';
import { ReactComponent as Illustration } from '../assets/images/about.svg';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import './about.css';

const About = () => {
  return (
    <div className="about">
      <p className="about__heading">About</p>
      <Illustration />
      <div>
        <p className="about__title">Mental Snapp</p>
        <p className="about__content">
          Welcome to Mental Snapp. Because good mental health is an art built on
          the habit of catching and appreciating ordinary moments. Journalling
          is a way to do just that - tell your story and guide your thoughts to
          a positive and honest frame of mind.
        </p>
      </div>
      <div>
        <p className="about__title">How it works </p>
        <p className="about__content">
          Our journalling technique is based on a system that has been practiced
          by monks since the Middle Ages, the Daily Examen. It’s based on three
          questions: What am I grateful for? Recognising good things. A chance
          to be thankful. What challenges do I face? Acknowledging - not denying
          - daily challenges. What am I developing? Noting the character
          strengths and new skills that can come out of current circumstances.
        </p>
      </div>
      <div>
        <p className="about__title">Journaling Process</p>
        <p className="about__content">
          These three questions, answered regularly, are more than the sum of
          their parts. They add up to a journalling practice that will help
          clarity, confidence and self compassion.
        </p>
      </div>
      <div>
        <p className="about__title"> You are not alone!</p>
        <p className="about__content">
          However you feel each day, you are not alone. You are practicing the
          art of good mental health in some good company. We are a group of
          people who practice creative approaches to mental health to live more
          confident lives. Tell your story here and join in the conversation in
          our group.
        </p>
      </div>
      <Logo />
    </div>
  );
};

export default About;
