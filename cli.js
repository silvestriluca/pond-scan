#!/usr/bin/env node

//Import classes and utils
var readCsvFile = require('./modules/utils').readCsvFile;
var ampm = require('./modules/utils').ampm;
var Alarms = require('./classes/alarm');    //Import the Alarms class

//Read the command line arguments
const [,, ...args] = process.argv;


/**
 *Executes at startup
 *
 */
function main(){
  //Checks if arguments have been supplied
  if(!args[0]){
    console.log('Please specify a .csv file');
  } else {
    //Reads the csv file
    readCsvFile(args[0], function(err, parsedArray){
      if(err){
        console.error(err);
        return err;
      } else {
        //Instantiate the Alarms class
        var alarms = new Alarms(parsedArray);
        //Scans all the 24 hours for alarms
        for (let i = 0; i < 24; i++) {
          if(alarms.ringsLowPh(i)){
            console.log(ampm(i) + ': ALERT low-pH');
          }
          if(alarms.ringsHighPh(i)){
            console.log(ampm(i) + ': ALERT high-pH');
          }
          if(alarms.ringsLowDo(i)){
            console.log(ampm(i) + ': ALERT low-DO');
          }
          if(alarms.ringsChangingPh(i)){
            console.log(ampm(i) + ': ALERT changing-pH');
          }
          if(alarms.ringsBorderlineDo(i)){
            console.log(ampm(i) + ': ALERT borderline-DO');
          }                       
        }
      }
    });
  }
}

//Begins execution
main();