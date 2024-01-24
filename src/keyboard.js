//dieter whittingham
//jan 8 2023

//keyboard.js: file for configuring keyboard loading and chord theory

import React from 'react';

/*****************************
 * general functions
*******************************/

//a key is a string with an integer 0-9 followed by a note, representing all 88 keys

//array of notes
const notes = ['c','cs','d','ds','e','f','fs','g','gs','a','as','b'];
//const bottom_notes = notes.slice(8);
let keyboard = [];
let add = ''
for(let i = 0; i <= 8; i++){
    for(const note of notes){
        add = (i.toString()) + note;
        //a0, a#0, b0
        if(i === 0){
            if(notes.includes(note,9)){
                keyboard.push(add);
            }
        //c8
        }else if (i === 8){
            if (note === 'c'){
                keyboard.push(add);
            }
        //otherwise add
        }else if (i > 0 && i < 8){
            keyboard.push(add);
        }
    }
}
//now have a array of every key
console.log(keyboard);

export default keyboard;

/**
 * plays a single note
 * @param {int} note - keyboard index of the note 
 */
function play(note) {
    //wow...
    try {
        //load note object
        const noteobj = require('./sounds/piano-88-notes/' + keyboard[note] + '.wav');
        //play
        const sound = new Audio(noteobj);
        const volume = volumeFunction(note)
        sound.volume = volume;
        sound.play();
        console.log('play(): playing ' + keyboard[note] + ' with volume ' + volume);
    } catch (e) {
        alert('couldn\'t play note ' + keyboard[note] + ' ' + e);
    }
}
/**
 * exponential function to determine the volume of each note for balancing
 * higher notes - higher volume to balance the sound
 * @param {int} note - note on the keyboard which is being calculated
 * @returns volume 0-1
 */
export function volumeFunction(note){
    const a = 5.509;
    const b = 0.0393;
    const c = 14.49;
    //ae^(bx) + c
    const volume = (Math.floor(a * Math.exp(b * note) + c))/100;
    return volume;
}

/**
 * 
 * @param {int} percentage 
 * @returns a string of stars based on percentage
 */
export function getStars(percentage) {
    if (percentage < 50) {
        return '⭐'; //0-49
    } else if (percentage < 70) {
        return '⭐⭐'; //50-69
    } else if (percentage < 85) {
        return '⭐⭐⭐'; //70-84
    } else if (percentage < 95) {
        return '⭐⭐⭐⭐'; //85-95
    } else {
        return '⭐⭐⭐⭐⭐'; //95-100
    }
}
/*****************************
 * interval training
*******************************/


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
    const ascending = Boolean(Math.floor(Math.random() * 2))
    //choose root from 3c to 5c
    //i.e index 27 to 51
    let rootIndex = Math.floor(Math.random() * 25 + 27);
    //interval from 0 to 14 semitones (unison to minor 9th)
    const interval = Math.floor(Math.random() * 15);
    //index of the second note
    let intervalIndex = rootIndex + interval;

    if (!ascending){
        //swap which is played first if descending
        const temp = rootIndex;
        rootIndex = intervalIndex;
        intervalIndex = temp;
    }
    //play
    play(rootIndex);
    //with delay
    //ignoring unison
    if(interval !== 0){
        setTimeout(() => play(intervalIndex), delay);
    }    
    //return the interval
    return interval;
}

/*****************************
 * chord identification
*******************************/

//chord types
const chordArray = 
[
[0, 4, 7, 12], //0 - major in root position 
[0, 3, 8, 12], //1 - major in first inversion
[0, 3, 7, 12], //2 - minor in first inversion
[0, 4, 9, 12], //3 - minor in first inversion
[0, 4, 7, 10], //4 - dominant 7th
[0, 3, 6, 9], //5 - diminished 7th
[0, 4, 7, 11], //6 - major 7th
[0, 3, 7, 10], //7 - minor 7th
[0, 4, 8] //augmmented
];

/**
 * plays a random chord for chord identification training
 * @returns the type of chord that was played (int, index of chordArray)
 */
