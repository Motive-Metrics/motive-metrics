import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import ScatterChart from '../shared/ScatterChart';

function PersonalityChart() {
    const [domain, setDomain] = useState('Neuroticism');
    const [dataPoints, setDataPoints] = useState([]);
    let users;
    let averageMotivations;
    useEffect(() => {
        const fetchMotivation = async () => {
            users = await invoke('getAllPersonalityResults');
            averageMotivations = await invoke('getAllAverageMotivation');
            for (const property in users) {
                console.log(property + ': ' + users[property].accountId);
            }
            for (const property in averageMotivations) {
                console.log(property + ': ' + averageMotivations[property]);
            }
            const data = [];
            for (const user of users) {
                console.log(averageMotivations.hasOwnProperty(user.accountId));
                if (user.hasOwnProperty('personality') && averageMotivations.hasOwnProperty(user.accountId)) {
                    console.log('AverageMotivation: ' + averageMotivations[user.accountId]);
                    data.push({
                        x: user.personality.Neuroticism.total,
                        y: averageMotivations[user.accountId]
                    });
                }
            }
            setDataPoints(data);
        }

        fetchMotivation();
    }, []);

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