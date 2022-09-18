import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import PerformanceBarChart from './Components/Performance';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    }, []);

    return (
        <div>
            {data ? data : 'Loading Data...'}
            <div>
                <p>yo</p>
            </div>
            <div>
                <PerformanceBarChart/>
            </div>
            <div>
                <p>Bar Chart should be above ^</p>
            </div>
        </div>
    );
}

export default App;
