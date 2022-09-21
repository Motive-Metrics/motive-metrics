import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import PieChart from '../shared/PieChart';

function PerformancePieChart() {
    const [performanceRatingsData, setPerformanceRatingsData] = useState(null);

    useEffect(() => {
        invoke('getPerformanceRatingsData', { example: 'my-invoke-variable' }).then(setPerformanceRatingsData);
    }, []);

    const performancePieChartLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const performancePieChartTitle = 'Performance Ratings';

    return (
        <div>
            <PieChart
                labels={performancePieChartLabels}
                title={performancePieChartTitle}
                dataset={performanceRatingsData}
            />
        </div>
    );
}

export default PerformancePieChart;