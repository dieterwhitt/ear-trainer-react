//dieter whittingham
//jan 7 2023
//filename Intervals.js

import React from "react";
import { useState, useEffect, useRef } from "react";
import { getStars, playInterval } from "../logic/keyboard";
import Title from "../components/Title";
import Header from "../components/Header";
import Subheader from "../components/Subheader";

import Select from "react-select";
import MultipleChoiceInterface from "../components/MultipleChoiceInterface";

//main component
const Intervals = () => {
    const interval_options = [
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
            options={interval_options}
            default_option={{ value: -1, label: "Choose Interval" }}
            keyword="Interval"
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
        />
    );
};

export default Intervals;
