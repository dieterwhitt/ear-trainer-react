// dieter whittingahm
// may 2 2024
// playInterval.js

import keyboard from "./keyboard";

/**
 * plays a random interval (unison-major 9th) and returns the inter value
 * @param settings the settings object that determines what can be played
 * and how. see MCSettingInterface.js for more info
 * @returns the interval id that was played (int)
 */
export function playInterval(settings) {
    const delayS = 1; // SECONDS
    const lowestNote = 34; // 3g
    const highestNote = 45; // 4fs

    // we can now finally assume that the settings are interval-specific
    // since we are no longer in an abstract interface
    var delay = 0;
    // boolean determining if its ascending (only matters if broken)
    const ascending = Boolean(Math.floor(Math.random() * 2));
    // set delay based on settings
    if (settings.harmonic.value && settings.broken.value) {
        // harmonic or broken
        // choose randomly
        delay = delayS * Math.floor(Math.random() * 2);
    } else if (settings.harmonic.value) {
        // harmonic only
        delay = 0;
    } else if (settings.broken.value) {
        // broken only
        delay = delayS;
    }
    // index low note
    const rootIndex = Math.floor(
        Math.random() * (highestNote + 1 - lowestNote) + lowestNote
    );
    // interval from 0 to 14 semitones (unison to minor 9th)
    // only allow intervals that have been enabled
    var enabledIntervals = [];
    for (var option in settings) {
        if (settings[option].type === "ans" && settings[option].value) {
            // answer enabled: take id
            enabledIntervals.push(settings[option].id);
        }
    }
    console.log(`enabled interval types: ${enabledIntervals}`);
    // choose a random interval to play from the list
    if (enabledIntervals.length > 0) {
        const interval =
            enabledIntervals[
                Math.floor(Math.random() * enabledIntervals.length)
            ];
        // index of the high note
        const intervalIndex = rootIndex + interval;
        // play
        console.log(
            `playing interval ${interval} with root ${keyboard.notes[rootIndex].name}, 
            delay: ${delay}, ascending: ${ascending}`
        );
        // edge case: unison
        if (interval === 0) {
            keyboard.notes[rootIndex].play(0);
        } else if (ascending) {
            // play lower first
            keyboard.notes[rootIndex].play(0);
            keyboard.notes[intervalIndex].play(delay);
        } else {
            // play higher first
            keyboard.notes[rootIndex].play(delay);
            keyboard.notes[intervalIndex].play(0);
        }
        return interval;
    } else {
        // error
        alert("error: no intervals selected to play");
        return -1;
    }
}
