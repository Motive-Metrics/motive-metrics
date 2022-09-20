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

const RadarChart = ({name, labels, dataPoints, borderColour, backgroundColour}) => {
      
  const data = {
      labels,
      datasets: [
          {
          label: name,
          data: dataPoints,
          borderColor: borderColour,
          backgroundColor: backgroundColour,
          borderWidth: 2,
          },
      ],
  };
  return <Radar data={data}/>;
}

export default RadarChart;