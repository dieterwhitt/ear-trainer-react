//dieter whittingham
//jan 7 2023
//filename Intervals.js

import React from 'react';
import keyboard from '../keyboard';
import { useState, useEffect, useRef } from 'react';

//header component
function Header(){
    return (
        <>
            <h1>Interval Training</h1>
            <p>Welcome to interval training. When you press play, you will be given
                a series of random intervals. Identify them using the drop down box.
            </p>    
        </>
        );
}
//plays a single note 
//string -> void
function play(note){
    //wow...
    try{
        //load note object
        const noteobj = require('../sounds/piano-88-notes/' + note +'.wav');
        //play
        new Audio(noteobj).play();
    }catch(e){
        alert("couldn't play note " + note + " " + e)
    }
}

//plays a random interval (unison-major 9th) and returns the inter value
function playInterval(){
    //random 0 or 1 which will determine if there will be a delay
    var delay = Math.floor(Math.random() * 2);
    //if delay = 1, will have a 500 ms delay between notes.
    delay = delay*500;

    //choose root from 3c to 5c
    //i.e index 27 to 51
    const rootIndex = Math.floor(Math.random()*25 + 27);
    //interval from 0 to 14 semitones (unison to minor 9th)
    const interval = Math.floor(Math.random() * 15);

    const intervalIndex =rootIndex+interval;
    console.log('interval: playing '+ keyboard[rootIndex] + ' and ' + keyboard[intervalIndex]);
    //with delay
    play(keyboard[rootIndex]);
    setTimeout(() => play(keyboard[intervalIndex]),delay);

    //return the interval
    return interval;
}
//returing string of stars based on percentage
function getStars(percentage){
    if (percentage <50){
        return "⭐"; //0-49
    }else if (percentage < 70){
        return "⭐⭐" //50-69
    }else if (percentage < 85){
        return "⭐⭐⭐" //70-84
    }else if (percentage < 100){
        return "⭐⭐⭐⭐" //85-99
    }else{
        return "⭐⭐⭐⭐⭐" //100%
    }
}

//game interface component
function GameInterface(){
    //state: number of plays completed
    const [playsCompleted, setPlaysCompleted] = useState(0);
    //state: current answer list
    const [answerSheet, setAnswerSheet] = useState([]);
    //state: user answer list
    const [userAnswers, setUserAnswers] = useState([]);
    const [resultUpdate, setResultUpdate] = useState(true);
    //setting the rounds per game to 10
    const roundsPerGame = 10;

    function LoadResults(){
        if (resultUpdate){
            return <h3>finish the current session to see your results.</h3>
        }else{
            var correct = 0;
            for (const index in answerSheet) {
                //getting score
                if (answerSheet[index] == userAnswers[index]){
                    console.log('getting score');
                    //correct answer
                    correct ++;
                }
            }
            //get rounded percentage score
            const percentage = Math.round(100*correct/roundsPerGame);
            const stars = getStars(percentage);
            //render
            return(
                <>
                    <h3>Results:</h3>
                    <h1>{stars}</h1>
                    <h5>Score: {correct}/{roundsPerGame} ({'\t' + percentage}%)</h5>
                </>
                )}
    }
    
    //handles user submitting
    const handleSubmit = (event) => {
        event.preventDefault();
        //update number of rounds played
        const newPlaysCompleted = playsCompleted + 1;
        setPlaysCompleted(newPlaysCompleted);
        //get user input (interval number)
        const currentInput = document.getElementById('intervalDropdown').value;
        
        console.log("user submitted " + currentInput);
        console.log(newPlaysCompleted + " plays completed")

        if(currentInput == -1){
            //user didn't select from the dropdown
            alert("Please select an interval.");
        } else{
            //reenable button
            document.getElementById("gameButton").disabled = false;
            //redisable submit button
            document.getElementById("submitButton").disabled = true;
            //update user answer sheet
            setUserAnswers(prevAnswers => [...prevAnswers, currentInput]);
            //check if the game is finished:
            if(newPlaysCompleted >= roundsPerGame){
                //just submitted final round
                //update gamestate so results render
                setResultUpdate(true);
                console.log("showing results");
            }
        }     
    }

    //handles user pressing the play button
    //play sound, and log the correct answer to the answersheet
    const handlePlay = (event) =>{
        event.preventDefault();
        //play interval and get the numerical value for it.
        const currentAnswer = playInterval();
        console.log('the correct answer is ' + currentAnswer);
        //disable the button so that it cant be used before submission
        document.getElementById("gameButton").disabled = true;
        //enable the submit button
        document.getElementById("submitButton").disabled = false;
        //add current answer to answersheet
        setAnswerSheet(prevAnswerSheet => [...prevAnswerSheet, currentAnswer]);
    }

    return (
    <>
        <form onSubmit={handleSubmit}>
            {/* play button */}
            <button id='gameButton' onClick={handlePlay}>Play Interval</button>

            <select id='intervalDropdown'>
                {/* dropdown */}
                <option selected disabled value={-1}>Choose Interval</option>
                <option value={0}>Perfect Unison</option>
                <option value={1}>Minor Second</option>
                <option value={2}>Major Second</option>
                <option value={3}>Minor Third</option>
                <option value={4}>Major Third</option>
                <option value={5}>Perfect Fourth</option>
                <option value={6}>Tritone</option>
                <option value={7}>Perfect Fifth</option>
                <option value={8}>Minor Sixth</option>
                <option value={9}>Major Sixth</option>
                <option value={10}>Minor Seventh</option>
                <option value={11}>Major Seventh</option>
                <option value={12}>Perfect Octave</option>
                <option value={13}>Minor Ninth</option>
                <option value={14}>Major Ninth</option>
            </select>
            {/* submit button: disabled until interval is played*/}
            <input disabled id='submitButton' type="submit" />
        </form>
        <h2>Intervals Remaining: {roundsPerGame - playsCompleted}</h2>
        <LoadResults/>
    </>);
}

//main component
const Intervals = () => {
    return(
    <>
        <Header />
        <GameInterface />
        
    </>
    )
}

export default Intervals;