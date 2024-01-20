//dieter whittingham
//jan 7 2023
//filename Chords.js

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { getStars } from '../keyboard';
import { playChord } from '../keyboard';

//header component
function Header(){
    return (
        <div>
            <h1>Chord Identification Training</h1>
            <p>Welcome to chord identification training. When you press play, 
                you will be given a series of random chords. 
                Identify them using the drop down box.
                <br/> Possible chords: Major (root position or 1st inversion), 
                Minor (root position or 1st inversion), Dominant 7th (root position), 
                Diminished 7th (root position), Major-Major Seventh (root position), 
                Minor-Minor Seventh (root position), or Augmented Triad (root position).
            </p>    
        </div>
        );
}
//game interface component
function GameInterface(){
    //state: number of plays completed
    const [playsCompleted, setPlaysCompleted] = useState(0);
    //state: current answer list
    const [answerSheet, setAnswerSheet] = useState([]);
    //state: user answer list
    const [userAnswers, setUserAnswers] = useState([]);
    const [resultUpdate, setResultUpdate] = useState(false);
    //setting the rounds per game to 10
    const roundsPerGame = 10;

    function LoadResults(){
        if (!resultUpdate){
            //not ready to load
            return <h3>Finish the current session to see your results.</h3>
        }else{
            var correct = 0;
            for (const index in answerSheet) {
                //getting score
                if (answerSheet[index] == userAnswers[index]){
                    //correct answer
                    correct ++;
                }
            }
            //get rounded percentage score
            const percentage = Math.round(100*correct/roundsPerGame);
            const stars = getStars(percentage);
            //disable play buttons so they can see their results
            document.getElementById('gameButton0').disabled = true;
            document.getElementById('chordDropdown').disabled = true;
            //render
            return(
                <>
                    <h3>Results:</h3>
                    <h1>{stars}</h1>
                    <p>Score: {correct}/{roundsPerGame} ({percentage}%)</p>
                    <button id='restartButton0' onClick={restartGame}>Play Again</button>
                </>
                )}
    }

    const restartGame = () => {
        //function for resetting the game
        //reenable button
        document.getElementById('gameButton0').disabled = false;
        //redisable submit button
        document.getElementById('submitButton0').disabled = true;
        //reset dropdown
        document.getElementById('chordDropdown').disabled = false;
        //remove results
        setResultUpdate(false);
        //reset score
        setAnswerSheet([]);
        setUserAnswers([]);
        setPlaysCompleted(0);
    }

    //handles user submitting
    const handleSubmit = (event) => {
        event.preventDefault();
        //get user input (chord type number)
        const currentInput = document.getElementById('chordDropdown').value;
        //check valid input
        if(currentInput == -1){
            alert('Please select a chord type.');
        }else{
            //update number of rounds played
            const newPlaysCompleted = playsCompleted + 1;
            setPlaysCompleted(newPlaysCompleted);
            
            //reset dropdown
            document.getElementById('chordDropdown').selectedIndex = 0;
            //log
            console.log('user submitted ' + currentInput);
            console.log(newPlaysCompleted + ' plays completed');

            //reenable button
            document.getElementById('gameButton0').disabled = false;
            //redisable submit button
            document.getElementById('submitButton0').disabled = true;
            //update user answer sheet
            setUserAnswers(prevAnswers => [...prevAnswers, currentInput]);
            //check if the game is finished:
            if(newPlaysCompleted >= roundsPerGame){
                //just submitted final round
                //update gamestate so results render
                console.log('setting result update status to true');
                setResultUpdate(true); 
            }
        }   
    }     
    

    //handles user pressing the play button
    //play sound, and log the correct answer to the answersheet
    const handlePlay = (event) =>{
        event.preventDefault();
        console.log('handling play');
        //play chord and get the numerical value for it.
        const currentAnswer = playChord();
        console.log('the correct answer is ' + currentAnswer);
        //disable the button so that it cant be used before submission
        document.getElementById('gameButton0').disabled = true;
        //enable the submit button
        document.getElementById('submitButton0').disabled = false;
        //add current answer to answersheet
        setAnswerSheet(prevAnswerSheet => [...prevAnswerSheet, currentAnswer]);
    }

    return (
    <>
        <form onSubmit={handleSubmit}>
            {/* play button */}
            <button id='gameButton0' onClick={handlePlay}>Play Chord</button>

            <select id='chordDropdown'>
                {/* dropdown */}
                <option selected disabled hidden value={-1}>Choose Chord Type</option>
                <option value={0}>Major (Root Position)</option>
                <option value={1}>Major (1st Inversion)</option>
                <option value={2}>Minor (Root Position)</option>
                <option value={3}>Minor (1st Inversion)</option>
                <option value={4}>Dominant 7th</option>
                <option value={5}>Diminished 7th</option>
                <option value={6}>Major 7th</option>
                <option value={7}>Minor 7th</option>
                <option value={8}>Augmented Triad</option>
            </select>
            {/* submit button: disabled until interval is played*/}
            <input disabled id='submitButton0' type='submit' />
        </form>
        <h2>Chords Remaining: {roundsPerGame - playsCompleted}</h2>
        <LoadResults/>
    </>);
}

//main component
const Chords = () => {
    return(
    <>
        <Header />
        <GameInterface />
    </>
    )
}

export default Chords;
