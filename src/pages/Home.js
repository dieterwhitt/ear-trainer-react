//dieter whittingham
//jan 7 2023
//filename Home.js

// ...need to fix this garbage file (components)

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const homeStyle = 'font-font1 text-center';
    const titleStyle = 'text-6xl my-[3%] font-bold animate-in fade-in '
    + 'slide-in-from-top ease-in-out duration-1000';
    const infoStyle = 'text-3xl my-[3%] font-semibold animate-in fade-in '
    + 'slide-in-from-top ease-in-out duration-1000';
    const mainStyle = 'flex flex-row justify-center gap-[4.5%] '
    + 'animate-in fade-in slide-in-from-bottom-[10%] ease-out duration-1000';
    const boxStyle = 'flex-none w-[27%] border-solid rounded-xl border-4 '
    + 'bg-gradient-to-b from-white to-slate-50 border-indigo-400 '
    + 'transition ease-out hover:scale-110 duration-300';
    const boxHeaderStyle = 'text-4xl font-bold py-[4%] bg-indigo-200 '
    + 'border-solid border-indigo-400 border-b-4 rounded-t-md';
    const boxBodyStyle = 'text-2xl leading-[140%] px-[5%] pt-[3%]';
    const buttonStyle = 'text-3xl font-bold my-[8%] outline rounded-full '
    + 'outline-indigo-400 h-fit outline-2 outline-offset-2 py-[2%] px-[3%] mx-[5%] '
    + 'bg-indigo-200 hover:bg-indigo-300 hover:scale-110 duration-300';
    const footerStyle = 'text-xl mt-[2.5%] mb-[1.5%] '
    + 'animate-in fade-in slide-in-from-bottom ease-out duration-1000';
    return (
    <div className={homeStyle}>
        <h1 className={titleStyle}>Welcome to Ear Trainer!</h1>
        <h4 className={infoStyle}>
            Choose from interval training, chord identification training, or 
            chord progression training!
        </h4>
        <main className={mainStyle}>
            <div className={boxStyle}>
                <h3 className={boxHeaderStyle}>
                    Interval Training
                </h3>
                <p className={boxBodyStyle}>
                    In interval training, you will be given 10 intervals to 
                    identify. Intervals will be played either broken or simultaneously 
                    and will range from a perfect unison to a major ninth.
                </p>
                <Link to='/intervals'>
                    <button className={buttonStyle}>
                        Play Intervals
                    </button>
                </Link>
            </div>
            <div className={boxStyle}> 
                <h3 className={boxHeaderStyle}>
                    Chord Identification</h3>
                <p className={boxBodyStyle}>
                    In chord identification, you will be given 10 chords to identify.
                    Possible chords: Major, Minor, Dominant 7th, 
                    Diminished 7th, Major 7th, Minor 7th, and Augmented Triad.
                </p>
                <Link to='/chords' >
                    <button className={buttonStyle}>
                        Play Chord Identification
                    </button>
                </Link>
            </div>
            <div className={boxStyle}>
                <h3 className={boxHeaderStyle}>
                    Chord Progressions</h3>
                <p className={boxBodyStyle}>
                    Coming Soon!
                    <br/>
                    Current Progress:
                    <br/>Progression Generation Algorithm ✅
                    <br/>Bass Note Generation Algorithm ✅
                    <br/>Triad Generation Algorithm ⏳
                    <br/>Exam-style evaluations ⏳
                </p>
                <Link to='/chordProgressions' >
                    {/*<button>Play Chord Progressions</button>*/}
                </Link>
            </div>
        </main>
        <p className={footerStyle}>
            Created by Dieter Whittingham
        </p>
    </div>
    );
}

export default Home;