import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Chart from './shared/Chart';
import PieChart from './shared/PieChart';
import VerticalBarChart from './shared/VerticalBarChart';

function App() {
    const [data, setData] = useState(null);
    const [performanceRatingsData, setPerformanceRatingsData] = useState(null);

    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
        invoke('getPerformanceRatingsData', { example: 'my-invoke-variable' }).then(setPerformanceRatingsData);
    }, []);

    const xData = ['11/11/21', '11/12/21', '11/13/21', '11/14/21', '11/15/21', '11/16/21', '11/18/21'];
    const colour='rgba(0, 82, 204)'

    const performancePieChartLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const performancePieChartTitle = 'Performance Ratings';

    const barChartTitle = 'Performance & Satisfaction Ratings';
    const barChartDatasetLabel1 = 'Performance';
    const barChartDatasetLabel2 = 'Satisfaction';
    const satisfactionData = [2, 1, 3, 5, 2];


    return (
        <div>
            {data ? data : 'Loading Data...'}
            <div>
                <p>yo</p>
            </div>
            <div>
                <Chart
                    xAxis={xData}
                    colour={colour}
                />
            </div>
            <div>
                <p>Chart should be above^</p>
            </div>
            <div>
                <PieChart
                    labels={performancePieChartLabels}
                    title={performancePieChartTitle}
                    dataset={performanceRatingsData}
                />
            </div>
            <div>
                <p>Pie Chart should be above^</p>
            </div>
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
            <div>
                <p>Bar Chart should be above^</p>
            </div>
        </div>
    );
}

export default App;
