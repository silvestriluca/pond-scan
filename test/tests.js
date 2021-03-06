/* eslint-env node, mocha */
/* eslint quotes: ["error", "single"]*/
var ampm = require('../modules/utils').ampm;
var readCsvFile = require('../modules/utils').readCsvFile;
var lowPh = require('../modules/alarm-definitions').lowPh;
var highPh = require('../modules/alarm-definitions').highPh;
var lowDo = require('../modules/alarm-definitions').lowDo;
var changingPh = require('../modules/alarm-definitions').changingPh;
var borderlineDo = require('../modules/alarm-definitions').borderlineDo;
var Alarms = require('../classes/alarm');
var assert = require('assert');

describe('Testing AMPM function', function(){
  it('Tries several inputs', function(){
    assert.equal(ampm('1'), '1am','Error test 1');
    assert.equal(ampm(1), '1am','Error test 1');
    assert.equal(ampm('12'), '12pm', 'Error test 12');
    assert.equal(ampm(12), '12pm', 'Error test 12');
    assert.equal(ampm('13'), '1pm', 'Error test 13');
    assert.equal(ampm(13), '1pm', 'Error test 13');
    assert.equal(ampm('17'), '5pm', 'Error test 17');
    assert.equal(ampm(17), '5pm', 'Error test 17');
    assert.equal(ampm('23.15'), '11pm', 'Error test 23.15');
    assert.equal(ampm(23.15), '11pm', 'Error test 23.15');
    assert.equal(ampm('0'), '12am', 'Error test 0');
    assert.equal(ampm(0), '12am', 'Error test 0');
    assert.equal(ampm('0.15'), '12am', 'Error test 0.15');
    assert.equal(ampm(0.15), '12am', 'Error test 0.15');
    assert.equal(ampm('25'), false, 'Error test 25');
    assert.equal(ampm(25), false, 'Error test 25');
    assert.equal(ampm('hello'), false, 'Error test "hello"');
  });
});

describe('Testing low-ph alarm', function(){
  it('Tries several ph', function(){
    assert.equal(lowPh(2), true, 'Error with ph=2');
    assert.equal(lowPh(9), false, 'Error with ph=9');
    assert.equal(lowPh(6.5), true, 'Error with ph=6.5');
    assert.equal(lowPh(7.9), false, 'Error with ph=7.9');
    assert.equal(lowPh(7.8), false, 'Error with ph=7.8');
    assert.equal(lowPh('2'), true, 'Error with ph="2"');
    assert.equal(lowPh('hello'), false, 'Error with string hello');
  });
});

describe('Testing high-ph alarm', function(){
  it('Tries several ph', function(){
    assert.equal(highPh(2), false, 'Error with ph=2');
    assert.equal(highPh(9), true, 'Error with ph=9');
    assert.equal(highPh(6.5), false, 'Error with ph=6.5');
    assert.equal(highPh(8.6), true, 'Error with ph=8.6');
    assert.equal(highPh(8.5), false, 'Error with ph=8.5');
    assert.equal(highPh('2'), false, 'Error with ph="2"');
    assert.equal(highPh('hello'), false, 'Error with string hello');
  });
});

describe('Testing low-do alarm', function(){
  it('Tries several DOs', function(){
    assert.equal(lowDo(2), true, 'Error with DO=2');
    assert.equal(lowDo(9), false, 'Error with DO=9');
    assert.equal(lowDo(6.5), false, 'Error with DO=6.5');
    assert.equal(lowDo(4), false, 'Error with DO=4');
    assert.equal(lowDo(3.9), true, 'Error with DO=3.9');
    assert.equal(lowDo('2'), true, 'Error with DO="2"');
    assert.equal(lowDo('hello'), false, 'Error with string hello');
  });
});

describe('Testing with changing-ph alarm', function(){
  it('Tries several scenarios', function(){
    assert.equal(changingPh([4,3,2]), true, 'Error scenario 1');
    assert.equal(changingPh([4,3.9,3.8]), false, 'Error scenario 2');
    assert.equal(changingPh([4,3.9,3.2]), false, 'Error scenario 3');
    assert.equal(changingPh([4,4.5,4]), true, 'Error scenario 4');
    assert.equal(changingPh([4,4.2,4]), true, 'Error scenario 5');
    assert.equal(changingPh([4,4.1,4.3]), false, 'Error scenario 6');
    assert.equal(changingPh([4,4.2,4.4]), true, 'Error scenario 7');
    assert.equal(changingPh([4,3]), false, 'Error scenario 8');
    assert.equal(changingPh(['4','3','2']), true, 'Error scenario 9');
    assert.equal(changingPh(['4','3.9',3.8]), false, 'Error scenario 10');
    assert.equal(changingPh(['4','3.9','3.2']), false, 'Error scenario 11');
    assert.equal(changingPh(['4','4.5','4']), true, 'Error scenario 12');
    assert.equal(changingPh(['4','4.2','4']), true, 'Error scenario 13');
    assert.equal(changingPh([4,'4.1','4.3']), false, 'Error scenario 14');
    assert.equal(changingPh([4,4.2,'4.4']), true, 'Error scenario 15');
    assert.equal(changingPh(['4','3']), false, 'Error scenario 16');
    assert.equal(changingPh(['hello', 'bye', 'here']), false, 'Error scenario 17');
    assert.equal(changingPh(4), false, 'Error scenario 18');
  });
});

