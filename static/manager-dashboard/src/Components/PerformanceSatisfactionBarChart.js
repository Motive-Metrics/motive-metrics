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

    return (
        <div>
            <VerticalBarChart
                text={barChartTitle}
                xAxisLabels={performancePieChartLabels}
                dataset1Label={barChartDatasetLabel1}
                dataSet1={performanceRatingsData}
                dataset2Label={barChartDatasetLabel2}
                dataSet2={satisfactionData}
            />
        </div>
    );
}

export default PerformanceSatisfactionBarChart;