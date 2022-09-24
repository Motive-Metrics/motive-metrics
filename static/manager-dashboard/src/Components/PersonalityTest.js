import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
const questions = require('../personality.json');

function PersonalityTest() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResult] = useState(null);
    useEffect(() => {
        if (questions[currentIndex].value) {
            document.getElementById(questions[currentIndex].value).checked = true;
        }
        
    },[currentIndex]);

    const nextQuestion = () => {
        const currentlySelected = document.querySelector('input[name="question"]:checked');
        if (!currentlySelected) {
            return;
        }
        questions[currentIndex].value = currentlySelected.value;

        currentlySelected.checked = false;
        setCurrentIndex(currentIndex + 1);
    }

    const previousQuestion = () => {
        setCurrentIndex(currentIndex - 1);
    }

    const submit = () => {
        const currentlySelected = document.querySelector('input[name="question"]:checked');
        if (!currentlySelected) {
            return;
        }
        questions[currentIndex].value = currentlySelected.value;

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
        console.log(personality);
        invoke('storePersonalityResults', { personality });
    }

    return (
        <div>
            <h2>IPIP 120 Personality Test</h2>
            <h3>Question { currentIndex + 1 }</h3>
            <p> {questions[currentIndex].question } </p>
            <form id="form">
                <input type="radio" name="question" value="1" id="Never"/>
                <label for="Never">Never</label>
                <input type="radio" name="question" value="2" id="Rarely"/>
                <label for="Rarely">Rarely</label>
                <input type="radio" name="question" value="3" id="Sometimes"/>
                <label for="Sometimes">Sometimes</label>
                <input type="radio" name="question" value="4" id="Often"/>
                <label for="Often">Very Often</label>
                <input type="radio" name="question" value="5" id="Always"/>
                <label for="Always">Always</label>
            </form>
            
            {currentIndex > 0 &&
                <button id="previous" onClick={previousQuestion}>Previous</button>
            }
            {currentIndex < 119 &&
                <button id="next" onClick={nextQuestion}>Next</button>
            }
            {currentIndex === 119 &&
                <button id="submit" onClick={submit}>Submit</button>
            }
        </div>
    );
}

export default PersonalityTest;