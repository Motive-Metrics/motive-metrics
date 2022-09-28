import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import PieChart from '../shared/PieChart';

function Performance() {
    const [selfAssessedPerformanceData, setSelfAssessedPerformanceData] = useState(null);
    const [peerAssessedPerformanceData, setPeerAssessedPerformanceData] = useState(null);
    const [selfDataEmptyStatus, setSelfDataEmptyStatus] = useState(null);
    const [peerDataEmptyStatus, setPeerDataEmptyStatus] = useState(null);

    useEffect(() => {
        invoke('getSelfAssessedPerformanceRatings', { example: 'my-invoke-variable' }).then(setSelfAssessedPerformanceData);
        invoke('getPeerAssessedPerformanceRatings', { example: 'my-invoke-variable' }).then(setPeerAssessedPerformanceData);
        invoke('getSelfDataEmptyStatus', { example: 'my-invoke-variable' }).then(setSelfDataEmptyStatus);
        invoke('getPeerDataEmptyStatus', { example: 'my-invoke-variable' }).then(setPeerDataEmptyStatus);
    }, []);

    const performancePieChartLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const selfPerformancePieChartTitle = 'Self Assessed Performance Ratings';
    const peerPerformancePieChartTitle = 'Peer Assessed Performance Ratings';
    
    var selfPerformancePieChart;
    var selfPerformanceMessage;
    var peerPerformancePieChart;
    var peerPerformanceMessage;

    selfPerformancePieChart = <PieChart
            labels={performancePieChartLabels}
            title={selfPerformancePieChartTitle}
            dataset={selfAssessedPerformanceData}
        />;

    peerPerformancePieChart = <PieChart
        labels={performancePieChartLabels}
        title={peerPerformancePieChartTitle}
        dataset={peerAssessedPerformanceData}
    />;

    selfPerformanceMessage = <p>There is currently no data available to display a pie chart for SELF assessed performance ratings!</p>
    peerPerformanceMessage = <p>There is currently no data available to display a pie chart for PEER assessed performance ratings!</p>

    return (
        <div>
            {selfDataEmptyStatus ? selfPerformanceMessage : selfPerformancePieChart}
            {peerDataEmptyStatus ? peerPerformanceMessage : peerPerformancePieChart}
        </div>
    );
}

export default Performance;