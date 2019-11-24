import React, { Component } from 'react';

import { Button } from 'antd';

import TimerMachine from 'react-timer-machine';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import Header from '../../components/Header';
import { ReactComponent as Img } from '../assets/images/email-sent.svg';

import './style.css';

class EmailSent extends Component {
  state = {
    completed: false,
  };

  resend = async () => {
    try {
      const { firebase } = this.props;

      const userEmail = await localStorage.getItem('userEmail');
      await firebase.forgotPassword(userEmail);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      history: { goBack },
    } = this.props;
    const { completed } = this.state;
    return (
      <section className="email-sent container">
        <Header text="Email Sent" handleBack={goBack} />
        <Img className="email-sent__img" />

        <article className="email-sent__description">
          <p>We have sent a message to your mail</p>
          <div>If you didn&apos;t receive a message you can resend it in</div>
          <Button
            type="primary"
            className="email-sent__btn"
            disabled={!completed}
            onClick={this.resend}
          >
            {!completed ? (
              <TimerMachine
                className="btn__content"
                started
                countdown
                timeStart={5 * 1000}
                onComplete={() => {
                  this.setState({ completed: true });
                }}
                formatTimer={(time, ms) =>
                  moment.duration(ms, 'milliseconds').format('h:mm:ss')}
              />
            ) : (
              <p className="btn__content">Resend</p>
            )}
          </Button>
        </article>
      </section>
    );
  }
}

export default EmailSent;
