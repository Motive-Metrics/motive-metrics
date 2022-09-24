import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { invoke } from '@forge/bridge';
import PersonalityChart from './PersonalityChart';

function PersonalityHomePage() {
    const [personalityTestResult, setPersonalityTestResult] = useState(null);

    useEffect(() => {
        //console.log(personalityTestResult);
    },[personalityTestResult]);

    return (
        <div>
            <Link to="/personality-test">Take personality test</Link>
            <PersonalityChart/>
        </div>
    );
}

export default PersonalityHomePage;