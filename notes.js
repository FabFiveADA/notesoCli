const fs = require('fs');
const chalk = require('chalk');
const { lookup } = require('dns');

function addNotes(title, body) {
    const notes = loadNotes();
    var duplicate = 0;
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].title == title) {
            duplicate++;
        }
    }
    if (duplicate > 0) {
        console.log("Duplicate title entered");
    }
    else {
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
    }
}

function saveNote(notes) {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON);
}

function loadNotes() {
    try {
        const noteBuffer = fs.readFileSync('notes.json');
        const notesString = noteBuffer.toString();
        const noteObj = JSON.parse(notesString);
        return noteObj;
    } catch (error) {
        return [];
    }
}


function removeNote(title){
    const notes = loadNotes();

    for(var i = 0; i < notes.length; i++){
        if(notes[i].title === title){
            notes.splice(i,1);
            console.log(chalk.green.bold("Removed note : "+ title));
            break;
        }
        else if(i == notes.length-1){
            console.log(chalk.red.bold("Note with title :\""+ title +"\" does not exists."));
        }
    }

    saveNote(notes);
}

function listNotes(){
    const notes = loadNotes();
    notes.forEach((note)=>{
        console.log(chalk.yellow.bold(note.title));
    });
}


// -----------------------------------Read Notes------------------------------------------------

function readNotes(title){
    const notes = loadNotes();
    notes.some((note,index)=>{
        if(note.title==title){
            console.log(chalk.yellow(note.title));
            console.log(chalk.blue(note.body));
            return true;     
        }
        else if(index == notes.length-1){
            // console.log(index)
            console.log(chalk.red.bold('Title not found'));
        }
    });
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes

}