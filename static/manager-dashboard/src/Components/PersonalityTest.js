import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
const questions = require('../questions.json');

function PersonalityTest() {
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(questions);

    const nextQuestion = () => {
        const currentlySelected = document.querySelector('input[name="question"]:checked');
        if (!currentlySelected) {
            return;
        }

        questions[currentIndex].value = currentlySelected.value;
        currentlySelected.checked = false;

        setCurrentIndex(currentIndex + 1);
        
        if (questions[currentIndex + 1].value) {
            document.getElementById(questions[currentIndex + 1].value).checked = true;
        }
    }

    const previousQuestion = () => {
        setCurrentIndex(currentIndex - 1);
        
        if (questions[currentIndex - 1].value) {
            document.getElementById(questions[currentIndex - 1].value).checked = true;
        }
    }

    return (
        <div>
            <h2>IPIP 120 Personality Test</h2>
            <h3>Question { currentIndex + 1 }</h3>
            <p> {questions[currentIndex].question } </p>
            <form id="form">
                <input type="radio" name="question" value="Never" id="Never"/>
                <label for="Never">Never</label>
                <input type="radio" name="question" value="Rarely" id="Rarely"/>
                <label for="Rarely">Rarely</label>
                <input type="radio" name="question" value="Sometimes" id="Sometimes"/>
                <label for="Sometimes">Sometimes</label>
                <input type="radio" name="question" value="Often" id="Often"/>
                <label for="Often">Very Often</label>
                <input type="radio" name="question" value="Always" id="Always"/>
                <label for="Always">Always</label>
            </form>

            {currentIndex > 0 &&
                <button id="previous" onClick={previousQuestion}>Previous</button>
            }
            {currentIndex < 119 &&
                <button id="next" onClick={nextQuestion}>Next</button>
            }
            {currentIndex === 119 &&
                <button id="submit">Submit</button>
            }
        </div>
    );
}

export default PersonalityTest;