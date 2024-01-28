//dieter whittingham
//jan 7 2023
//filename ChordProgressions.js

import React from 'react';
import { useState } from 'react';
import keyboard from '../keyboard';
import { testBass } from '../keyboard';

//header component
function Header(){
    return (
        <div>
            <h1>Chord Progression Training</h1>
            <p>Welcome to chord progression training. When you press play, 
                you will be given a chord progression with 5 chords. 
                <br/> Possible chords: I/i, IV/iv, V, V6/4, VI/vi.
            </p>
            <h2>Coming Soon!</h2>    
        </div>
        );
}

const ChordProgressions = () => {   
    return (
        <div>
            <Header/>
            <button onClick={testBass}>test</button>
        </div>);
}

export default ChordProgressions;