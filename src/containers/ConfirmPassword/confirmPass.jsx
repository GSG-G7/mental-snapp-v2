import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import { ReactComponent as ConfirmImg } from '../assets/images/confirmPass.svg';
import Header from '../../components/Header';

import './confirmPass.css';

const confirmPass = props => {
  const {
    history: { goBack },
  } = props;
  return (
    <div className="confirm-pass">
      <Header text="Confirm Password" handleBack={goBack} />

      <section className="confirm-pass__body">
        <p className="confirm-Password__text">
          This is to make sure it&apos;s you!
        </p>
        <Form className="confirm-pass__form">
          <Input
            type="password"
            placeholder="Enter your password"
            prefix={<Icon type="lock" className="confirm-pass__form__icon" />}
            size="large"
            aria-label="Enter your password"
          />
          <Button type="primary" size="large">
            Procceed To Edit
          </Button>
        </Form>
        <ConfirmImg className="confirm-pass__img" />
      </section>
    </div>
  );
};

confirmPass.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default confirmPass;
