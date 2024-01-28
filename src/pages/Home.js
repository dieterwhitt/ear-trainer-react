//dieter whittingham
//jan 7 2023
//filename Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className='font-font1 text-center'>
        <h1 className='text-5xl h-12 my-8 font-bold animate-in fade-in slide-in-from-top ease-in-out duration-1000'>Welcome to Ear Trainer!</h1>
        <h4 className='text-2xl my-6 font-semibold animate-in fade-in slide-in-from-top ease-in-out duration-1000'>Choose from interval training, chord identification training, or chord progression training!
            <br/>Also check out the About page!</h4>
        <main className='flex flex-row justify-center gap-12 justify-center'>
            <div className='flex-1 w-1/4 border-solid rounded-xl border-2'>
                <h3 className='text-xl font-bold'>Interval Training</h3>
                <p>In interval training, you will be given 10 intervals to identify.
                    Intervals will be played either broken or simultaneously and will range from
                    a perfect unison to a major ninth.
                </p>
                <Link to='/intervals' >
                    <button>Play Intervals</button>
                </Link>
            </div>
            <div className='flex-1 w-1/4'> 
                <h3>Chord Identification Training</h3>
                <p>In chord identification, you will be given 10 chords to identify.
                    The possible chords are: Major (root position or first inverstion),
                    Minor(root position or first inversion) Dominant 7th, Diminished 7th,
                    Major 7th, Minor 7th, and Augmented Triad.
                </p>
                <Link to='/chords' >
                    <button>Play Chord Identification</button>
                </Link>
            </div>
            <div className='flex-1 w-1/4'>
                <h3>Chord Progression Training</h3>
                <p>Coming Soon!
                </p>
                <Link to='/chordProgressions' >
                    <button>Play Chord Progressions</button>
                </Link>
            </div>
        </main>
    </div>
    );
}

export default Home;