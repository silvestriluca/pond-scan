#!/usr/bin/env node

var parse = require('csv-parse');
const fs = require('fs');

/**
 *Converts 24h to AMPM notation
 *
 * @param {string | number} hour24 The hour in 24h format
 * @returns {string | boolean}  A string of the hour in am/pm format or false is hour24 is not a valid hour
 */
function ampm(hour24){
  if (isNaN(hour24)){
    return false;
  } else {
    var hour = parseFloat(hour24);
    if (hour >= 0 && hour < 1){
      return '12am';
    } else if (hour >= 1 && hour < 12 ) {
      return Math.floor(hour).toString() + 'am';
    } else if (hour >= 12 && hour < 13){
      return '12pm';
    } else if (hour >= 13 && hour < 24){
      return (Math.floor(hour)-12).toString() + 'pm';
    } else {
      return false;
    }
  }
}

/**
 *Read a CSV file
 *
 * @param {string} path The path of csv file
 * @param {function(Error, [[string]])} cb Callback(err, data)
 */
function readCsvFile(path, cb){
  //Reads the csv file
  fs.readFile(path, 'utf8', function(err, data){
    if(err){
      let readFileError = new Error('Error on reading file: ' + err.message);
      readFileError.returnedError = err;
      readFileError.code = err.code;
      if(err.code === 'ENOENT') {
        //console.error('File not found!');
        readFileError.message = 'File not found!';        
      } else {
        //console.error(err);
      }
      return cb(readFileError, null);
    } else {
      //Parse the csv starting from line 2 to avoid headers
      parse(data,{from_line: 2},function(err,parsedArray){
        if(err){
          //console.error('Not a valid csv');
          let invalidCsv = new Error('Not a valid csv: ' + err.message);
          invalidCsv.returnedError = err;
          return cb(invalidCsv, null);
        } else {
          if(parsedArray.length === 0){
            //console.error('Not a valid csv');
            let errorLength = new Error('Not a valid csv: [] length === 0');
            return cb(errorLength, null);
          } else {
            return cb(null, parsedArray);
          }
        }
      });
    }
  });
}

//Exporting statements
module.exports.ampm = ampm;
module.exports.readCsvFile = readCsvFile;