import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import ScatterChart from '../shared/ScatterChart';
import './PersonalityChart.css';

function PersonalityChart({domain}) {
    const [dataPoints, setDataPoints] = useState([]);
    const [users, setUsers] = useState(null);
    const [averageMotivations, setAverageMotivations] = useState(null);
    useEffect(() => {
        const fetchMotivation = async () => {
            const users = await invoke('getAllPersonalityResults');
            setUsers(users);
            const averageMotivations = await invoke('getAllAverageMotivation');
            setAverageMotivations(averageMotivations);
            const data = [];
            for (const user of users) {
                if (user.hasOwnProperty('personality') && averageMotivations.hasOwnProperty(user.accountId)) {
                    data.push({
                        x: user.personality[domain].total,
                        y: averageMotivations[user.accountId]
                    });
                }
            }
            setDataPoints(data);
        }

        fetchMotivation();
    }, []);

    useEffect(() => {
        console.log('Inside A');
        if (averageMotivations != null) {
            console.log('Inside B');
            const data = [];
            for (const user of users) {
                if (user.hasOwnProperty('personality') && averageMotivations.hasOwnProperty(user.accountId)) {
                    console.log('Inside C');
                    if (user.personality.hasOwnProperty(domain)) {
                        console.log('Inside D');
                        data.push({
                            x: user.personality[domain].total,
                            y: averageMotivations[user.accountId]
                        });
                    }
                }
            }
            setDataPoints(data);
        }
    }, [domain]);

    const formatData = () => {
        const data = [];
        for (const user of users) {
            if (user.hasOwnProperty('personality') && averageMotivations.hasOwnProperty(user.accountId)) {
                data.push({
                    x: user.personality[domain].total,
                    y: averageMotivations[user.accountId]
                });
            }
        }
        setDataPoints(data);
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
        <div className='chart'>
            <ScatterChart
                name='Personality'
                data={data}
            />
        </div>
    );
}

export default PersonalityChart;