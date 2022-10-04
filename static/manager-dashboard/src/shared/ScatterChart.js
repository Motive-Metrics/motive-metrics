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
              title: {
                display: true,
                text: 'Average Score',
                align: 'center'
              }, 
              min: 0,
              max: 4
            },
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dimension Prevalence',
                align: 'center'
              }, 
              min: 0,
              max: 120
            },
        },
    };
  return <Scatter options={options} data={props.data} />;
}

export default ScatterChart;
