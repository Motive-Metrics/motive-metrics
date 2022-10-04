import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import PersonalityChart from './PersonalityChart';
import DimensionsChart from './DimensionsChart';
import './PersonalityPage.css';

function PersonalityPage() {
    const [domain, setDomain] = useState('Neuroticism');
    const [users, setUsers] = useState(null);

    const handleDomainChange = (event) => {
        setDomain(event.target.value);
    };
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Card 
                variant='outlined'
                className='card-graph'
                sx={
                    {borderRadius: 2}
                }>
                    <CardHeader
                    title={`Personality Dimension - ${domain}`}
                    />
                    <PersonalityChart domain={domain} users={users} setUsers={setUsers}/>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card 
                variant='outlined'
                className='card-control'
                sx={
                    {borderRadius: 2}
                }>
                    <div className='control-panel'>
                        <FormControl className='domain' fullWidth>
                            <InputLabel>Dimension</InputLabel>
                            <Select
                                value={domain}
                                label='Domain'
                                onChange={handleDomainChange}
                            >
                                <MenuItem value={'Agreeableness'}>Agreeableness</MenuItem>
                                <MenuItem value={'Conscientiousness'}>Conscientiousness</MenuItem>
                                <MenuItem value={'Extraversion'}>Extraversion</MenuItem>
                                <MenuItem value={'Neuroticism'}>Neuroticism</MenuItem>
                                <MenuItem value={'Openness To Experience'}>Openness To Experience</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card 
                variant='outlined'
                className='card-graph'
                sx={
                    {borderRadius: 2}
                }>
                    <CardHeader
                    title="Users' Dimensions"
                    />
                    <DimensionsChart users={users} setUsers={setUsers} />
                </Card>
            </Grid>
        </Grid>
    );
}

export default PersonalityPage;