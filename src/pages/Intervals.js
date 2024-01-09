//dieter whittingham
//jan 7 2023
//filename Intervals.js

import React from 'react';
import keyboard from '../keyboard';
import { useState, useEffect } from 'react';

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

function play(note){
    //wow...
    try{
    const noteobj = require('../sounds/piano-88-notes/' + note +'.wav');
    new Audio(noteobj).play();
    }catch(e){
        alert("couldn't play note " + note + " " + e)
    }
}

function playInterval(){
    //plays a random simultaneous interval

    //choose root from 3c to 5c
    //i.e index 27 to 51
    const rootIndex = Math.floor(Math.random()*25 + 27);
    //interval from 1 to 15 semitones (add negative later)
    const interval = Math.floor(Math.random() * 15 + 1);

    console.log(keyboard[rootIndex])
    console.log(keyboard[(rootIndex + interval)])

    play(keyboard[rootIndex])
    play(keyboard[(rootIndex + interval)])
    
}

const Intervals = () => {
    return(
    <>
        <Header />
        <button onClick={playInterval}>play interval</button>
        <button onClick={() => play('5c')}>test</button>
    </>
    )
}

export default Intervals;