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
    const noteobj = require('../sounds/piano-88-notes/' + note + '.wav');
    new Audio(noteobj).play();
}

const Intervals = () => {
    return(
    <>
        <Header />
        <button onClick={() => play('4c')}>playinterval</button>
    </>
    )
}



export default Intervals;