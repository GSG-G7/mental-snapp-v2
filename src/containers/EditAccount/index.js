import React, { Component } from 'react';
import EditAccount from './editAccount';

class Edit extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    info: {
      name: 'Fares',
      email: 'fares@gmail.com',
    },
    // eslint-disable-next-line react/no-unused-state
    checked: false,
  };

  // eslint-disable-next-line react/no-unused-state
  onChange = ({ target: { checked } }) => this.setState({ checked });

  render() {
    return <EditAccount state={this.state} handleChange={this.onChange} />;
  }
}

export default Edit;
