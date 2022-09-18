import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
    // props need: labels, title, dataset
    const labels = props.labels;
    const label = props.title;

    const data = {
        labels,
        datasets: [
            {
            label,
            data: props.dataset,
            backgroundColor: [
                'rgba(242, 58, 58, 0.2)', // Bad -> Red
                'rgba(245, 164, 59, 0.2)', // Somewhat Bad -> Orange
                'rgba(219, 216, 213, 0.2)', // Okay -> Grey
                'rgba(255, 206, 86, 0.2)', // Somwhat Good -> Yellow
                'rgba(75, 192, 192, 0.2)', // Good -> Green
            ],
            borderColor: [
                'rgba(242, 58, 58, 1)', // Bad -> Red
                'rgba(245, 164, 59, 1)', // Somewhat Bad -> Orange
                'rgba(219, 216, 213, 1)', // Okay -> Grey
                'rgba(255, 206, 86, 1)', // Somwhat Good -> Yellow
                'rgba(75, 192, 192, 1)', // Good -> Green
            ],
            borderWidth: 1,
            },
        ],
    }
    return <Pie data={data} />;
}

export default PieChart;




