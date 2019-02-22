var ampm = require('../cli').ampm;
var lowPh = require('../cli').lowPh;
var highPh = require('../cli').highPh;
var lowDo = require('../cli').lowDo;
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
    assert.equal(lowPh(7.8), false, "Error with ph=7.8");
    assert.equal(lowPh('2'), true, 'Error with ph="2"');
    assert.equal(lowPh('hello'), false, "Error with string hello");
  });
});

describe('Testing high-ph alarm', function(){
  it('Tries several ph', function(){
    assert.equal(highPh(2), false, 'Error with ph=2');
    assert.equal(highPh(9), true, 'Error with ph=9');
    assert.equal(highPh(6.5), false, 'Error with ph=6.5');
    assert.equal(highPh(8.6), true, 'Error with ph=8.6');
    assert.equal(highPh(8.5), false, "Error with ph=8.5");
    assert.equal(highPh('2'), false, 'Error with ph="2"');
    assert.equal(highPh('hello'), false, "Error with string hello");
  });
});

describe('Testing low-do alarm', function(){
  it('Tries several DOs', function(){
    assert.equal(lowDo(2), true, 'Error with DO=2');
    assert.equal(lowDo(9), false, 'Error with DO=9');
    assert.equal(lowDo(6.5), false, 'Error with DO=6.5');
    assert.equal(lowDo(4), false, 'Error with DO=4');
    assert.equal(lowDo(3.9), true, "Error with DO=3.9");
    assert.equal(lowDo('2'), true, 'Error with DO="2"');
    assert.equal(lowDo('hello'), false, "Error with string hello");
  });
});