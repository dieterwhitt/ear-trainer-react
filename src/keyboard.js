//dieter whittingham
//jan 8 2023
//sound player

import React from 'react';

//a key is a string with an integer 0-9 followed by a note, representing all 88 keys

//list of notes
const notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
//const bottom_notes = notes.slice(8);
let keyboard = [];

const filepath = './sounds/piano-88-notes/'

for(let i = 0; i <= 8; i++){
    for(const note of notes){
        let add = filepath + note + (i.toString()) + '.wav';
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
console.log(keyboard);

//export default keyboard;
