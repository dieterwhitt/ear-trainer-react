//dieter whittingham
//jan 8 2023

//keyboard.js: file for configuring keyboard loading and chord theory

import React from 'react';

//general functions

//a key is a string with an integer 0-9 followed by a note, representing all 88 keys

//list of notes
const notes = ['c','cs','d','ds','e','f','fs','g','gs','a','as','b'];
//const bottom_notes = notes.slice(8);
let keyboard = [];

for(let i = 0; i <= 8; i++){
    for(const note of notes){
        let add = (i.toString()) + note;
        //a0, a#0, b0
        if(i == 0){
            if(notes.includes(note,9)){
                keyboard.push(add);
            }
        //c8
        }else if (i == 8){
            if (note == 'c'){
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

//plays a single note 
//string -> void
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

//returing string of stars based on percentage
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

//interval training

//plays a random interval (unison-major 9th) and returns the inter value
export function playInterval() {
    //random 0 or 1 which will determine if there will be a delay
    var delay = Math.floor(Math.random() * 2);
    //if delay = 1, will have a 500 ms delay between notes.
    delay = delay * 500;

    //choose root from 3c to 5c
    //i.e index 27 to 51
    const rootIndex = Math.floor(Math.random() * 25 + 27);
    //interval from 0 to 14 semitones (unison to minor 9th)
    const interval = Math.floor(Math.random() * 15);

    const intervalIndex = rootIndex + interval;
    //with delay
    play(keyboard[rootIndex], 1);
    //unison: play only the root
    if (interval != 15) {
        setTimeout(() => play(keyboard[intervalIndex], 0.6), delay);
    }
    //return the interval
    return interval;
}

//chord identification

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

//plays a random chord
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

//for chord progressions

//create scale: creates a list which has the name
//of the key plus the 8 notes in it as intervals from the first note
//note: the first note (string) ex. 'c', 'cs'
//key: one of 'major' or 'minor'
export function createScale(note, key){
    if(key){
        //major key
        return [note + '+', 0, 2, 4, 5, 7, 9, 11]
    }else{
        //minor key
        return [note + '-', 0, 2, 3, 5, 7, 8, 11]
    } 
}

function createProgression(scale){

}


