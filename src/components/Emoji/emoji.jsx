import React from 'react';
import PropTypes from 'prop-types';

import Feelings from './EmojiData';

const Emoji = ({ feeling, className }) => {
  return (
    <img
      className={className}
      src={Feelings[feeling - 1].photo}
      alt={Feelings[feeling - 1].alt}
    />
  );
};

Emoji.propTypes = {
  feeling: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Emoji;
