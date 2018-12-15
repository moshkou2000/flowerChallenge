"use strict"
const readline = require('readline');

const index = require('./index')


exports.ReadFile = function() {

    var rl = readline.createInterface({
        input: process.stdin,
        output:process.stdout,
        terminal: false
    });


    rl.on('line', function(line) {

        index.myCallback(null,line);

    })
    rl.on('error', function(error){
        index.myCallback(error)
    })

}
