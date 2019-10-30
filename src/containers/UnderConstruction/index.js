import React from 'react';
import propTypes from 'prop-types';
import BackButton from '../../components/BackButton';
import { ReactComponent as ConstructionImg } from '../assets/images/underConstruction.svg';
import './style.css';

const UnderConstruction = props => {
  const {
    history: { goBack },
  } = props;
  return (
    <div className="constraction">
      <div style={{ textAlign: 'left' }}>
        <BackButton handleBack={goBack} />
      </div>

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

UnderConstruction.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
  }).isRequired,
};
export default UnderConstruction;
