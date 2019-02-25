#!/usr/bin/env node

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

module.exports.ampm = ampm;