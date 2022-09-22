import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import RadarChart from '../shared/RadarChart';
import './Motivation.css';

function Motivation() {
    const [data, setData] = useState(null);

    useEffect(() => {
        invoke('getMotivation', { example: 'my-invoke-variable' }).then(setData);
    }, []);

    const labels = [];
    const dataPoints = [];
    for (const property in data) {
        labels.push(property);
        dataPoints.push(data[`${property}`]);
    }
    const borderColour = 'rgba(0, 82, 204)'
    const backgroundColour = 'rgba(179, 212, 255)'
    return (
        <div className='page'>
            <RadarChart
                name='Motivation'
                labels={labels}
                dataPoints={dataPoints}
                borderColour={borderColour}
                backgroundColour={backgroundColour}
            />
        </div>
    );
}

export default Motivation;