import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ScatterChart = (props) => {
    const options = {
        scales: {
            y: {
            beginAtZero: true,
            },
        },
    };
  return <Scatter options={options} data={props.data} />;
}

export default ScatterChart;