export function playChord() {
    //choose root from 4c to 4b
    //i.e index 39 to 50
    const rootIndex = Math.floor(Math.random() * 12 + 39);
    //random number from 0-8 determining the chord
    const chordType = Math.floor(Math.random() * 9);

    console.log('chord: playing chord type ' + chordType +
        ' with root ' + keyboard[rootIndex]);

    //play chord
    const chordIntervalArray = chordArray[chordType];
    //loop through all notes
    let volume;
    for (const note of chordIntervalArray) {
        play(rootIndex+note);
    }

    return chordType;
}

/*****************************
 * chord progressions
*******************************/

/**
 * create scale: creates a scale array which has the name
 * of the key plus the 8 notes in it as intervals from the first note
 * @param {string} note the first note of the scale ex. 'c', 'cs'
 * @param {boolean} key major - true minor - false
 * @returns 
 */
function createScale(note, key){
    if(key){
        //major key
        return [note + '+', 0, 2, 4, 5, 7, 9, 11];
    }else{
        //minor key
        return [note + '-', 0, 2, 3, 5, 7, 8, 11];
    } 
}
/**
 * given a scale generates a random chord progression in roman numerals
 * @param {array} scale 
 * @returns array of roman numeral strings representing the progression
 */
function createNumeralProgression(scale){
    /*
    seen progressions:
    I IV V64 V I
    I vi IV V I
    i iv i V VI
    I IV V64 V I
    i iv i V i
    i iv V64 V VI
    I IV I V I
    i iv V64 V I
    i VI iv V I
    I IV I V VI
    */
    let progression = [];
    //tonic chord
    //adjust according to minor at the end
    progression.push('I');
    //next 3:
    //0 - IV V64 V
    //1 - IV I V
    //2 - VI IV V
    //C represents V64
    const middleSequence = Math.floor(Math.random()*3);
    if (middleSequence === 0){
        progression.push('IV', 'C', 'V');
    }else if (middleSequence === 1){
        progression.push('IV', 'I', 'V');
    }else{
        progression.push('VI', 'IV', 'V');
    }
    const finalChord = Math.floor(Math.random()*2)
    //final chord: I or VI
    if(finalChord === 0){
        progression.push('I')
    }else{
        progression.push('VI')
    }

    //lastly convert numerals based on major/minor key
    if (scale[0].slice(-1) === '-'){
        //minor key: lowercase i, iv, uppercase VI
        for (const index in progression) {
            if(progression[index] === 'I' || progression[index] === 'IV'){
                //make it lowercase
                progression[index] = progression[index].toLowerCase();
            }
        }
    }else{
        //major key
        for (const index in progression) {
            if(progression[index] === 'VI'){
                //make it lowercase
                progression[index] = progression[index].toLowerCase();
            }
        }
    }
    console.log('current progression: ' + progression);
    return progression;
}
/**
 * converts a roman numeral to its index in a scale array
 * @param {string} numeral 
 * @returns - int index of scale
 */
function numeralToScaleIndex(numeral){
    if(numeral === 'I' || numeral === 'i'){
        return 1;
    }else if(numeral === 'IV' || numeral === 'iv'){
        return 4;
    }else if(numeral === 'V' || numeral === 'C'){
        return 5;
    }else{
        return 6;
    }
}

/**
 * 
 * @param {*} scale scale object
 * @param {*} low keyboard index of the lower bound to search
 * @param {*} high index of the upper bound
 * @returns - keyboard index of the searched note, or false if no note is found
 */
