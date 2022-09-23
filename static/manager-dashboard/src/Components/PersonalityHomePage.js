import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { invoke } from '@forge/bridge';

function PersonalityHomePage() {
    const [personalityTestResult, setPersonalityTestResult] = useState(null);

    const onPersonalityTestCompletion = (results) => {
        setPersonalityTestResult(results);
    }

    return (
        <div>
            <Link to="/personality-test">Take personality test</Link>
        </div>
    );
}

export default PersonalityHomePage;