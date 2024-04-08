//dieter whittingham
//jan 7 2023
//filename ChordProgressions.js

import React from 'react';
import { useState } from 'react';
import keyboard from '../keyboard';
import { testBass } from '../keyboard';

// Refactor: reuse components including buttons idiot
// like you need to reuse titles and buttons
// do this before adding difficulty options

function Title(){
    return(
        <h1 className='
            text-6xl my-[3%] font-bold animate-in fade-in
            slide-in-from-top ease-in-out duration-1000'>
                Chord Progression Training</h1>
    );
}

//header component
function Header(){
    return (
        <div className='text-3xl mb-[2.5%] font-semibold animate-in fade-in 
        slide-in-from-top-[40%] ease-in-out duration-1000 mx-[4%]'>
            <p>
            Welcome to chord progression training. When you press play, 
            you will be given a chord progression with 5 chords.
            </p>    
            <p className='text-2xl animate-in fade-in 
        slide-in-from-top ease-in-out duration-700 mt-[1.5%]'>
                Possible chords: I/i, IV/iv, V, V6/4, VI/vi.
            </p>
            <h1 className='
            text-6xl my-[3%] font-bold animate-in fade-in
            slide-in-from-top ease-in-out duration-1000'>
                Coming Soon!</h1>
        </div>
        );
}

const ChordProgressions = () => {   
    return (
        <div className='font-font1 text-center'>
            <Title/>
            <Header/>
            <div className='animate-in fade-in 
                    slide-in-from-bottom-[50%] ease-in-out duration-1000'>
                <button id='gameButton' onClick={testBass}
                className='text-3xl font-bold my-[1%] outline 
                        rounded-full h-fit outline-2 outline-offset-2 py-[1%] px-[2%] 
                        mx-[2%] bg-indigo-200 outline-indigo-400 hover:bg-indigo-300
                        hover:scale-110 duration-300'>
                Preview Bass Generation</button>
            </div>
        </div>);
}

export default ChordProgressions;