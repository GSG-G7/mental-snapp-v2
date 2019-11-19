import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Journal = ({ question, questionTitle }) => {
  return (
    <div className="container">
      <div className="journal">
        <section className="journal__header">
          <h5 className="journal__question-title">
            {`${questionTitle} `}
            <span className="journal__title">{question.title}</span>
          </h5>
        </section>
        <section className="journal__body">
          <p>{question.body}</p>
        </section>
      </div>
    </div>
  );
};

Journal.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  questionTitle: PropTypes.string.isRequired,
};
export default Journal;
