import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { invoke } from '@forge/bridge';
import PersonalityChart from './PersonalityChart';

function PersonalityHomePage() {
    return (
        <div>
            <PersonalityChart/>
        </div>
    );
}

export default PersonalityHomePage;