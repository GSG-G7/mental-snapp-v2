import React from 'react';
import PropTypes from 'prop-types';

import Feelings from './EmojiData';
import './emoji.css';

const Emoji = ({ feeling }) => {
  return (
    <img
      className="journal-card__icon--feeling"
      src={Feelings[feeling - 1].photo}
      alt={Feelings[feeling - 1].alt}
    />
  );
};

Emoji.propTypes = {
  feeling: PropTypes.number.isRequired,
};

export default Emoji;
