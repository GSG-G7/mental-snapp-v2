/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditAccount from './editAccount';

class Index extends Component {
  state = {
    info: {
      name: 'Fares',
      email: 'fares@gmail.com',
    },
    checked: false,
  };

  onChange = ({ target: { checked } }) => this.setState({ checked });

  render() {
    const {
      history: { goBack },
    } = this.props;
    return (
      <EditAccount
        state={this.state}
        handleChange={this.onChange}
        handleGoBack={goBack}
      />
    );
  }
}

Index.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Index;
