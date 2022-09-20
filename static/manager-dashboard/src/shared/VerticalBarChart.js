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
    //props need: text, xAxisLabels, dataset1Label, dataSet1
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
        datasets: [
          {
            label: props.dataset1Label,
            data: props.dataSet1,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: props.dataset2Label,
            data: props.dataSet2,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };
    return <Bar options={options} data={data} />;
}

export default VerticalBarChart