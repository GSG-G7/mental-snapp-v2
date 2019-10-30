import React from 'react';
import BackButton from '../../components/BackButton';
import { ReactComponent as ConstructionImg } from '../assets/images/underConstruction.svg';
import './style.css';

const UnderConstruction = porps => {
  return (
    <div className="constraction">
      <BackButton back={() => console.log('hi')} />

      <div style={{ paddingTop: '20vh' }}>
        <ConstructionImg />
      </div>
      <h2 className="constraction__heading">
        <p className="constraction__heading__p">page</p>
        under construction
      </h2>
    </div>
  );
};

export default UnderConstruction;
