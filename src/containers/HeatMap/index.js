import React, { Component } from 'react';

import HeatMap from './heatMap';
import { heatMapData, journalsData } from './data';

class index extends Component {
  state = {
    data: [...heatMapData],
    journals: [...journalsData],
  };

  componentDidMount() {
    // We need to get the heatMap data here
  }

  // This function should show data based on day
  handleClick = value => {
    // the date of the clicked day in the same way it's stored in our DB
    if (value) {
      const currentDay = new Date(value.date).toISOString();
    }
  };

  render() {
    const { data, journals } = this.state;
    return (
      <HeatMap data={data} handleClick={this.handleClick} journals={journals} />
    );
  }
}

export default index;
