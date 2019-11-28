import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Smile } from '../assets/images/smile.svg';
import { ReactComponent as Angry } from '../assets/images/angry.svg';
import { ReactComponent as Meh } from '../assets/images/meh.svg';
import { ReactComponent as Sad } from '../assets/images/sad.svg';
import { ReactComponent as Shocked } from '../assets/images/shocked.svg';
import { ReactComponent as Surprise } from '../assets/images/surprise.svg';
import './questions.css';

const Emojis = props => {
  const { emojiId, emojiClick } = props;

  return (
    <section className="emojis container">
      <Smile
        className={emojiId === '1' ? 'emoji active' : 'emoji'}
        id="1"
        onClick={emojiClick}
      />

      <Angry
        className={emojiId === '2' ? 'emoji active' : 'emoji'}
        id="2"
        onClick={emojiClick}
      />

      <Meh
        className={emojiId === '3' ? 'emoji active' : 'emoji'}
        id="3"
        onClick={emojiClick}
      />

      <Sad
        className={emojiId === '4' ? 'emoji active' : 'emoji'}
        id="4"
        onClick={emojiClick}
      />

      <Shocked
        className={emojiId === '5' ? 'emoji active' : 'emoji'}
        id="5"
        onClick={emojiClick}
      />

      <Surprise
        className={emojiId === '6' ? 'emoji active' : 'emoji'}
        id="6"
        onClick={emojiClick}
      />
    </section>
  );
};

Emojis.propTypes = {
  emojiId: PropTypes.number.isRequired,
  emojiClick: PropTypes.func.isRequired,
};

export default Emojis;
