import React, { Component } from 'react';

import HeatMap from './heatMap';
import { heatMapData, journalsData } from './data';

class index extends Component {
  state = {
    data: [...heatMapData],
    journals: [],
  };

  componentDidMount() {
    // We need to get the heatMap data here
  }

  // This function should show data based on day
  handleClick = value => {
    // the date of the clicked day in the same way it's stored in our DB
    if (value && value.count) {
      const currentDay = new Date(value.date).getDay();
      const journalsOfTheDay = journalsData.filter(
        journal => new Date(journal.timestamp).getDay() === currentDay
      );
      this.setState({ journals: [...journalsOfTheDay] });
    } else {
      this.setState({ journals: [] });
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
