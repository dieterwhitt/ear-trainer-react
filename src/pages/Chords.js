//dieter whittingham
//jan 7 2024
//filename Chords.js

import React from "react";

import MultipleChoiceInterface from "../components/MultipleChoiceInterface";
import { playChord } from "../logic/playChord";

//main component
function Chords() {
    const chordOptions = [
        { value: 0, label: "Major (Root Pos.)" },
        { value: 1, label: "Major (1st Inv.)" },
        { value: 2, label: "Minor (Root Pos.)" },
        { value: 3, label: "Minor (1st Inv.)" },
        { value: 4, label: "Dominant 7th" },
        { value: 5, label: "Diminished 7th" },
        { value: 6, label: "Major 7th" },
        { value: 7, label: "Minor 7th" },
        { value: 8, label: "Augmented Triad" },
    ];

    return (
        <div>
            <MultipleChoiceInterface
                options={chordOptions}
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
            />
        </div>
    );
}

export default Chords;
