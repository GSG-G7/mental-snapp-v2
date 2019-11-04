import React, { Component } from 'react';

import HeatMap from './heatMap';
import fakeData from './data';

class index extends Component {
  state = {
    data: [...fakeData],
  };

  // This function should show data based on day
  handleClick = value => {
    // the date of the clicked day in the same way it's stored in our DB
    if (value) {
      const currentDay = new Date(value.date).toISOString();
    }
  };

  render() {
    const { data } = this.state;
    return <HeatMap data={data} handleClick={this.handleClick} />;
  }
}

export default index;
