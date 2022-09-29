import { React, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import './Chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {
  
  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
    
  const labels = props.xAxis;
  return <Line className="Chart" options={options} data={props.data} />;
}

export default LineChart;