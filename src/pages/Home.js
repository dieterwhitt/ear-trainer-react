//dieter whittingham
//jan 7 2023
//filename Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className='font-font1 text-center'>
        <h1 className='text-5xl h-12 my-8 font-bold animate-in fade-in 
        slide-in-from-top ease-in-out duration-1000'>Welcome to Ear Trainer!</h1>
        <h4 className='text-2xl my-8 font-semibold animate-in fade-in 
        slide-in-from-top ease-in-out duration-1000'>
            Choose from interval training, chord identification training, or 
            chord progression training!
            <br/>Also check out the About page!
        </h4>
        <main className='flex flex-row justify-center gap-12 justify-center 
        animate-in fade-in slide-in-from-bottom-8 ease-in-out duration-1000'>
            <div className='flex-none w-1/4 border-solid rounded-xl border-2
            bg-gradient-to-b from-white to-slage-50 border-indigo-400'>
                <h3 className='text-2xl font-bold my-2'>
                    Interval Training
                </h3>
                <p className='text-lg my-2 leading-6 mx-3'>
                    In interval training, you will be given 10 intervals to 
                    identify. Intervals will be played either broken or simultaneously 
                    and will range from a perfect unison to a major ninth.
                </p>
                <Link to='/intervals' >
                    <button className='text-xl font-bold my-5 outline rounded-full
                    outline-indigo-400 w-36 h-10 outline-2 outline-offset-1
                    bg-indigo-200'>
                        Play Intervals
                    </button>
                </Link>
            </div>
            <div className='flex-none w-1/4 border-solid rounded-xl border-2 
            border-indigo-400 bg-gradient-to-b from-white to-slate-50'> 
                <h3 className='text-2xl font-bold my-2'>
                    Chord Identification</h3>
                <p className='text-lg my-2 leading-6 mx-3'>
                    In chord identification, you will be given 10 chords to identify.
                    Possible chords: Major, Minor, Dominant 7th, 
                    Diminished 7th, Major 7th, Minor 7th, and Augmented Triad.
                </p>
                <Link to='/chords' >
                    <button className='text-xl font-bold my-5 outline rounded-full 
                    w-60 h-10 outline-offset-1 outline-indigo-400 outline-2
                    bg-indigo-200'>
                        Play Chord Identification
                    </button>
                </Link>
            </div>
            <div className='flex-none w-1/4 border-solid rounded-xl border-2 
            border-indigo-400 bg-gradient-to-b from-white to-slate-50'>
                <h3 className='text-2xl font-bold my-2'>
                    Chord Progressions</h3>
                <p className='text-lg my-20 leading-6'>
                    Coming Soon!
                </p>
                <Link to='/chordProgressions' >
                    {/*<button>Play Chord Progressions</button>*/}
                </Link>
            </div>
        </main>
    </div>
    );
}

export default Home;