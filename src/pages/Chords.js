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
                        Inversions for all chords coming soon!
                    </div>
                }
                defaultSettings={{
                    "Major (Root Pos.)": {
                        type: "ans",
                        id: 0,
                        value: true,
                        group: 0,
                    },
                    "Major (1st Inv.)": {
                        type: "ans",
                        id: 1,
                        value: true,
                        group: 0,
                    },
                    "Minor (Root Pos.)": {
                        type: "ans",
                        id: 2,
                        value: true,
                        group: 0,
                    },
                    "Minor (1st Inv.)": {
                        type: "ans",
                        id: 3,
                        value: true,
                        group: 0,
                    },
                    "Dominant 7th": {
                        type: "ans",
                        id: 4,
                        value: true,
                        group: 0,
                    },
                    "Diminished 7th": {
                        type: "ans",
                        id: 5,
                        value: true,
                        group: 0,
                    },
                    "Major 7th": { type: "ans", id: 6, value: true, group: 0 },
                    "Minor 7th": {
                        type: "ans",
                        id: 7,
                        value: true,
                        group: 0,
                    },
                    "Augmented Triad": {
                        type: "ans",
                        id: 8,
                        value: true,
                        group: 0,
                    },
                    broken: { type: "t/f", value: true, group: 0 },
                    harmonic: { type: "t/f", value: true, group: 0 },
                    rounds: { type: "num", value: 10, group: 0 },
                }}
            />
        </div>
    );
}

export default Chords;
