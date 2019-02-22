#!/usr/bin/env node

var parse = require('csv-parse');
const fs = require('fs');

//Read the command line arguments
const [,, ...args] = process.argv;

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
 *Returns true if the ph is under a given threshold value
 *
 * @param {string | number} ph Ph value
 * @returns {boolean} True if ph is low
 */
function lowPh(ph){
  //Check if ph is a number or a string representing number
  if(isNaN(ph)){
    //Not a number/stringified number. Return false (no alarm)
    return false;
  } else {
    //Check threshold value
    if(parseFloat(ph) < 7.8){
      //low Ph
      return true;
    } else {
      //Ph is ok
      return false;
    }
  }
}

/**
 *Returns true if the ph is above a given threshold value
 *
 * @param {string | number} ph Ph value
 * @returns {boolean} True if ph is high
 */
function highPh(ph){
  //Check if ph is a number or a string representing number
  if(isNaN(ph)){
    //Not a number/stringified number. Return false (no alarm)
    return false;
  } else {
    //Check threshold value
    if(parseFloat(ph) > 8.5){
      //low Ph
      return true;
    } else {
      //Ph is ok
      return false;
    }
  }
}

/**
 *Returns true if the DO is under a given threshold value
 *
 * @param {string | number} doValue DO value
 * @returns {boolean} True if DO is low
 */
function lowDo(doValue){
  //Check if doValue is a number or a string representing number
  if(isNaN(doValue)){
    //Not a number/stringified number. Return false (no alarm)
    return false;
  } else {
    //Check threshold value
    if(parseFloat(doValue) < 4){
      //low DO
      return true;
    } else {
      //DO is ok
      return false;
    }
  }
}

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

module.exports.ampm = ampm;
module.exports.lowPh = lowPh;
module.exports.highPh = highPh;
module.exports.lowDo = lowDo;