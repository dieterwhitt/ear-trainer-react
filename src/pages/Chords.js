//dieter whittingham
//jan 7 2024
//filename Chords.js

import React from "react";

import MultipleChoiceInterface from "../components/MultipleChoiceInterface";
import { playChord } from "../logic/playChord";

//main component
function Chords() {
    return (
        <div>
            <MultipleChoiceInterface
                defaultOption={{ value: -1, label: "Choose Chord ↓" }}
                playFunction={playChord}
                keyword="Chord"
                title="Chord Identification"
                header="Welcome to chord identification. When you press
                play, you will be given a series of random chords. Identify
                them using the drop down box."
                subheader={
                    <div>
                        The possible chords are: Major, Minor, Dominant 7th,
                        Diminished 7th, Major 7th, Minor 7th, and Augmented
                        Triad.
                        <br />
                        Major and Minor may be in root position or first
                        inversion. All other chords will be in root position.
                        <br />
                        (Difficulty options coming soon!)
                    </div>
                }
                defaultSettings={{
                    rounds: { type: "num", value: 10, group: 0 },
                }}
            />
        </div>
    );
}

export default Chords;
