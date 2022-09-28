import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
const questions = require('../temp.json'); //TODO: I commited this for ease of development, change to questions.json

function PersonalityTest() {
    console.log(questions);
    const [fakeValue, setFakeValue] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResult] = useState(null);
    const values = {
        1: 'Never',
        2: 'Rarely',
        3: 'Sometimes',
        4: 'Often',
        5: 'Always'
    }

    const answerPicked = (e) => {
        questions[currentIndex].value = e.target.value;
        setFakeValue(fakeValue + 1); // update state to force render
    }

    const nextQuestion = () => {
        if(questions[currentIndex].value) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const previousQuestion = () => {
        setCurrentIndex(currentIndex - 1);
    }

    const submit = async () => {
        if(!questions[currentIndex].value) {
            return;
        }

        const personality = {};
        for (const question of questions) {
            if (!personality.hasOwnProperty(question.domain)) {
                personality[question.domain] = {};
                personality[question.domain].total = parseInt(0);
            }
            
            const value = parseInt(question.value);
            personality[question.domain].total += question.key === "+" ? value: - value;
            personality[question.domain].facet = question.key === "+" ? value: - value;
        }
        const context = await view.getContext();
        invoke('storePersonalityResults', { personality, accountId: context.accountId });
    }

    return (
        <Box paddingTop={2}>
            <h2>IPIP 120 Personality Test</h2>
            <h3>Question { currentIndex + 1 }</h3>
            <p> {questions[currentIndex].question } </p>
            <form id="form">
                <FormControl>
                    <RadioGroup name="question" onChange={answerPicked}>
                        <FormControlLabel value="1" control={<Radio id="Never" checked={questions[currentIndex].value === '1'}/> } label="Never" />
                        <FormControlLabel value="2" control={<Radio id="Rarely" checked={questions[currentIndex].value === '2'} />} label="Rarely" />
                        <FormControlLabel value="3" control={<Radio id="Sometimes" checked={questions[currentIndex].value === '3'} />} label="Sometimes" />
                        <FormControlLabel value="4" control={<Radio id="Often" checked={questions[currentIndex].value === '4'} />} label="Very Often" />
                        <FormControlLabel value="5" control={<Radio id="Always" checked={questions[currentIndex].value === '5'} />} label="Always" />
                    </RadioGroup>
                </FormControl>
            </form>

            <Stack spacing={2} direction="row" marginTop={1}>
                {currentIndex > 0 &&
                    <Button id="previous" onClick={previousQuestion} variant="outlined">Previous</Button>
                }
                {currentIndex < questions.length - 1 &&
                    <Button id="next" onClick={nextQuestion} variant="contained">Next</Button>
                }
                {currentIndex === questions.length - 1 &&
                    <Button id="submit" onClick={submit} variant="contained">Submit</Button>
                }
            </Stack>
        </Box>
    );
}

export default PersonalityTest;