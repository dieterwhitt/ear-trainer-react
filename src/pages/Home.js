//dieter whittingham
//jan 7 2023
//filename Home.js

// ...need to fix this garbage file (components)

import React from "react";
import { Link } from "react-router-dom";

import Title from "../components/Title";
import Header from "../components/Header";

/**
 * @description component for home page boxes
 * @param props.title title of the box
 * @param props.body body text of the box
 * @param props.button button text
 * @param props.link button destination
 * @param props.show_button hide button
 */
function HomeBox(props) {
    return (
        <div
            className="flex-none w-[27%] border-solid rounded-xl border-4
            bg-gradient-to-b from-white to-slate-50 border-indigo-400
            transition ease-out hover:scale-110 duration-300"
        >
            <header
                className="text-4xl font-normal py-[4%] bg-indigo-200
                border-solid border-indigo-400 border-b-4 rounded-t-md"
            >
                {props.title}
            </header>
            <p className="text-2xl leading-[140%] px-[5%] pt-[3%]">
                {props.body}
            </p>
            <Link to={props.link}>
                <HomeBoxButton text={props.button} show={props.show_button} />
            </Link>
        </div>
    );
}

/**
 * @param props.text button text
 * @param props.show whether to show the button
 */
function HomeBoxButton(props) {
    var show_button = true;
    if (props.show === false) {
        show_button = false;
    }
    if (show_button) {
        return (
            <button
                className="text-3xl font-normal my-[8%] outline rounded-full
                     outline-indigo-400 h-fit outline-2 outline-offset-2
                     py-[2%] px-[3%] mx-[5%] bg-indigo-200 hover:bg-indigo-300
                     hover:scale-110 duration-300"
            >
                {props.text}
            </button>
        );
    } else {
        return;
    }
}

function Home() {
    return (
        <div>
            <Title text="Welcome to Ear Trainer!" />
            <Header
                text="Choose from interval training, chord identification
                training, or chord progression training!"
            />
            <main
                className="flex flex-row justify-center gap-[4.5%] pt-[2%]
                animate-in fade-in slide-in-from-bottom-[10%] ease-out duration-1000"
            >
                <HomeBox
                    title="Interval Training"
                    body="In interval training, you will be given 10 intervals to
                        identify. Intervals will be played either broken or
                        simultaneously and will range from a perfect unison to a
                        major ninth."
                    button="Play Intervals"
                    link="/intervals"
                    show_button={true}
                />
                <HomeBox
                    title="Chord Identification"
                    body="In chord identification, you will
                    be given 10 chords to identify. Possible chords: Major,
                    Minor, Dominant 7th, Diminished 7th, Major 7th, Minor 7th,
                    and Augmented Triad"
                    button="Play Chord Identification"
                    link="/chords"
                    show_button={true}
                />
                <HomeBox
                    title="Chord Progressions"
                    body={
                        <div>
                            Coming Soon!
                            <br />
                            Current Progress:
                            <br />
                            Progression Generation Algorithm ✅<br />
                            Bass Note Generation Algorithm ✅<br />
                            Triad Generation Algorithm ⏳<br />
                            Exam-style evaluations ⏳
                        </div>
                    }
                    button="Play Chord Progressions"
                    link="/chordprogressions"
                    show_button={false}
                />
            </main>
            <div
                className="text-xl mt-[2.5%] mb-[1.5%]
                animate-in fade-in slide-in-from-bottom ease-out duration-1000"
            >
                Created by Dieter Whittingham
            </div>
        </div>
    );
}

export default Home;
