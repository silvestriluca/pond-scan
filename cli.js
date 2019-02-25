#!/usr/bin/env node

var readCsvFile = require('./modules/utils').readCsvFile;

//Read the command line arguments
const [,, ...args] = process.argv;



function main(){
  //Reads the csv file
  readCsvFile(args[0], function(err, parsedArray){
    if(err){
      console.error(err);
      return err;
    } else {
      console.log(parsedArray);
    }
  });
}

main();