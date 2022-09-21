import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import VerticalBarChart from '../shared/VerticalBarChart';

function PerformanceSatisfactionBarChart() {
    const [performanceRatingsData, setPerformanceRatingsData] = useState(null);

    useEffect(() => {
        invoke('getPerformanceRatingsData', { example: 'my-invoke-variable' }).then(setPerformanceRatingsData);
    }, []);

    const performancePieChartLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const barChartTitle = 'Performance & Satisfaction Ratings';
    const barChartDatasetLabel1 = 'Performance';
    const barChartDatasetLabel2 = 'Satisfaction';
    const satisfactionData = [2, 1, 3, 5, 2]; // replace with actual satisfaction data
    const dataset = [
        {
          label: barChartDatasetLabel1,
          data: performanceRatingsData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: barChartDatasetLabel2,
          data: satisfactionData,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ];

    return (
        <div>
            <VerticalBarChart
                text={barChartTitle}
                xAxisLabels={performancePieChartLabels}
                dataSet={dataset}
            />
        </div>
    );
}

export default PerformanceSatisfactionBarChart;