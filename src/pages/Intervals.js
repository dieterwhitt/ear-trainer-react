//dieter whittingham
//jan 7 2024
//filename Intervals.js

import React from "react";

import MultipleChoiceInterface from "../components/MultipleChoiceInterface";
import { playInterval } from "../logic/playInterval";

//main component
function Intervals() {
    const intervalOptions = [
        { value: 0, label: "Perfect Unison" },
        { value: 1, label: "Minor Second" },
        { value: 2, label: "Major Second" },
        { value: 3, label: "Minor Third" },
        { value: 4, label: "Major Third" },
        { value: 5, label: "Perfect Fourth" },
        { value: 6, label: "Tritone" },
        { value: 7, label: "Perfect Fifth" },
        { value: 8, label: "Minor Sixth" },
        { value: 9, label: "Major Sixth" },
        { value: 10, label: "Minor Seventh" },
        { value: 11, label: "Major Seventh" },
        { value: 12, label: "Perfect Octave" },
        { value: 13, label: "Minor Ninth" },
        { value: 14, label: "Major Ninth" },
    ];

    return (
        <MultipleChoiceInterface
            defaultAnswers={intervalOptions}
            defaultOption={{ value: -1, label: "Choose Interval ↓" }}
            playFunction={playInterval}
            keyword="Interval"
            title="Interval"
            header="Welcome to interval identification. When you press
            play, you will be given a series of random intervals. Identify
            them using the drop down box."
            subheader={
                <div>
                    All intervals up to and including a Major Ninth are
                    possible.
                    <br />
                    (Difficulty options coming soon!)
                </div>
            }
            defaultSettings={{
                broken: { type: "t/f", value: true, group: 0 },
                harmonic: { type: "t/f", value: true, group: 0 },
                rounds: { type: "num", value: 10, group: 0 },
            }}
        />
    );
}

export default Intervals;
