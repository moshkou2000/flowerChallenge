const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stream = require('stream');    

const index = require('./index')


if (process.argv.length <= 2 ){
    console.log(new Error('no file provided'))
    return process.exit(9)
}


fileUri = path.join(__dirname, process.argv[2])

exports.ReadFile = function() {

  
//fileUri = path.join(__dirname, './sample/input.txt')

const instream = fs.createReadStream(fileUri);

var rl = readline.createInterface({
    input: instream,
    terminal: false
});


rl.on('line', function(line) {

    index.myCallback(null,line);

})
rl.on('error', function(error){
    index.myCallback(error)
})



}

