#!/usr/bin/env node

//Threshold values for alarms
const HIGH_PH = 8.5;
const LOW_PH = 7.8;
const CHANGING_PH = 0.2;
const LOW_DO = 4;
const BORDERLINE_DO = 5;


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
    if(parseFloat(ph) < LOW_PH){
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
    if(parseFloat(ph) > HIGH_PH){
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
    if(parseFloat(doValue) < LOW_DO){
      //low DO
      return true;
    } else {
      //DO is ok
      return false;
    }
  }
}

/**
 * Returns true if the ph change rate is over a given threshold value in the last 2 hours
 *
 * @param {[string | number]} phArray The last 3 hourly measurement of pH, in chronological order
 * @returns {boolean} True if ph is changing too quickly
 */
function changingPh(phArray){
  //Checks that phArray is an array
  if(!Array.isArray(phArray)){
    //Not an array. 
    return false;
  } else {
    //Check if there are enough data to check the changingPh condition (at least 3 measures in the last 2 hours)
    if (phArray.length < 3) {
      //Not enough data
      return false;
    } else {
      //Checks that there are not common strings - like "hello" - in the array.
      for (let i = 0; i < phArray.length; i++) {
        const element = phArray[i];
        if(isNaN(element)){
          return false;
        }
      }
      //Check the changingPh condition
      if(Math.abs(parseFloat(phArray[0])-parseFloat(phArray[1])) >= CHANGING_PH && Math.abs(parseFloat(phArray[1])-parseFloat(phArray[2])) >= CHANGING_PH){
        return true;
      } else {
        return false;
      }
    }
  }
}

/**
 *  Returns true if the DO is under a given threshold value in the last 3 hours
 *
 * @param {[string | number]} doArray The last 4 hourly measurement of DO, in chronological order
 * @returns {boolean} True if DO is consistently low under a certain threshold
 */
function borderlineDo(doArray){
  //Checks that phArray is an array
  if(!Array.isArray(doArray)){
    //Not an array
    return false;
  } else {
    //Check if there are enough data (at least 4 measurements in the last 3 hours)
    if (doArray.length < 4){
      //Not enough data
      return false;
    } else {
      let wentAboveLimit = false; //Initial value
      for (let i = 0; i < 4; i++) {
        const element = parseFloat(doArray[i]);
        //Checks that there are not common strings - like "hello" - in the array.
        if(isNaN(element)){
          return false;
        }
        //Checks if anytime during the [for] cycle the DO level was above the threshold BORDERLINE_DO
        if(!wentAboveLimit){
          if(element < BORDERLINE_DO){
            wentAboveLimit = false;
          } else {
            //DO is above the threshold limit. 
            wentAboveLimit = true;
          }
        }
      }
      //The alarm triggers if all 4 measures are under the threshold BORDERLINE_DO (wentAboveLimit === false)
      if(wentAboveLimit){
        return false;
      } else {
        return true;
      }
    }
  }
}

module.exports.lowPh = lowPh;
module.exports.highPh = highPh;
module.exports.lowDo = lowDo;
module.exports.changingPh = changingPh;
module.exports.borderlineDo = borderlineDo;