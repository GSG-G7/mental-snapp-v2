import React from 'react';
import propTypes from 'prop-types';
import { message } from 'antd';
import Question from './questions';

import schema from './questionValidation';
import entryData from './data';

class Questions extends React.Component {
  state = {
    current: 0,
    title: '',
    content: '',
    errors: {},
    journals: [],
  };

  handleConfirm = e => {
    message.warning("You didn't make an entry today");
    const { history } = this.props;
    history.push('/home');
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value, errors: {} });
  };

  handleNext = async () => {
    const { current, title, content, journals } = this.state;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      journals.push({ title, content });
      return this.setState({
        current: current + 1,
        content: '',
        title: '',
        errors: {},
      });
    } catch (error) {
      const objError = {};
      error.inner.forEach(fielderror => {
        objError[fielderror.path] = fielderror.message;
      });
      return this.setState({ errors: objError });
    }
  };

  handleSubmit = async () => {
    const { title, content, journals } = this.state;
    const { history } = this.props;
    try {
      await schema.validate({ title, content }, { abortEarly: false });
      journals.push({ title, content });
      message.success('Yes, you have added a journal');
      history.push('/home');
      // here, a request will be post to firebase to save data
      // that will be as follows : [{title:'', content:'', time:'', date:'',month:''}]
      return this.setState({ journals: [] });
    } catch (error) {
      const objError = {};
      error.inner.forEach(fielderror => {
        objError[fielderror.path] = fielderror.message;
      });
      return this.setState({ errors: objError });
    }
  };

  handlePrev = () => {
    const { current } = this.state;
    const curr = current - 1;
    this.setState({ current: curr, errors: {} });
  };

  handleSkip = () => {
    const { current, journals } = this.state;
    if (current < entryData.length - 1) {
      const curr = current + 1;
      this.setState({ current: curr, errors: {} });
    } else {
      const { history } = this.props;
      if (journals.length !== 0) {
        message.success('Yes, you have added a journal');
        history.push('/home');
        // here, a request will be post to firebase to save data
        // that will be as follows : [{title:'', content:'', time:'', date:'',month:''}]
        this.setState({ journals: [] });
      } else {
        message.warning("You didn't make an entry today");
        history.push('/home');
      }
    }
  };

  render() {
    const {
      history: { goBack },
    } = this.props;
    const { errors } = this.state;
    return (
      <Question
        state={this.state}
        handleNext={this.handleNext}
        handlePrev={this.handlePrev}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleSkip={this.handleSkip}
        handleGoBack={goBack}
        handleConfirm={this.handleConfirm}
        errors={errors}
      />
    );
  }
}

Questions.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  }).isRequired,
};

export default Questions;
