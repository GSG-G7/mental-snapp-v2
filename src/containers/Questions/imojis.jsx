import React, { Component, useState } from 'react';
import { ReactComponent as Happy } from '../assets/images/happy.svg';
import './questions.css';

class Imojis extends Component {
  state = {
    emojiId: 0,
  };

  getId = ({ target: { id } }) => {
    this.setState({ emojiId: id });
  };

  render() {
    const { emojiId } = this.state;
    return (
      <div className="emojis container">
        <section className="emojis__container">
          <Happy
            className={emojiId == 1 ? 'emoji active' : 'emoji'}
            id="1"
            onClick={this.getId}
          />

          <Happy
            className={emojiId == 2 ? 'emoji active' : 'emoji'}
            id="2"
            onClick={this.getId}
          />

          <Happy
            className={emojiId == 3 ? 'emoji active' : 'emoji'}
            id="3"
            onClick={this.getId}
          />

          <Happy
            className={emojiId == 4 ? 'emoji active' : 'emoji'}
            id="4"
            onClick={this.getId}
          />

          <Happy
            className={emojiId == 5 ? 'emoji active' : 'emoji'}
            id="5"
            onClick={this.getId}
          />

          <Happy
            className={emojiId == 6 ? 'emoji active' : 'emoji'}
            id="6"
            onClick={this.getId}
          />
        </section>
      </div>
    );
  }
}

export default Imojis;
