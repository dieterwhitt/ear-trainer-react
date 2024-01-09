//dieter whittingham
//jan 7 2023
//filename Intervals.js

import React from 'react';
import keyboard from '../keyboard';
import { useState, useEffect } from 'react';

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
    //state: number of interval plays remaining
    const [playsleft, setPlaysleft] = useState(10);
    //state: current answer list
    const [answers, setAnswers] = useState([]);

    return <></>;
}

//main component
const Intervals = () => {
    return(
    <>
        <Header />
        <button onClick={playInterval}>play interval</button>
        <button onClick={() => play('5c')}>test</button>
        <GameInterface />
    </>
    )
}

export default Intervals;