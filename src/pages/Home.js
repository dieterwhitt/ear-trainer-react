//dieter whittingham
//jan 7 2023
//filename Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className='font-font1 text-center'>
        <h1 className='text-6xl my-[3%] font-bold animate-in fade-in 
        slide-in-from-top ease-in-out duration-1000'>Welcome to Ear Trainer!</h1>
        <h4 className='text-3xl my-[2.5%] font-semibold animate-in fade-in 
        slide-in-from-top ease-in-out duration-1000'>
            Choose from interval training, chord identification training, or 
            chord progression training!
            <br/>Also check out the About page!
        </h4>
        <main className='flex flex-row justify-center gap-[4.5%] justify-center 
        animate-in fade-in slide-in-from-bottom-8 ease-in-out duration-1000'>
            <div className='flex-none w-[27%] border-solid rounded-xl border-4
            bg-gradient-to-b from-white to-slage-50 border-indigo-400
            transition ease-out hover:scale-110 duration-300'>
                <h3 className='text-4xl font-bold my-[5%]'>
                    Interval Training
                </h3>
                <p className='text-2xl leading-[140%] mx-[5%]'>
                    In interval training, you will be given 10 intervals to 
                    identify. Intervals will be played either broken or simultaneously 
                    and will range from a perfect unison to a major ninth.
                </p>
                <Link to='/intervals'>
                    <button className='text-3xl font-bold my-[10%] outline rounded-full
                    outline-indigo-400 w-[60%] h-[12%] outline-2 outline-offset-2 
                    bg-indigo-200 hover:bg-indigo-300'>
                        Play Intervals
                    </button>
                </Link>
            </div>
            <div className='flex-none w-[27%] border-solid rounded-xl border-4
            bg-gradient-to-b from-white to-slage-50 border-indigo-400
            transition ease-out hover:scale-110 duration-300'> 
                <h3 className='text-4xl font-bold my-[5%]'>
                    Chord Identification</h3>
                <p className='text-2xl leading-[140%] mx-[5%]'>
                    In chord identification, you will be given 10 chords to identify.
                    Possible chords: Major, Minor, Dominant 7th, 
                    Diminished 7th, Major 7th, Minor 7th, and Augmented Triad.
                </p>
                <Link to='/chords' >
                    <button className='text-3xl font-bold my-[10%] outline rounded-full
                    outline-indigo-400 w-[90%] h-[12%] outline-2 outline-offset-2 
                    bg-indigo-200 hover:bg-indigo-300'>
                        Play Chord Identification
                    </button>
                </Link>
            </div>
            <div className='flex-none w-[27%] border-solid rounded-xl border-4
            bg-gradient-to-b from-white to-slage-50 border-indigo-400
            transition ease-out hover:scale-110 duration-300'>
                <h3 className='text-4xl font-bold my-[5%]'>
                    Chord Progressions</h3>
                <p className='text-2xl leading-[140%] mx-[5%] my-[25%]'>
                    Coming Soon!
                </p>
                <Link to='/chordProgressions' >
                    {/*<button>Play Chord Progressions</button>*/}
                </Link>
            </div>
        </main>
        <p className='text-xl my-[2%]'>Created by Dieter Whittingham</p>
    </div>
    );
}

export default Home;