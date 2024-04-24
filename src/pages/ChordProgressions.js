//dieter whittingham
//jan 7 2024
//filename ChordProgressions.js

import React from "react";
import { testBass } from "../logic/keyboard";
import Title from "../components/Title";
import Header from "../components/Header";
import Subheader from "../components/Subheader";
import GenericButton1 from "../components/GenericButton1";

function ChordProgressions() {
    return (
        <div>
            <Title text="Chord Progression Training" />
            <Header
                text="Welcome to chord progression training. When you
            press play, you will be given a chord progression with 5 chords."
            />
            <Subheader text="Possible chords: I/i, IV/iv, V, V6/4, VI/vi." />
            <Title text="Coming Soon!" />
            <div
                className="animate-in fade-in 
                slide-in-from-bottom-[50%] ease-in-out duration-1000"
            >
                <GenericButton1
                    text="Preview Bass Generation"
                    enabled={true}
                    onClick={testBass}
                    py={1}
                    px={2}
                />
            </div>
        </div>
    );
}

export default ChordProgressions;
