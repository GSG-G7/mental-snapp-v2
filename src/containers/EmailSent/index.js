import React, { Component } from 'react';

import { Button, message } from 'antd';

import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';
import Header from '../../components/Header';
import { ReactComponent as Img } from '../assets/images/email-sent.svg';

import './style.css';

class EmailSent extends Component {
  state = {
    completed: false,
    time: 30,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ time }) => {
        if (time > 0) {
          return { time: time - 1 };
        }
        clearInterval(this.timer);
        return { completed: true, time: 30 };
      });
    }, 1000);
  }

  stopTimer = () => {
    this.setState({ completed: true, time: 30 });
    clearInterval(this.timer);
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState(({ time }) => {
        if (time > 0) {
          return { time: time - 1 };
        }
        clearInterval(this.timer);
        return { completed: true, time: 30 };
      });
    }, 1000);
  };

  resend = async () => {
    const {
      firebase,
      history: { push },
    } = this.props;
    try {
      const userEmail = await localStorage.getItem('userEmail');
      await firebase.forgotPassword(userEmail);
      message.success('Check your email ');
      this.setState({ completed: false, time: 30 });
      this.startTimer();
    } catch (err) {
      push('/server-error');
    }
  };

  render() {
    const {
      history: { goBack },
    } = this.props;
    const { completed, time } = this.state;
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
              <span>{time}</span>
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
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(EmailSent);
