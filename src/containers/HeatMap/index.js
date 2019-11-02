import React, { Component } from 'react';

import HeatMap from './heatMap';
import data from './data';

class index extends Component {
  state = {
    options: {
      plotOptions: {
        heatmap: {
          enableShades: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 1,
                color: '#FEC3B1',
                name: 'normal activity',
              },
              {
                from: 2,
                to: 3,
                color: '#F2AC95',
                name: 'more activity',
              },
              {
                from: 4,
                to: 10,
                color: '#FC8D6B',
                name: 'high activity',
              },
            ],
          },
        },
      },
    },
    series: [...data],
  };

  render() {
    const { options, series } = this.state;
    return <HeatMap options={options} series={series} />;
  }
}

export default index;
