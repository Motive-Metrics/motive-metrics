import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import {Pie, Doughnut} from 'react-chartjs-2';

function App() {
    const [data, setData] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);
    // const [performanceRatingsData, setPerformanceRatingsData] = useState(null);
    // const performanceLabels = ['Bad', 'Somewhat Bad', 'Okay', 'Somewhat Good', 'Good'];
    const [aaa, setAaa] = useState(null);

    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
        invoke('getPerformanceRatings', { example: 'my-invoke-variable' }).then(setPerformanceData);
        // invoke('getPerformanceRatingsData', { example: 'my-invoke-variable' }).then(setPerformanceRatingsData);
        invoke('aaa', { example: 'my-invoke-variable' }).then(setAaa);
    }, []);


    // const aaa = {
    //     labels: performanceLabels,
    //     datasets: [
    //       {
    //         label: 'Rainfall',
    //         backgroundColor: [
    //           '#B21F00',
    //           '#C9DE00',
    //           '#2FDE00',
    //           '#00A6B4',
    //           '#6800B4'
    //         ],
    //         hoverBackgroundColor: [
    //         '#501800',
    //         '#4B5000',
    //         '#175000',
    //         '#003350',
    //         '#35014F'
    //         ],
    //         data: performanceRatingsData
    //       }
    //     ]
    //   };

    return (
        <div>
            {data ? data : 'Loading Data...'}
            <div>
                <p>yo</p>
            </div>
            <div>
                <table>
                    <tr>
                    <th>Key</th>
                    <th>Score</th>
                    </tr>
                    {performanceData ? 
                    performanceData.map(issue => (
                        <tr>
                        <td>{issue.key}</td>
                        <td>
                            <svg width="100px" height="50px">
                            <g class="bars">
                                <rect fill="#ff0000" width="100%" height="10"></rect>
                                <rect fill="#00ff00" width="40" height="10"></rect>
                            </g>
                            </svg>
                        </td>
                        </tr>
                    )) 
                    : 'Loading table...'
                    }
                </table>
            </div>
            <div>
            <table>
                    <tr>
                    <th>Performance</th>
                    <th>Count</th>
                    </tr>
                    {aaa ? 
                    aaa.map(issue => (
                        <tr>
                        <td>{issue.performanceRating}</td>
                        <td>{issue.count}</td>
                        </tr>
                    )) 
                    : 'Loading table...'
                    }
                </table>
            </div>
            {/* <div>
                <table>
                    <tr>
                    <th>Key</th>
                    <th>Score</th>
                    </tr>
                    {performanceData ? 
                    performanceData.map(issue => (
                        <tr>
                        <td>{issue.key}</td>
                        <td>
                            <svg width="100px" height="50px">
                            <g class="bars">
                                <rect fill="#ff0000" width="100%" height="10"></rect>
                                <rect fill="#00ff00" width={performanceRatingsData[1]} height="10"></rect>
                            </g>
                            </svg>
                        </td>
                        </tr>
                    )) 
                    : 'Loading table...'
                    }
                </table>
            </div> */}
            {/* <div>
                <Pie
                data={aaa}
                options={{
                    title:{
                        display:true,
                        text:'Average Rainfall per month',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
                />

                <Doughnut
                data={aaa}
                    options={{
                        title:{
                            display:true,
                            text:'Average Rainfall per month',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div> */}
        </div>
    );
}

export default App;
