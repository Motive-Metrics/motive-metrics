import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import ScatterChart from '../shared/ScatterChart';

function PersonalityChart() {
    const [users, setUsers] = useState([]);
    const [domain, setDomain] = useState('Neuroticism');

    useEffect(() => {
        invoke('getAllPersonalityResults').then(setUsers);
    }, []);

    const dataPoints = [];
    for (const user of users) {
        console.log('----------------------------------------------------------------\n');
        console.log(user);
        console.log('----------------------------------------------------------------\n');
        console.log(user.personality);
        if (user.hasOwnProperty('personality')) {
            dataPoints.push({
                x: user.personality.Neuroticism.total,
                y: 3 //invoke('getUsersAverageMotivation')
            });
        }
    }

    const data = {
        datasets: [
            {
            label: 'A dataset',
            data: dataPoints,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    return (
        <div className='page'>
            <ScatterChart
                name='Personality'
                data={data}
            />
        </div>
    );
}

export default PersonalityChart;