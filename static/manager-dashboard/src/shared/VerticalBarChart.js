import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart = (props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: props.text,
            },
        },
    };

    const labels = props.xAxisLabels;

    const data = {
        labels,
        datasets: props.dataSet,
    };
    return <Bar options={options} data={data} />;
}

export default VerticalBarChart