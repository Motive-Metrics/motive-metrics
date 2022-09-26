import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import PieChart from '../shared/PieChart';

function SatisfactionPieChart() {
    const [SatisfactionRatingsData, setSatisfactionRatingsData] = useState(null);

    useEffect(() => {
        invoke('getSatisfactionRatingsData', { example: 'my-invoke-variable' }).then(setSatisfactionRatingsData);
    }, []);

    const SatisfactionPieChartLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const SatisfactionPieChartTitle = 'Satisfaction Ratings';
    console.log("here");

    return (
        // Ideally the styling should be in a file, but who likes creating CSS files?
        <div style="margin: auto; padding: 10px; width: 50%; height: 50%">
            <PieChart
                labels={SatisfactionPieChartLabels}
                title={SatisfactionPieChartTitle}
                dataset={SatisfactionRatingsData}
            />
        </div>
    );
}

export default SatisfactionPieChart;