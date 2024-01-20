//dieter whittingham
//jan 8 2023

//keyboard.js: file for configuring keyboard loading and chord theory

import React from 'react';

/*****************************
 * general functions
*******************************/

//a key is a string with an integer 0-9 followed by a note, representing all 88 keys

//list of notes
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
//now have a list of every key
console.log(keyboard);

export default keyboard;

/**
 * plays a single note
 * @param {string} note 
 * @param {float} volume 
 */
function play(note, volume) {
    //wow...
    try {
        //load note object
        const noteobj = require('./sounds/piano-88-notes/' + note + '.wav');
        //play
        const sound = new Audio(noteobj);
        sound.volume = volume;
        sound.play();
        console.log('play(): playing ' + note);
    } catch (e) {
        alert('couldn\'t play note ' + note + ' ' + e);
    }
}

/**
 * 
 * @param {float} percentage 
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
    delay *= 500;
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
    play(keyboard[rootIndex], 0.6);
    //with delay
    //ignoring unison
    if(interval !== 0){
        setTimeout(() => play(keyboard[intervalIndex], 0.6), delay);
    }    
    //return the interval
    return interval;
}

/*****************************
 * chord identification
*******************************/

//chord types
const chordList = 
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
 * @returns the type of chord that was played (int, index of chordList)
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
    const chordIntervalList = chordList[chordType];
    //loop through all notes
    for (const note of chordIntervalList) {
        play(keyboard[(rootIndex + note)], 0.6);
    }

    return chordType;
}

/*****************************
 * chord progressions
*******************************/

/**
 * create scale: creates a scale list which has the name
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
 * @param {list} scale 
 * @returns list of roman numeral strings representing the progression
 */
function createProgressionList(scale){
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
    finalChord = Math.floor(Math.random()*2)
    //final chord: I or VI
    if(finalChord === 0){
        progression.push('I')
    }else{
        progression.push('VI')
    }

    //lastly convert numerals based on major/minor key
    if (scale.slice(-1) === '-'){
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
    return progression;
}

function createBassProgression(scale){   
    //bass: getting tonic bass note
    //tonic note is from 2g-3fs which is index 22-33
    let bassTonic;
    for(let index = 22; index <=33; index ++){
        //check if the scale note matches the current keyboard note
        if(scale[0].slice(0, -1) === keyboard[index].slice(1)){
            bassTonic = index;
        }
    }
    //the output progression list will be:
    //tonic note (index) followed by integers referencing where the bass progression is going
    //relative to the tonic. (get note: scale index -> interval -> keyboard note)
    
}


