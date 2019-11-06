import React from 'react';

import propTypes from 'prop-types';

import { Button, Input, Progress, Icon, Popconfirm } from 'antd';

import BackButton from '../../components/BackButton';
import entryData from './data';

import './questions.css';

const { TextArea } = Input;

const Question = props => {
  const {
    handleNext,
    handlePrev,
    handleSubmit,
    handleChange,
    handleSkip,
    handleGoBack,
    handleConfirm,
    state: { current, title, content, errors },
  } = props;

  return (
    <div>
      <div className="question__navigation">
        {current > 0 ? (
          <Icon type="left" onClick={handlePrev} />
        ) : (
          <BackButton handleBack={handleGoBack} />
        )}
        <div>
          <Popconfirm
            title="Do you really want to exit?"
            onConfirm={handleConfirm}
            okText="Yes"
            cancelText="cancel"
          >
            <Icon type="close" />
          </Popconfirm>
        </div>
      </div>
      <div className="question__type">
        <p>
          Question
          <span className="question__count">
            {current + 1}
            /3
          </span>
        </p>
        <Progress
          percent={entryData[current].percent}
          size="small"
          showInfo={false}
        />
        <p>{entryData[current].heading}</p>
        <div className="question__title">
          <Input
            placeholder="Title"
            name="title"
            value={title}
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.title && (
            <span className="question__error-field">{errors.title}</span>
          )}
        </div>
        <div className="question__content">
          <TextArea
            rows={4}
            placeholder="Write your words"
            name="content"
            value={content}
            onChange={handleChange}
          />
          {errors.content && (
            <span className="question__error-field">{errors.content}</span>
          )}
        </div>
      </div>

      <div className="question__steps-action">
        {current < entryData.length - 1 ? (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="primary" onClick={handleSubmit}>
            Done
          </Button>
        )}

        <Button className="question__skip" onClick={handleSkip}>
          Skip
        </Button>
      </div>
    </div>
  );
};

Question.propTypes = {
  handleNext: propTypes.func.isRequired,
  handlePrev: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  handleSkip: propTypes.func.isRequired,
  handleGoBack: propTypes.func.isRequired,
  handleConfirm: propTypes.func.isRequired,
  state: propTypes.shape({
    current: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
    errors: propTypes.object.isRequired,
  }).isRequired,
};
export default Question;
