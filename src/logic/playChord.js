// dieter whittingham
// may 2 2024
// playChord.js

import keyboard from "./keyboard";
import { loaded } from "./keyboard";

// not refactored yet

/**
 * plays a random chord for chord identification training
 * @returns the type of chord that was played (int, index of chordArray)
 */
export function playChord() {
    //chord types
    const chordArray = [
        [0, 4, 7, 12], //0 - major in root position
        [0, 3, 8, 12], //1 - major in first inversion
        [0, 3, 7, 12], //2 - minor in first inversion
        [0, 4, 9, 12], //3 - minor in first inversion
        [0, 4, 7, 10], //4 - dominant 7th
        [0, 3, 6, 9], //5 - diminished 7th
        [0, 4, 7, 11], //6 - major 7th
        [0, 3, 7, 10], //7 - minor 7th
        [0, 4, 8], //augmmented
    ];
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
}
