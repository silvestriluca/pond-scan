#!/usr/bin/env node

var parse = require('csv-parse');
const fs = require('fs');

//Read the command line arguments
const [,, ...args] = process.argv;



function main(){
  //Reads the csv file
  fs.readFile(args[0], 'utf8', function(err, data){
    if(err){
      if(err.code === 'ENOENT') {
        console.error('File not found!');
      } else {
        console.error(err);
      }
    } else {
      //Parse the csv starting from line 2 to avoid headers
      parse(data,{from_line: 2},function(err,parsedArray){
        if(err){
          console.error('Not a valid csv');
        } else {
          if(parsedArray.length === 0){
            console.error('Not a valid csv');
          } else {
            console.log(parsedArray);
          }
        }
      });
    }
  });
}

//main();