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
    const { info, checked } = this.state;
    return (
      <EditAccount
        userInfo={info}
        checked={checked}
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
