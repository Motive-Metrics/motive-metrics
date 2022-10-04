import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import ScatterChart from '../shared/ScatterChart';
import './PersonalityChart.css';

function PersonalityChart({domain, users, setUsers}) {
    const [motivationPoints, setMotivationPoints] = useState([]);
    const [performancePoints, setPerformancePoints] = useState([]);
    const [satisfactionPoints, setSatisfactionPoints] = useState([]);
    const [averageMotivations, setAverageMotivations] = useState(null);
    const [averagePerformances, setAveragePerformances] = useState(null);
    const [averageSatisfactions, setAverageSatisfactions] = useState(null);
    useEffect(() => {
        const fetchAverageMetrics = async () => {
            const users = await invoke('getAllPersonalityResults');
            setUsers(users);
            const averageMotivations = await invoke('getAllAverageMotivation');
            setAverageMotivations(averageMotivations);
            const averagePerformances = await invoke('getAllAveragePerformance');
            setAveragePerformances(averagePerformances);
            const averageSatisfactions = await invoke('getAllAverageSatisfaction');
            setAverageSatisfactions(averageSatisfactions);
            console.log('Inside A1');
            const motivationData = [];
            const performanceData = [];
            const satisfactionData = [];
            for (const user of users) {
                console.log('Inside B1');
                if (user.hasOwnProperty('personality')) {
                    if (averageMotivations.hasOwnProperty(user.accountId)) {
                        console.log('Inside C1');
                        motivationData.push({
                            x: user.personality[domain].total,
                            y: averageMotivations[user.accountId]
                        });
                    }
                    if (averagePerformances.hasOwnProperty(user.accountId)) {
                        console.log('Inside D1');
                        performanceData.push({
                            x: user.personality[domain].total,
                            y: averagePerformances[user.accountId]
                        });
                    }
                    if (averageSatisfactions.hasOwnProperty(user.accountId)) {
                        console.log('Inside E1');
                        satisfactionData.push({
                            x: user.personality[domain].total,
                            y: averageSatisfactions[user.accountId]
                        });
                    }
                }
            }
            setMotivationPoints(motivationData);
            setPerformancePoints(performanceData);
            setSatisfactionPoints(satisfactionData);
        }

        fetchAverageMetrics();
    }, []);

    useEffect(() => {
        console.log('Inside A2');
        if (averageMotivations != null && averagePerformances != null && averageSatisfactions != null) {
            const motivationData = [];
            const performanceData = [];
            const satisfactionData = [];
            for (const user of users) {
                console.log('Inside B2');
                if (user.hasOwnProperty('personality')) {
                    if (averageMotivations.hasOwnProperty(user.accountId)) {
                        console.log('Inside C2');
                        motivationData.push({
                            x: user.personality[domain].total,
                            y: averageMotivations[user.accountId]
                        });
                    }
                    if (averagePerformances.hasOwnProperty(user.accountId)) {
                        console.log('Inside D2');
                        performanceData.push({
                            x: user.personality[domain].total,
                            y: averagePerformances[user.accountId]
                        });
                    }
                    if (averageSatisfactions.hasOwnProperty(user.accountId)) {
                        console.log('Inside E2');
                        satisfactionData.push({
                            x: user.personality[domain].total,
                            y: averageSatisfactions[user.accountId]
                        });
                    }
                }
            }
            setMotivationPoints(motivationData);
            setPerformancePoints(performanceData);
            setSatisfactionPoints(satisfactionData);
        }
    }, [domain]);

    const data = {
        datasets: [
            {
                label: 'Motivation',
                data: motivationPoints,
                backgroundColor: 'rgba(0, 82, 204)',
            },
            {
                label: 'Performance',
                data: performancePoints,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Satisfaction',
                data: satisfactionPoints,
                backgroundColor: 'rgba(53, 162, 235, 1)',
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