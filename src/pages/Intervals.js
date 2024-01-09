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
    //interval from 0 to 15 semitones (add negative later)
    const interval = Math.floor(Math.random() * 16);

    play(keyboard[rootIndex])
    play(keyboard[(rootIndex + interval)])

    //return the interval
    return interval;
}
//game interface component
function GameInterface(){
    //keep track of first render
    const firstUpdate = useRef(true);
    //state: number of interval plays remaining
    const [playsleft, setPlaysleft] = useState(10);
    //state: current answer list
    const [answerSheet, setAnswerSheet] = useState([]);
    //state: user answer list
    const [userAnswers, setUserAnswers] = useState([]);
    //state: gamestate
    const [gamestate, setGamestate] = useState(0);

    
    //play interval sound the button is pressed (gamestate change)
    //but NOT on first render
    useEffect(() => {if(firstUpdate){
        //if its the first render, set false and do nothing
        firstUpdate.current = false;
    }else{
        //if its not the first render, handle play.
        handlePlay()
    }},
     [gamestate])

    const handleSubmit = (event) => {
        event.preventDefault()

    }

    //handles user pressing the play button
    //play sound, and log the correct answer to the answersheet
    const handlePlay = (event) =>{
        event.preventDefault();
        //play interval and get the numerical value for it.
        const currentAnswer = playInterval();
        //add current answer to answersheet
        setAnswerSheet(previousState => [...previousState, currentAnswer]);
    }
    return (
    <>
        
        <form onsubmit={handleSubmit}>
            <button onClick={handlePlay}>play interval</button>

            <select>
                {/* dropdown */}
                <option value={0}>Perfect Unison</option>
                <option value={1}>Minor Second</option>
                <option value={2}>Major Second</option>
                <option value={3}>Minor Third</option>
                <option value={4}>Major Third</option>
                <option value={5}>Diminished Fourth</option>
                <option value={6}>Perfect Fourth</option>
                <option value={7}>Diminished Fifth</option>
                <option value={8}>Perfect Fifth</option>
                <option value={9}>Minor Sixth</option>
                <option value={10}>Major Sixth</option>
                <option value={11}>Minor Seventh</option>
                <option value={12}>Major Seventh</option>
                <option value={13}>Perfect Octave</option>
                <option value={14}>Minor Ninth</option>
                <option value={15}>Major Ninth</option>
            </select>
        </form>
    </>);
}

//main component
const Intervals = () => {
    return(
    <>
        <Header />
        <button onClick={() => play('5c')}>test</button>
        <GameInterface />
    </>
    )
}

export default Intervals;