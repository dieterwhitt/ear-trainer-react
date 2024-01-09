//dieter whittingham
//jan 8 2023
//sound player

const notes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];
//const bottom_notes = notes.slice(8);
let keyboard = [];
for(let i = 0; i <= 8; i++){
    for(const key of notes){
        let add = key + (i.toString());
        //a0, a#0, b0
        if(i == 0){
            if(notes.includes(key,9)){
                keyboard.push(add)
            }
        //c8
        }else if (i == 8){
            if (key == 'c'){
                keyboard.push(add)
            }
        //otherwise add
        }else if (i > 0 && i < 8){
            keyboard.push(add)
        }
    }
}

console.log(keyboard);