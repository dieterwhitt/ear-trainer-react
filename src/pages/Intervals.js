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
    //plays a random simultaneous interval

    //choose root from 3c to 5c
    //i.e index 27 to 51
    const rootIndex = Math.floor(Math.random()*25 + 27);
    //interval from 0 to 14 semitones (unison to minor 9th)
    const interval = Math.floor(Math.random() * 15);

    const intervalIndex =rootIndex+interval;
    console.log('interval: playing '+ keyboard[rootIndex] + ' and ' + keyboard[intervalIndex]);
    play(keyboard[rootIndex]);
    play(keyboard[intervalIndex]);

    //return the interval
    return interval;
}
//game interface component
function GameInterface(){
    //keep track of first render
    const firstUpdate = useRef(true);
    //state: number of interval plays remaining
    const [playsLeft, setPlaysLeft] = useState(10);
    //state: current answer list
    const [answerSheet, setAnswerSheet] = useState([]);
    //state: user answer list
    const [userAnswers, setUserAnswers] = useState([]);
    
    //handles user submitting
    const handleSubmit = (event) => {
        event.preventDefault();
        const dropdown = document.getElementById('intervalDropdown');
        //get user input (interval number)
        const currentInput = dropdown.value;
        console.log("the current user selection is " + currentInput);
        if(currentInput == -1){
            //user didn't select from the dropdown
            alert("Please select an interval.");
        } else{
            //reenable button
            document.getElementById("gameButton").disabled = false;
            //update user answer sheet
            setUserAnswers(previousState => [...previousState, currentInput]);
            //update the number of plays left
            setPlaysLeft((previousState) => previousState-1);
            console.log(userAnswers);
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
        setAnswerSheet(previousState => [...previousState, currentAnswer]);
        console.log(answerSheet);
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
    </>);
}

//main component
const Intervals = () => {
    return(
    <>
        <Header />
        <button onClick={() => {play('4e'); play('4gs'); 
                                play('4b'); play('5e')} }>test</button>
        <GameInterface />
    </>
    )
}

export default Intervals;