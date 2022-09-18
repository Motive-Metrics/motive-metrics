import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Chart from './shared/Chart';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    }, []);
    const xData = ['11/11/21', '11/12/21', '11/13/21', '11/14/21', '11/15/21', '11/16/21', '11/18/21'];
    const colour='rgba(0, 82, 204)'
    
    return (
        <div>
            {data ? data : 'Loading...'}
            <Chart
                xAxis={xData}
                colour={colour}
            />
        </div>
    );
}

export default App;
