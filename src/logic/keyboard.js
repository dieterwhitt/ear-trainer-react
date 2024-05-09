// dieter whittingham
// jan 8 2024
// keyboard.js

// file for configuring keyboard loading and chord theory

// still need to add loading screen/loading page

class Note {
    /**
     * Note object constructor
     * @param {*} id note id (index)
     * @param {*} name note name
     * @param {*} buffer web audio buffer
     * @param {*} gain web audio gain node
     */
    constructor(id, name, buffer, gain) {
        this.id = id;
        this.name = name;
        this.buffer = buffer;
        this.gain = gain;
    }

    /**
     * plays the note
     * @param {Number} delay delay in seconds
     */
    play(delay) {
        if (!delay) {
            delay = 0;
        }
        // check context suspended?
        console.log(`playing ${this.name} at volume ${this.gain.gain.value}`);
        // need to create buffer source node each play (see docs)
        // below: from baseAudioContext createBufferSource() method
        const source = context.createBufferSource();
        // set buffer of source
        source.buffer = this.buffer;
        // connect
        source.connect(this.gain);

        if (context.state === "suspended") {
            context.resume();
        }

        source.start(context.currentTime + delay);
    }
}

// creating keyboard object
// maybe create keyboard class? (context, load, array, volume)

// keyboard is an array of notes

const context = new AudioContext();
var keyboard = [];
// maybe make this a promise so it can be awaited
export var loaded = false;

loadKeyboard();

export default keyboard;

// ----------- loading functions -----------

async function loadKeyboard() {
    var names = [];
    loadNames(names);
    await loadNotes(names);
    console.log(keyboard);
    loaded = true;
    console.log("successfully loaded keyboard");
}

function loadNames(names) {
    // array of notes
    const notes = [
        "c",
        "cs",
        "d",
        "ds",
        "e",
        "f",
        "fs",
        "g",
        "gs",
        "a",
        "as",
        "b",
    ];
    var add = "";
    for (var i = 0; i <= 8; i++) {
        for (const note of notes) {
            add = i.toString() + note;
            if (i === 0) {
                // note name is a, as, or b (index 9 or later)
                if (notes.includes(note, 9)) {
                    names.push(add);
                }
                //c8
            } else if (i === 8) {
                if (note === "c") {
                    names.push(add);
                }
                //otherwise add
            } else {
                names.push(add);
            }
        }
    }
}

// creating Note objects for each name
async function loadNotes(names) {
    console.log("loading notes");
    for (var i = 0; i < names.length; i++) {
        // decode audio data
        // pass to audio buffer source node
        // connect source node to context destination
        const name = names[i];
        const path = require(`../sounds/piano-88-notes/${name}.wav`);
        try {
            // below: from webaudioapi docs baseAudioContext decodeAudioData() method
            // load file
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${path}`);
            }
            // console.log(response);
            // decode to buffer
            const arrayBuffer = await response.arrayBuffer();
            const buffer = await context.decodeAudioData(arrayBuffer);
            // dont know why this shit works or why you need to require the filepath
            // once again i think because the wav files are in a different
            // directory or something like that

            // creating a gain node, using volumefunction
            const gainNode = context.createGain();
            gainNode.gain.value = volumeFunction(i);
            gainNode.connect(context.destination);
            // create a note object and add it to keyboard
            const note = new Note(i, name, buffer, gainNode);
            keyboard.push(note);
            console.log(`loaded ${name}`);
        } catch (error) {
            console.error(`error loading ${name}:`, error);
        }
    }
}

/**
 * exponential function to determine the volume of each note for balancing
 * higher notes - higher volume to balance the sound
 * @param {int} index - note index on the keyboard which is being calculated
 * @returns volume 0-1
 */
function volumeFunction(index) {
    const a = 5.509;
    const b = 0.0393;
    const c = 14.49;
    //ae^(bx) + c
    var volume = Math.floor(a * Math.exp(b * index) + c) / 100;
    // cap volume
    volume = Math.min(volume, 1);
    return volume;
}

// new audio implementation

// toggles audio context
function toggleAudio() {
    if (context.state === "suspended") {
        context.resume();
    } else {
        context.suspend();
    }
}

// testing using audio context to play sound
export function testPlay() {
    // actually works???
    keyboard[39].play();
    keyboard[43].play();
    keyboard[46].play();
    keyboard[51].play();
}
