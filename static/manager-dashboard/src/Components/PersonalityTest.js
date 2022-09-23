import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
const questions = require('../questions.json');

function PersonalityTest() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState([]);

    const nextQuestion = () => {
        if (currentIndex < 121) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const previousQuestion = () => {
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
        }
    }
    
    componentDidMount = () => {
        console.log(questions);
    }

    return (
        <div>
            <h2>IPIP 120 Personality Test</h2>
            <h3>Question 1</h3>
            <p> What's your favourite colour? </p>
            <div>
                <input type="radio" name="question" value="Never" id="Never"/>
                <label for="Never">Never</label>
                <input type="radio" name="question" value="Rarely" id="Rarely"/>
                <label for="Rarely">Rarely</label>
                <input type="radio" name="question" value="Sometimes" id="Sometimes"/>
                <label for="Sometimes">Sometimes</label>
                <input type="radio" name="question" value="Very Often" id="Often"/>
                <label for="Often">Very Often</label>
                <input type="radio" name="question" value="Always" id="Always"/>
                <label for="Always">Always</label>
            </div>

            <button id="previous" onClick={previousQuestion}>Previous</button>
            <button id="next" onClick={nextQuestion}>Next</button>

        </div>
    );
}

export default PersonalityTest;