describe('Testing the borderlineDo alarm', function(){
  it('Tries several scenarios', function(){
    assert.equal(borderlineDo([2,3,4,3]), true, 'Error scenario 1');
    assert.equal(borderlineDo([2,3,5,3]), false, 'Error scenario 2');
    assert.equal(borderlineDo([6,3,4,3]), false, 'Error scenario 3');
    assert.equal(borderlineDo([2,3,4,3,6]), true, 'Error scenario 4');
    assert.equal(borderlineDo([2,3]), false, 'Error scenario 5');
    assert.equal(borderlineDo([2,'3',4,3]), true, 'Error scenario 6');
    assert.equal(borderlineDo(['hello', 'bye', 'here', 'sure']), false, 'Error scenario 7');
    assert.equal(borderlineDo(5), false, 'Error scenario 8');
  });
});

describe('Testing ReadCsvFile utility', function(){
  describe('Tries to read several files', function(){
    this.timeout(20000);
    it('Good file', function(done){
      readCsvFile('./test/test_data.csv', function(err, data){
        if(err){
          done(err);
        } else {
          assert.equal(Array.isArray(data), true, 'Not an array');
          assert.equal(data.length > 0, true, 'Array of zero length');
          done();
        }
      });
    });

    it('File not found', function(done){
      readCsvFile('./test/not_exist', function(err, data){
        assert.equal(err.code, 'ENOENT', 'Wrong error');
        assert.equal(err.message, 'File not found!', 'Wrong message');
        assert.equal(data, null, 'Data is not null');
        done();
      });
    });

    it('Not a CSV, length 0', function(done){
      readCsvFile('./test/empty.csv', function(err, data){
        assert.equal(err.message, 'Not a valid csv: [] length === 0', 'Wrong message');
        assert.equal(data, null, 'Data is not null');
        done();
      });
    });

    it('Not a CSV', function(done){
      readCsvFile('./package.json', function(err, data){
        assert.notEqual(err,null, 'Error is null');
        assert.equal(err.message, 'Not a valid csv: Invalid opening quote at line 2', 'Wrong message');
        assert.equal(data, null, 'Data is not null');
        done();
      });
    });    
  });
});

describe('Tests Alarms class', function(){
  let testData = [];
  before('Preparing test data', function(done){
    this.timeout(20000);
    readCsvFile('./test/test_data.csv', function(err,data){
      if(err){done(err);} else {
        testData = data;
        //console.log(testData);
        done();
      }
    });
  });
  
  it('Test alarm Alarms.ringsLowPh', function(){
    let alarms = new Alarms(testData);
    assert.equal(alarms.ringsLowPh(1), false, 'Alarm triggered @1am');
    assert.equal(alarms.ringsLowPh(3), true, 'Alarm not triggered @ 3am');
    assert.throws(() => {alarms.ringsLowPh(26);}, 'Does not trigger error @26');
  });

  it('Test alarm Alarms.ringsHighPh', function(){
    let alarms = new Alarms(testData);
    assert.equal(alarms.ringsHighPh(1), false, 'Alarm triggered @1am');
    assert.equal(alarms.ringsHighPh(16), true, 'Alarm not triggered @ 16');
    assert.throws(() => {alarms.ringsHighPh(26);}, 'Does not trigger error @26');
  });

  it('Test alarm Alarms.ringsLowDo', function(){
    let alarms = new Alarms(testData);
    assert.equal(alarms.ringsLowDo(1), false, 'Alarm triggered @1am');
    assert.equal(alarms.ringsLowDo(21), true, 'Alarm not triggered @ 21');
    assert.throws(() => {alarms.ringsLowDo(26);}, 'Does not trigger error @26');
  });

  it('Test alarm Alarms.ringsChangingPh', function(){
    let alarms = new Alarms(testData);
    assert.equal(alarms.ringsChangingPh(4), false, 'Alarm triggered @4am');
    assert.equal(alarms.ringsChangingPh(14), true, 'Alarm not triggered @ 14am');
    assert.throws(() => {alarms.ringsChangingPh(26);}, 'Does not trigger error @26');
    assert.equal(alarms.ringsChangingPh(1), false, 'Alarm triggered @1am');
    assert.equal(alarms.ringsChangingPh(0), false, 'Alarm triggered @0am');
  });

  it('Test alarm Alarms.ringsBorderlineDo', function(){
    let alarms = new Alarms(testData);
    assert.equal(alarms.ringsBorderlineDo(3), true, 'Alarm not triggered @3am');
    assert.equal(alarms.ringsBorderlineDo(14), false, 'Alarm triggered @ 14');
    assert.throws(() => {alarms.ringsBorderlineDo(26);}, 'Does not trigger error @26');
    assert.equal(alarms.ringsBorderlineDo(1), false, 'Alarm triggered @1am');
    assert.equal(alarms.ringsBorderlineDo(0), false, 'Alarm triggered @0am');
  });

});