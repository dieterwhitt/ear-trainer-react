//dieter whittingham
//jan 7 2023
//filename Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className="font-font1 text-center">
        <h1>Welcome to Ear Trainer</h1>
        <h4>Choose from interval training, chord identification training, or chord progression training!
            <br/>Also check out the About page!</h4>

        <div>
            <h3>Interval Training</h3>
            <p>In interval training, you will be given 10 intervals to identify.
                Intervals will be played either broken or simultaneously and will range from
                a perfect unison to a major ninth.
            </p>
            <Link to='/intervals' >
                <button>Play Intervals</button>
            </Link>
        </div>
        <div>
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
        <div>
            <h3>Chord Progression Training</h3>
            <p>Coming Soon!
            </p>
            <Link to='/chordProgressions' >
                <button>Play Chord Progressions</button>
            </Link>
        </div>
    </div>
    );
}

export default Home;