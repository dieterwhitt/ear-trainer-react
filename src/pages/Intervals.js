//dieter whittingham
//jan 7 2024
//filename Intervals.js

import React from "react";

import MultipleChoiceInterface from "../components/MultipleChoiceInterface";
import { playInterval } from "../logic/playInterval";

//main component
function Intervals() {
    return (
        <MultipleChoiceInterface
            defaultOption={{ value: -1, label: " Choose Interval ↓" }}
            playFunction={playInterval}
            keyword="Interval"
            title="Interval"
            header="Welcome to interval identification. When you press
            play, you will be given a series of random intervals. Identify
            them using the drop down box."
            subheader="All intervals up to and including a Major Ninth are
                    possible."
            defaultSettings={{
                "Perfect Unison": { type: "ans", id: 0, value: true, group: 0 },
                "Major Second": { type: "ans", id: 1, value: true, group: 0 },
                "Minor Second": { type: "ans", id: 2, value: true, group: 0 },
                "Minor Third": { type: "ans", id: 3, value: true, group: 0 },
                "Major Third": { type: "ans", id: 4, value: true, group: 0 },
                "Perfect Fourth": { type: "ans", id: 5, value: true, group: 0 },
                Tritone: { type: "ans", id: 6, value: true, group: 0 },
                "Perfect Fifth": { type: "ans", id: 7, value: true, group: 0 },
                "Minor Sixth": { type: "ans", id: 8, value: true, group: 0 },
                "Major Sixth": { type: "ans", id: 9, value: true, group: 0 },
                "Minor Seventh": { type: "ans", id: 10, value: true, group: 0 },
                "Major Seventh": { type: "ans", id: 11, value: true, group: 0 },
                "Perfect Octave": {
                    type: "ans",
                    id: 12,
                    value: true,
                    group: 0,
                },
                "Minor Ninth": { type: "ans", id: 13, value: true, group: 0 },
                "Major Ninth": { type: "ans", id: 14, value: true, group: 0 },
                broken: { type: "t/f", value: true, group: 0 },
                harmonic: { type: "t/f", value: true, group: 0 },
                rounds: { type: "num", value: 10, group: 0 },
            }}
        />
    );
}

export default Intervals;
