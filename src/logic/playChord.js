// dieter whittingham
// may 2 2024
// playChord.js

import keyboard from "./keyboard";
import { loaded } from "./keyboard";

// add calculated inversions soon
// need to add new setting type to do this

/**
 * plays a random chord for chord identification training
 * @returns the type of chord that was played (int, index of chordArray)
 */
export function playChord(settings) {
    // chord types
    const chordArray = [
        [0, 4, 7, 12], // 0 - major in root position
        [0, 3, 8, 12], // 1 - major in first inversion
        [0, 3, 7, 12], // 2 - minor in first inversion
        [0, 4, 9, 12], // 3 - minor in first inversion
        [0, 4, 7, 10], // 4 - dominant 7th
        [0, 3, 6, 9], // 5 - diminished 7th
        [0, 4, 7, 11], // 6 - major 7th
        [0, 3, 7, 10], //`7 - minor 7th
        [0, 4, 8], // 8 - augmmented triad
    ];

    const delayS = 0.5; // SECONDS
    const lowestNote = 34; // 3g
    const highestNote = 45; // 4fs

    // we can now finally assume that the settings are chord specific
    // boolean determining if its ascending (only matters if broken)
    const ascending = Boolean(Math.floor(Math.random() * 2));
    // broken or harmonic based on settings
    var broken = false;
    if (settings.harmonic.value && settings.broken.value) {
        // harmonic or broken
        // choose randomly
        broken = Boolean(Math.floor(Math.random() * 2));
    } else if (settings.harmonic.value) {
        // harmonic only
        broken = false;
    } else if (settings.broken.value) {
        // broken only
        broken = true;
    }
    // index low note
    const rootIndex = Math.floor(
        Math.random() * (highestNote + 1 - lowestNote) + lowestNote
    );
    // interval from 0 to 14 semitones (unison to minor 9th)
    // only allow intervals that have been enabled
    var enabledChords = [];
    for (var option in settings) {
        if (settings[option].type === "ans" && settings[option].value) {
            // answer enabled: take id
            enabledChords.push(settings[option].id);
        }
    }
    console.log(`enabled chord types: ${enabledChords}`);
    // choose a random chord to play from the list
    if (enabledChords.length > 0) {
        // index in chord array
        const chordType =
            enabledChords[Math.floor(Math.random() * enabledChords.length)];
        // chord itself (array of intervals)
        const chord = chordArray[chordType];
        // play
        // cases: harmonic, broken ascending, broken descending
        var time = 0;
        if (!ascending && broken) {
            // descending: play lowest note last
            time = (chord.length - 1) * delayS;
        }
        // playing
        console.log(
            `playing chord ${chordType} with root ${keyboard[rootIndex].name}, 
            broken: ${broken}, ascending: ${ascending}`
        );
        for (var interval of chord) {
            // play note relative to root index
            keyboard[rootIndex + interval].play(time);
            // update time for next note
            if (!broken) {
                // harmonic: no delay
                time = 0;
            } else if (ascending) {
                time += delayS;
            } else {
                // descending: go closer to 0
                time -= delayS;
            }
        }
        return chordType;
    } else {
        // error
        alert("error: no chords selected to play");
        return -1;
    }

    /*



    //choose root from 4c to 4b
    //i.e index 39 to 50
    const rootIndex = Math.floor(Math.random() * 12 + 39);
    //random number from 0-8 determining the chord
    const chordType = Math.floor(Math.random() * 9);

    console.log(
        "chord: playing chord type " +
            chordType +
            " with root " +
            keyboard[rootIndex]
    );

    //play chord
    const chordIntervalArray = chordArray[chordType];
    //loop through all notes
    let volume;
    for (const note of chordIntervalArray) {
        keyboard[note + rootIndex].play();
    }

    return chordType;
    */
}
