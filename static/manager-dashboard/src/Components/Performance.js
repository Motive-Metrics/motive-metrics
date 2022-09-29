import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import PieChart from '../shared/PieChart';
import VerticalBarChart from '../shared/VerticalBarChart';
import './Performance.css';

function Performance() {
    const [selfAssessedPerformanceData, setSelfAssessedPerformanceData] = useState(null);
    const [peerAssessedPerformanceData, setPeerAssessedPerformanceData] = useState(null);
    const [selfDataEmptyStatus, setSelfDataEmptyStatus] = useState(null);
    const [peerDataEmptyStatus, setPeerDataEmptyStatus] = useState(null);
    const [satisfactionData, setSatisfactionData] = useState(null);

    useEffect(() => {
        invoke('getSelfAssessedPerformanceRatings', { example: 'my-invoke-variable' }).then(setSelfAssessedPerformanceData);
        invoke('getPeerAssessedPerformanceRatings', { example: 'my-invoke-variable' }).then(setPeerAssessedPerformanceData);
        invoke('getSelfDataEmptyStatus', { example: 'my-invoke-variable' }).then(setSelfDataEmptyStatus);
        invoke('getPeerDataEmptyStatus', { example: 'my-invoke-variable' }).then(setPeerDataEmptyStatus);
        invoke('getSatisfactionRatingsData', { example: 'my-invoke-variable' }).then(setSatisfactionData);
    }, []);

    const performancePieChartLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const selfPerformancePieChartTitle = 'Self Assessed Performance Ratings';
    const peerPerformancePieChartTitle = 'Peer Assessed Performance Ratings';
    const performanceBarChartTitle = 'Performance Ratings';
    const performanceSatisfactionTitle = 'Performance vs Satisfaction Ratings';
    const performanceBarChartLabel1 = 'SELF Assessed Performance';
    const performanceBarChartLabel2 = 'PEER Assessed Performance';
    const satisfactionBarChartLabel = 'Satisfaction Ratings';
    
    const performanceBarChartDataset = [
        {
          label: performanceBarChartLabel1,
          data: selfAssessedPerformanceData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: performanceBarChartLabel2,
          data: peerAssessedPerformanceData,
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ];
    
    const performanceSatisfactionDataset = [
    {
        label: performanceBarChartLabel1,
        data: selfAssessedPerformanceData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: satisfactionBarChartLabel,
        data: satisfactionData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    ];
    
    var selfPerformancePieChart;
    var selfPerformanceMessage;
    var peerPerformancePieChart;
    var peerPerformanceMessage;
    var performanceBarChart;
    var performanceStisfactionBarChart;

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

    performanceBarChart = <VerticalBarChart
        text={performanceBarChartTitle}
        xAxisLabels={performancePieChartLabels}
        dataSet={performanceBarChartDataset}
    />;

    performanceStisfactionBarChart = <VerticalBarChart
        text={performanceSatisfactionTitle}
        xAxisLabels={performancePieChartLabels}
        dataSet={performanceSatisfactionDataset}
    />;

    selfPerformanceMessage = <p>There is currently no data available to display a pie chart for SELF assessed performance ratings!</p>
    peerPerformanceMessage = <p>There is currently no data available to display a pie chart for PEER assessed performance ratings!</p>

    return (
        <div>
            <div class="row">
                <div class="column">
                    <h3 class="h3-text">SELF Assessed Performance Ratings</h3>
                    {selfDataEmptyStatus ? selfPerformanceMessage : selfPerformancePieChart}
                </div>
                <div class="column">
                    <h3 class="h3-text">PEER Assessed Performance Ratings</h3>
                    {peerDataEmptyStatus ? peerPerformanceMessage : peerPerformancePieChart}
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <h3 class="h3-text">Performance Ratings</h3>
                    {performanceBarChart}
                </div>
                <div class="column">
                    <h3 class="h3-text">SELF Assessed Performance vs Satisfaction Ratings</h3>
                    {performanceStisfactionBarChart}
                </div>
            </div>
            <br/>
        </div>
    );
}

export default Performance;