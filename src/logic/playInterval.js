// dieter whittingahm
// may 2 2024
// playInterval.js

// not refactored yet

/**
 * plays a random interval (unison-major 9th) and returns the inter value
 * @returns the interval that was played (int)
 */
export function playInterval() {
    //random boolean which will determine if there will be a delay
    let delay = Math.floor(Math.random() * 2);
    //500 ms
    delay *= 1000;
    //boolean determining if its ascending
    const ascending = Boolean(Math.floor(Math.random() * 2));
    //choose root from 3c to 5c
    //i.e index 27 to 51
    let rootIndex = Math.floor(Math.random() * 25 + 27);
    //interval from 0 to 14 semitones (unison to minor 9th)
    const interval = Math.floor(Math.random() * 15);
    //index of the second note
    let intervalIndex = rootIndex + interval;

    if (!ascending) {
        //swap which is played first if descending
        const temp = rootIndex;
        rootIndex = intervalIndex;
        intervalIndex = temp;
    }
    //play
    play(rootIndex);
    //with delay
    //ignoring unison
    if (interval !== 0) {
        setTimeout(() => play(intervalIndex), delay);
    }
    //return the interval
    return interval;
}
