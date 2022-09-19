import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import RadarChart from './shared/RadarChart';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        invoke('getMotivation', { example: 'my-invoke-variable' }).then(setData);
    }, []);
    console.log(data);

    const labels = ['11/11/21', '11/12/21', '11/13/21', '11/14/21', '11/15/21', '11/16/21', '11/18/21'];
    //labels.map(() => Math.floor(Math.random() * 1000))
    const colour='rgba(0, 82, 204)'

    return (
        <div>
            <RadarChart
                labels={labels}
                colour={colour}
            />
        </div>
    );
}

export default App;