#!/usr/bin/env node

var lowPh = require('../modules/alarm-definitions').lowPh;
var highPh = require('../modules/alarm-definitions').highPh;
var lowDo = require('../modules/alarm-definitions').lowDo;
var changingPh = require('../modules/alarm-definitions').changingPh;
var borderlineDo = require('../modules/alarm-definitions').borderlineDo;

/**
 *Evaluates alarms
 *
 * @class Alarms
 */
class Alarms {
  /**
   *Creates an instance of Alarms.
   * @param {[[String]]} parsedCsv The CSV with daily datas
   * @memberof Alarms
   */
  constructor(parsedCsv){
    this.dataMatrix = parsedCsv;
  }

  /**
   *Check the lowPH condition at a given hour
   *
   * @param {number} hour24 The hours when the alarm is checked
   * @returns {boolean} True if the alarm rings
   * @memberof Alarms
   */
  ringsLowPh(hour24){
    //Tests if an out of range parameter has been submitted
    if(hour24 < 0 || hour24 > 23){
      let err = new Error('Wrong parameter (hour24 has to be between 0 and 23)');
      err.code = 'ERRPARAM';
      throw err;
    } else {
      return lowPh(this.dataMatrix[hour24][2]);
    }
  }

  /**
   *Check the highPh condition at a given hour
   *
   * @param {number} hour24 The hours when the alarm is checked
   * @returns {boolean} True if the alarm rings
   * @memberof Alarms
   */
  ringsHighPh(hour24){
    //Tests if an out of range parameter has been submitted
    if(hour24 < 0 || hour24 > 23){
      let err = new Error('Wrong parameter (hour24 has to be between 0 and 23)');
      err.code = 'ERRPARAM';
      throw err;
    } else {
      return highPh(this.dataMatrix[hour24][2]);
    }
  }

  /**
   *Check the lowDO condition at a given hour
   *
   * @param {number} hour24 The hours when the alarm is checked
   * @returns {boolean} True if the alarm rings
   * @memberof Alarms
   */
  ringsLowDo(hour24){
    //Tests if an out of range parameter has been submitted
    if(hour24 < 0 || hour24 > 23){
      let err = new Error('Wrong parameter (hour24 has to be between 0 and 23)');
      err.code = 'ERRPARAM';
      throw err;
    } else {
      return lowDo(this.dataMatrix[hour24][1]);
    }
  }

  /**
   *Check the changingPH condition at a given hour
   *
   * @param {number} hour24 The hours when the alarm is checked
   * @returns {boolean} True if the alarm rings
   * @memberof Alarms
   */
  ringsChangingPh(hour24){
    //Tests if an out of range parameter has been submitted
    if(hour24 < 0 || hour24 > 23){
      let err = new Error('Wrong parameter (hour24 has to be between 0 and 23)');
      err.code = 'ERRPARAM';
      throw err;
    } else {
      //Builds up the measurement needed for changingPh alarm status evaluation
      let measurementArray = [];
      for (let i = 0; i < 3; i++) {
        //Avoids to get non-existent data
        if(hour24 - i >= 0){
          measurementArray.push(this.dataMatrix[hour24-i][2]);
        }        
      }
      console.log(measurementArray);
      return changingPh(measurementArray);
    }
  }

  /**
   *Check the borderlineDO condition at a given hour
   *
   * @param {number} hour24 The hours when the alarm is checked
   * @returns {boolean} True if the alarm rings
   * @memberof Alarms
   */
  ringsBorderlineDo(hour24){
    //Tests if an out of range parameter has been submitted
    if(hour24 < 0 || hour24 > 23){
      let err = new Error('Wrong parameter (hour24 has to be between 0 and 23)');
      err.code = 'ERRPARAM';
      throw err;
    } else {
      //Builds up the measurement needed for changingPh alarm status evaluation
      let measurementArray = [];
      for (let i = 0; i < 4; i++) {
        //Avoids to get non-existent data
        if(hour24 - i >= 0){
          measurementArray.push(this.dataMatrix[hour24-i][1]);
        }        
      }
      console.log(measurementArray);
      return borderlineDo(measurementArray);
    }
  }
}

module.exports = Alarms;