function scaleToNote(scale, low, high){
    //find the first tonic note of a scale in a given range
    for(let index = low; index <=high; index ++){
        //check if the scale note matches the current keyboard note
        if(scale[0].slice(0, -1) === keyboard[index].slice(1)){
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
 */
function chooseBass(previousNote, noteDiff, cadential, tonic){
    let cand1, cand2;
    if (noteDiff < 0){
        //moving down the scale
        cand1 = previousNote + noteDiff;
        //shift an octave up
        cand2 = cand1 + 12;
    }else if (noteDiff > 0){
        //moving up the scale
        cand2 = previousNote + noteDiff;
        //shift an octave down
        cand1 = cand2 - 12;
    }else{
        //same scale note (C -> V)
        cand2 = previousNote + 12;
        cand1 = previousNote - 12;
    }
    //now have 2 candidates
    let candidates = [cand1, cand2];
    console.log('current candidates:' + candidates + 
    ' cadential: ' + cadential);
    let chosen = -1;
    for (const index in candidates) {
        //remove any jump bigger than a 5th
        if (!cadential && Math.abs(previousNote - candidates[index]) > 7){
            //interval from previous to current is bigger than a 5th
            //not including cadential (octave jump)
            //remove candidate
            candidates.splice(index, 1);
            //choose the other object
            chosen = candidates[0];
        }
    }
    //if there are still 2 candidates
    if (chosen === -1){
        //handle cadential 
        if(cadential){
            if (previousNote < tonic){
                //previous note was lower than the tonic
                //jump to cand2
                chosen = cand2;
            }else{
                //previous note was higher
                //jump to cand1 (remove cand2)
                chosen = cand1;
            }
        }else if (previousNote > 33){
            //not candential and previous note was too high
            chosen = cand1;
        }else if (previousNote < 22){
            //too low
            chosen = cand2;
        }else{
            //choose at random
            console.log('choosing randomly between ' + candidates);
            const choice = Math.floor(Math.random() * 2);
            chosen = candidates.at(choice);
        }
    }
    console.log('chosen for chord: ' + chosen);
    return chosen;
}

/**
 * creates a base line in terms of keyboard indexes
 * @param {Array} scale 
 * @param {Array} numeralProgression
 * @returns a array of integers representing the keyboard indexes of the bass line
 */
function createBassProgression(scale, numeralProgression){   
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
    for (let index = 1; index <= 4; index ++) {
        //get what scale note we should be on
        currentScaleIndex = numeralToScaleIndex(numeralProgression[index]);
        //difference from the previous note to the current one
        noteDiff = scale[currentScaleIndex] - scale[previousScaleIndex];
        //get the note candidates
        //update cadential
        //true if the previous chord was cadential, allowing jumps on V
        numeralProgression[index - 1] === 'C' ? cadential = true : cadential = false;
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
 */
export function testBass(){
    const cmajorScale = createScale('f', false);
    const numeralProgression = createNumeralProgression(cmajorScale);
    const bassProgression = createBassProgression(cmajorScale, numeralProgression);
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
/**
* dictionary of songs used
* necessary for randomlly generated chord progressions
* false indicates that the song cannot be used in the progression or doesn't exist
* there may be multiple songs for each progression
* song format: string with start-destination numbers and split by a -
* ex. '51-71-34-55'
*/
const songDictionary = 
[
    [[false], ['songI-IV'], ['songI-V'], [false], [false]], //I -> I, IV, V, C, VI 
    [['songIV-I'], [false], ['songIV-V'], ['songIV-C'], [false]], //IV -> I, IV, V, C, VI 
    [], //V -> I, IV, V, C, VI 
    [], //C -> I, IV, V, C, VI 
    []  //VI -> I, IV, V, C, VI 
];
function getNextTriad(scale,  previousTriad){

}
/**
 * 
 * @param {*} scale 
 * @param {*} numeralProgression 
 */
function createTriadProgression(scale, numeralProgression){
    //triad: array of 3 scale indexes
    //then they will be converted into keyboard indexes in another function
    let triadProgression = [];//list of triad arrays
    //1st inversion triad
    //root: 3rd of the chord. root: 3g to 4fs
    const root = scaleToNote(scale, 34, 45);
    const tonic = [3, 5, 1];
    triadProgression.push(tonic);
    let previousTriad = tonic;
    //other 4 triads
    for(let index = 1; index <= 4; index ++){
        //use songs to get the next triad (previous chord, current chord)
        //const calculatedTriad = ;
    }  

}

function triadsToKeyboard(){

}

