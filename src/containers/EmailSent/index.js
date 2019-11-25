import React, { Component } from 'react';

import { Button, message } from 'antd';

import TimerMachine from 'react-timer-machine';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

import Header from '../../components/Header';
import { ReactComponent as Img } from '../assets/images/email-sent.svg';

import './style.css';

class EmailSent extends Component {
  state = {
    completed: false,
  };

  resend = async () => {
    const { firebase } = this.props;
    try {
      const userEmail = await localStorage.getItem('userEmail');
      await firebase.forgotPassword(userEmail);
      message.success('Check your email ');
      this.setState({ completed: false });
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
            onSubmit={this.handleSubmit}
          >
            {!completed ? (
              <TimerMachine
                className="btn__content"
                started
                countdown
                timeStart={30 * 1000}
                formatTimer={ms =>
                  moment.duration(ms, 'milliseconds').format('h:mm:ss')}
                onComplete={() => {
                  this.setState({ completed: true });
                }}
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

EmailSent.propTypes = {
  firebase: PropTypes.shape().isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
};

export default withFirebase(EmailSent);
