const yargs = require('yargs');
const { removeNote, listNotes, readNotes } = require('./notes');
const notes = require('./notes')

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.addNotes(argv.title,argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing note',
    builder: {
        title:{
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler: function(){
        listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a specific note.',
    builder:{
        title:{
            describe: "Note Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
       readNotes(argv.title);
    }
})

yargs.argv;