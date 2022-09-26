import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import PieChart from '../shared/PieChart';

function Performance() {
    const [selfAssessedPerformanceData, setSelfAssessedPerformanceData] = useState(null);
    const [peerAssessedPerformanceData, setPeerAssessedPerformanceData] = useState(null);

    useEffect(() => {
        invoke('getSelfAssessedPerformanceRatings', { example: 'my-invoke-variable' }).then(setSelfAssessedPerformanceData);
        invoke('getPeerAssessedPerformanceRatings', { example: 'my-invoke-variable' }).then(setPeerAssessedPerformanceData);
    }, []);

    const performancePieChartLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const selfPerformancePieChartTitle = 'Self Assessed Performance Ratings';
    const peerPerformancePieChartTitle = 'Peer Assessed Performance Ratings';

    return (
        <div>
            <PieChart
                labels={performancePieChartLabels}
                title={selfPerformancePieChartTitle}
                dataset={selfAssessedPerformanceData}
            />
            <PieChart
                labels={performancePieChartLabels}
                title={peerPerformancePieChartTitle}
                dataset={peerAssessedPerformanceData}
            />
        </div>
    );
}

export default Performance;