//dieter whittingham
//jan 8 2023
//sound player

import React from 'react';

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
        new Audio(noteobj).play();
        console.log("play(): playing " + note);
    } catch (e) {
        alert("couldn't play note " + note + " " + e);
    }
}

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

//returing string of stars based on percentage
function getStars(percentage) {
    if (percentage < 50) {
        return "⭐"; //0-49
    } else if (percentage < 70) {
        return "⭐⭐"; //50-69
    } else if (percentage < 85) {
        return "⭐⭐⭐"; //70-84
    } else if (percentage < 95) {
        return "⭐⭐⭐⭐"; //85-95
    } else {
        return "⭐⭐⭐⭐⭐"; //95-100
    }
}

export {play, chordList, getStars};

