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
     * @param {*} context the audio context the note belongs to
     */
    constructor(id, name, buffer, gain, context) {
        this.id = id;
        this.name = name;
        this.buffer = buffer;
        this.gain = gain;
        this.context = context;
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
        const source = this.context.createBufferSource();
        // set buffer of source
        source.buffer = this.buffer;
        // connect
        source.connect(this.gain);

        if (this.context.state === "suspended") {
            this.context.resume();
        }

        source.start(this.context.currentTime + delay);
    }
}

// creating keyboard object
// maybe create keyboard class? (context, loadpct, array, volume)
class Keyboard {
    constructor(volumeFunction) {
        this.context = new AudioContext();
        // starting at 0% loaded
        this.loadpct = 0;
        this.loaded = false;
        this.notes = [];
        this.loadKeyboard();
    }

    async loadKeyboard() {
        var names = [];
        this.loadNames(names);
        await this.loadNotes(names);
        this.loaded = true;
        console.log(this);
        console.log("successfully loaded keyboard");
    }

    loadNames(names) {
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
    async loadNotes(names) {
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
                const buffer = await this.context.decodeAudioData(arrayBuffer);
                // dont know why this shit works or why you need to require the filepath
                // once again i think because the wav files are in a different
                // directory or something like that

                // creating a gain node, using volumefunction
                const gainNode = this.context.createGain();
                gainNode.gain.value = volumeFunction(i);
                gainNode.connect(this.context.destination);
                // create a note object and add it to keyboard
                const note = new Note(i, name, buffer, gainNode, this.context);
                this.notes.push(note);
                console.log(`loaded ${name}`);
                // current index + 1 / 88
                this.loadpct = Math.floor((100 * (i + 1)) / names.length);
            } catch (error) {
                console.error(`error loading ${name}:`, error);
            }
        }
    }
}

// now load keyboard to be exported
var keyboard = new Keyboard(volumeFunction);
export default keyboard;

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
/*
// toggles audio context
function toggleAudio() {
    if (context.state === "suspended") {
        context.resume();
    } else {
        context.suspend();
    }
}
*/
