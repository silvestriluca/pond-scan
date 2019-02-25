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

  ringsLowPh(hour24){

  }
}

module.exports = Alarms;