// dieter whittingham
// may 2 2024
// playProgression.js

// not refactored

import keyboard from "./keyboard"; /*
/*

/**
 * create scale: creates a scale array which has the name
 * of the key plus the 8 notes in it as intervals from the first note
 * @param {string} note the first note of the scale ex. 'c', 'cs'
 * @param {boolean} key major - true minor - false
 * @returns
  */ /*
function createScale(note, key) {
    if (key) {
        //major key
        return [note + "+", 0, 2, 4, 5, 7, 9, 11];
    } else {
        //minor key
        return [note + "-", 0, 2, 3, 5, 7, 8, 11];
    }
} /*

/**
 * given a scale generates a random chord progression in roman numerals
 * @param {array} scale
 * @returns array of roman numeral strings representing the progression
 */ /*
function createNumeralProgression(scale) {
    /*
    seen progressions:
    I IV I V I/VI
    I IV C V I/VI
    I VI IV C V
    I IV I C V
    I IV V I V
    I V I IV I
    I V I IV V
    cadence types:
    first 2 chords:
    tonic
        - IV I (tonic 4)
        - V I (tonic 5)
    cadential
        - IV C
    dominant
        - IV V
    dominant/cadential prep
        - VI IV

    cadences:
        - (cadential, dominant prep, tonic 4) V I
        - (cadential, dominant prep, tonic 4) V VI
        - (tonic 4, dominant prep) C V
        - (tonic 5) IV I
        - (dominant) I V
     */ /*
    const leadingChords = [
        ["IV", "I"], // 0 - tonic 4
        ["V", "I"], // 1 - tonic 5
        ["IV", "C"], // 2 - cadential
        ["IV", "V"], // 3 - dominant
        ["VI", "IV"], // 4 - dominant/cad prep
    ];
    const cadences = [
        ["V", "I"], //(0,2,4)
        ["V", "VI"], //(0,2,4)
        ["C", "V"], //(0, 4)
        ["IV", "I"], //(1)
        ["I", "V"], //(3)
    ];
    const transitions = [
        [0, 1, 2], // 0 -> 0, 1, 2
        [3], // 1 -> 3
        [0, 1], // 2 -> 0, 1
        [4], // 3 -> 4
        [0, 1, 2], //4 -> 0, 1, 2
    ];
    let progression = [];
    //tonic chord
    //adjust according to minor at the end
    progression.push("I");
    const leadingChordIndex = Math.floor(Math.random() * 5); // random 0-5
    console.log("the leading chord index is " + leadingChordIndex);
    //adding beginning chords
    for (const chord of leadingChords[leadingChordIndex]) {
        progression.push(chord);
    }
    //get possible cadences
    const possibleCadenceIndex = transitions[leadingChordIndex];
    console.log("the possible cadences are " + possibleCadenceIndex);

    const chosen = Math.floor(Math.random() * possibleCadenceIndex.length);
    console.log("the chosen index of the possible cadences is " + chosen);
    //adding cadence
    for (const chord0 of cadences[possibleCadenceIndex[chosen]]) {
        progression.push(chord0);
    }

    //lastly convert numerals based on major/minor key
    if (scale[0].slice(-1) === "-") {
        //minor key: lowercase i, iv, uppercase VI
        for (const index in progression) {
            if (progression[index] === "I" || progression[index] === "IV") {
                //make it lowercase
                progression[index] = progression[index].toLowerCase();
            }
        }
    } else {
        //major key
        for (const index in progression) {
            if (progression[index] === "VI") {
                //make it lowercase
                progression[index] = progression[index].toLowerCase();
            }
        }
    }
    console.log("current progression: " + progression);
    return progression;
}
/**
 * converts a roman numeral to its index in a scale array
 * @param {string} numeral
 * @returns - int index of scale
  */ /*
function numeralToScaleIndex(numeral) {
    if (numeral === "I" || numeral === "i") {
        return 1;
    } else if (numeral === "IV" || numeral === "iv") {
        return 4;
    } else if (numeral === "V" || numeral === "C") {
        return 5;
    } else {
        return 6;
    }
}

/**
 *
 * @param {*} scale scale object
 * @param {*} low keyboard index of the lower bound to search
 * @param {*} high index of the upper bound
 * @returns - keyboard index of the searched note, or false if no note is found
  */ /*
function scaleToNote(scale, low, high) {
    //find the first tonic note of a scale in a given range
    for (let index = low; index <= high; index++) {
        //check if the scale note matches the current keyboard note
        if (scale[0].slice(0, -1) === keyboard[index].slice(1)) {
            return index;
        }
    }
    return false;
}
/**
 * compartmentalizing the selection of the bass note
 * splits into 2 candidates then returns the best one
 * @param {int} previousNote - the previous note on the keyboard
 * @param {int} noteDiff - the distanc e(semitones) from the previous scale position to the
 * current
 * @param {boolean} cadential - boolean representing if the current chord is a Cad 6/4
 * @param {int} tonic - tonic note of the scale for detemrining Cadential jumps
  */ /*
function chooseBass(previousNote, noteDiff, cadential, tonic) {
    let cand1, cand2;
    if (noteDiff < 0) {
        //moving down the scale
        cand1 = previousNote + noteDiff;
        //shift an octave up
        cand2 = cand1 + 12;
    } else if (noteDiff > 0) {
        //moving up the scale
        cand2 = previousNote + noteDiff;
        //shift an octave down
        cand1 = cand2 - 12;
    } else {
        //same scale note (C -> V)
        cand2 = previousNote + 12;
        cand1 = previousNote - 12;
    }
    //now have 2 candidates
    let candidates = [cand1, cand2];
    console.log(
        "current candidates:" + candidates + " cadential: " + cadential
    );
    let chosen = -1;
    for (const index in candidates) {
        //remove any jump bigger than a 5th
        if (!cadential && Math.abs(previousNote - candidates[index]) > 7) {
            //interval from previous to current is bigger than a 5th
            //not including cadential (octave jump)
            //remove candidate
            candidates.splice(index, 1);
            //choose the other object
            chosen = candidates[0];
        }
    }
    //if there are still 2 candidates
    if (chosen === -1) {
        //handle cadential
        if (cadential) {
            //50% chance to stay on note
            const stay = Boolean(Math.floor(Math.random() * 2));
            if (stay) {
                if (previousNote < tonic) {
                    //previous note was lower than the tonic
                    //jump to cand2
                    chosen = cand2;
                } else {
                    //previous note was higher
                    //jump to cand1 (remove cand2)
                    chosen = cand1;
                }
            } else {
                chosen = previousNote;
            }
        } else if (previousNote > 33) {
            //not candential and previous note was too high
            chosen = cand1;
        } else if (previousNote < 22) {
            //too low
            chosen = cand2;
        } else {
            //choose at random
            console.log("choosing randomly between " + candidates);
            const choice = Math.floor(Math.random() * 2);
            chosen = candidates.at(choice);
        }
    }
    console.log("chosen for chord: " + chosen);
    return chosen;
}

/**
 * creates a base line in terms of keyboard indexes
 * @param {Array} scale
 * @param {Array} numeralProgression
 * @returns a array of integers representing the keyboard indexes of the bass line
  */ /*
function createBassProgression(scale, numeralProgression) {
    //bass: getting tonic bass note
    //tonic note is from 2g-3fs which is index 22-33
    let bassProgression = [];
    const tonic = scaleToNote(scale, 22, 33);
    //other 4 notes
    //keeping track of the previous note played for harmony reasons
    bassProgression.push(tonic);
    let previousNote = tonic;
    //keeping track of previous scale index
    let previousScaleIndex = 1;
    let currentScaleIndex, noteDiff; //integers
    let cadential; //boolean
    let chosen; //each chord's chosen bass note
    //cand2 > cand1
    for (let index = 1; index <= 4; index++) {
        //get what scale note we should be on
        currentScaleIndex = numeralToScaleIndex(numeralProgression[index]);
        //difference from the previous note to the current one
        noteDiff = scale[currentScaleIndex] - scale[previousScaleIndex];
        //get the note candidates
        //update cadential
        //true if the previous chord was cadential, allowing jumps on V
        numeralProgression[index - 1] === "C"
            ? (cadential = true)
            : (cadential = false);
        //calling separate function
        chosen = chooseBass(previousNote, noteDiff, cadential, tonic);
        bassProgression.push(chosen);
        //update
        previousNote = chosen;
        previousScaleIndex = currentScaleIndex;
    }
    return bassProgression;
}
/**
 * bass line testing function
  */ /*
export function testBass() {
    const cmajorScale = createScale("f", false);
    const numeralProgression = createNumeralProgression(cmajorScale);
    const bassProgression = createBassProgression(
        cmajorScale,
        numeralProgression
    );
    let delay = 0;
    for (const note of bassProgression) {
        setTimeout(() => play(note), delay);
        delay += 1500;
    }
}
/*
function scaleTonicTriad(scale){
    //1st inversion triad
    //root: 3rd of the chord. root: 3g to 4fs
    const root = scaleToNote(scale, 34, 45);
    //first inversion
    const tonicTriad = [root + scale[3], root + scale[5], root + 12];
    return tonicTriad;
}
 */ /*

/**
 * function for applying a song if it applies, otherwise returs false (default)
 * @param {Array} previousTriad - the previous triad
 * @param {String} previousNumeral - previous numeral
 * @param {String} currentNumeral - current numeral
 * @param {Boolean} cadence - whether it's at a cadence
  */ /*
function applySong(previousTriad, previousNumeral, currentNumeral, cadence) {
    /**
     * dictionary of songs used
     * necessary for randomlly generated chord progressions
     * false indicates that the song cannot be used in the progression or doesn't exist
     * there may be multiple songs for each progression
     * song format: string with start-destination numbers and split by a -
     * ex. '51-71-23-55'
      */ /*
    const songs = [
        //2-1 tonic (V-I, not at cadences)
        "71-53-21",
        //2-3 tonic (V-I, anywhere)
        "71-23-55",
        //21 sacrifice (V-I, cadences only)
        "75-53-21",
        //weak deceptive (V-VI, cadences only)
        "71-53-21",
        //plagal cadence (IV-I, cadences only)
        "11-65-43",
        //half cadence 3-2 (I-V, cadences only)
        "55-32-17",
        //half cadence 1-2 (I-V, cadences only)
        "35-57-12",
    ];
    const progression = [previousNumeral, currentNumeral];
    let song = "";
    let choice = 0;
    if (previousNumeral === "V") {
        //pick random song and apply
        if (currentNumeral === "I") {
            if (cadence) {
                //choose between index 1 and 2, choose 1 75% of the time
                choice = Math.floor(Math.random() * 4);
                if (choice < 4) {
                    //75% chance
                    choice = 1;
                } else {
                    choice = 2;
                }
                song = songs[choice];
            } else {
                //choose between index 0 and 1
                song = songs[Math.floor(Math.random() * 2) + 1];
            }
        } else if (currentNumeral.toUpperCase() === "VI" && cadence) {
            //weak deceptive
            song = songs[3];
        } else {
            //not V-I or V-VI cadential
            return false;
        }
    } else if (
        previousNumeral.toUpperCase() === "IV" &&
        currentNumeral.toUpperCase() === "I" &&
        cadence
    ) {
        //plagal cadence
        song = songs[4];
    } else if (
        previousNumeral.toUpperCase() === "I" &&
        currentNumeral.toUpperCase() === "V" &&
        cadence
    ) {
        //half cadence
        //choose between 5 and 6
        choice = Math.floor(Math.random() * 2) + 5;
        song = songs[choice];
    } else {
        //song not found
        return false;
    }
    //now implementing the song
    let newTriad = [];
    let chosen = false;
    let songIndex = 0;
    for (const note of previousTriad) {
        chosen = false;
        songIndex = 0;
        while (!chosen) {
            // index of the KEY characters in the song string
            if (note === song[songIndex]) {
                // if note in the triad is matched in the song string: add the song value
                newTriad.push(song[songIndex + 1]);
                // skip out the loop
                chosen = true;
            } else if (!chosen && songIndex > 6) {
                //error checking
                console.log("unable to convert song, stuck in loop");
            }
            songIndex += 3;
        }
    }
    //new triad done
    return newTriad;
}
/**
 *
 * @param {*} scale
 * @param {*} previousTriad
 * @param {*} previousNumeral
 * @param {*} currentNumeral
 * @param {*} cadence
  */ /*
function getNextTriad(
    scale,
    previousTriad,
    previousNumeral,
    currentNumeral,
    cadence
) {
    const appliedSongs = applySong(
        previousTriad,
        previousNumeral,
        currentNumeral,
        cadence
    );
    if (Array.isArray(appliedSongs)) {
        //check if songs apply
        return appliedSongs;
    }
    let possibleNotes = [];
    const triadRoot = numeralToScaleIndex(currentNumeral);
}

/**
 * first check if a song is applicable
 * for each note, get all possible destinations
 * use these to
 *
  */ /*

/**
 *
 * @param {*} scale
 * @param {*} numeralProgression
  */ /*
function createTriadProgression(scale, numeralProgression) {
    //triad: array of 3 scale indexes
    //then they will be converted into keyboard indexes in another function
    let triadProgression = []; //list of triad arrays
    //1st inversion triad
    //root: 3rd of the chord. root: 3g to 4fs
    const root = scaleToNote(scale, 34, 45);
    const tonic = [3, 5, 1];
    triadProgression.push(tonic);
    let previousTriad = tonic;
    //other 4 triads
    for (let index = 1; index <= 4; index++) {
        //use songs to get the next triad (previous chord, current chord)
        //const calculatedTriad = ;
    }
}

function triadsToKeyboard() {}

 */
