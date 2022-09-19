import { React, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import './Chart.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = (props) => {
  

    
  const data = {
      labels: props.labels,
      datasets: [
          {
          label: 'Dataset 1',
          data: props.labels.map(() => Math.floor(Math.random() * 1000)),
          borderColor: props.colour,
          backgroundColor: props.colour,
          borderWidth: 1,
          },
      ],
  };
  return <Radar data={data}/>;
}

export default RadarChart;