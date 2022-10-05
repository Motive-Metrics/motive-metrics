import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import VerticalBarChart from '../shared/VerticalBarChart';
import './DimensionsChart.css';

function DimensionsChart({users}) {
    const [dataPoints, setDataPoints] = useState([
        [],
        [],
        []
    ]);

    const domains = {
        Agreeableness: 0,
        Conscientiousness: 1,
        Extraversion: 2,
        Neuroticism: 3,
        'Openness To Experience': 4
    };

    useEffect(() => {
        if (users != null) {
            const data = [
                [0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];
            for (const user of users) {
                if (user.hasOwnProperty('personality')) {
                    for (const domain in domains) {
                        if (user.personality[domain].total <= 40) {
                            data[0][domains[domain]] += 1;
                        } else if (user.personality[domain].total > 40 && user.personality[domain].total <= 80) {
                            data[1][domains[domain]] += 1;
                        } else {
                            data[2][domains[domain]] += 1;
                        }
                    }
                }
            }
            setDataPoints(data);
        }
    }, [users]);

    const dataset = [
        {
            label: 'Low (0 - 40)',
            data: dataPoints[0],
            backgroundColor: 'rgba(66, 135, 245, 0.5)',
        },
        {
            label: 'Average (41 - 80)',
            data: dataPoints[1],
            backgroundColor: 'rgba(37, 88, 168, 0.5)',
        },
        {
            label: 'Above Average (81 - 120)',
            data: dataPoints[2],
            backgroundColor: 'rgba(14, 33, 64, 0.5)',
        },
    ];
    
    const scales = {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '# of Users',
            align: 'center'
          }, 
        },
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Dimensions',
            align: 'center'
          }, 
        },
    };

    return (
        <div className='chart'>
            <VerticalBarChart
                text=''
                xAxisLabels={['Agreeableness', 'Conscientiousness', 'Extraversion', 'Neuroticism', 'Openness To Experience']}
                dataSet={dataset}
                scales={scales}
            />
        </div>
    );
}
export default DimensionsChart;