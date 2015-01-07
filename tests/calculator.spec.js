'use strict';

var expect = require('chai').expect;
var StringCalculator = require('../src/calculator');

describe('calculator', function() {
  var stringCalculator;

  beforeEach(function() {
    stringCalculator = StringCalculator.create();
  });

  it('should give back 0 if the parameter is an empty string', function() {
    expect(stringCalculator.add('')).to.equal(0);
  });

  it('should give back the number if string contains only one number', function() {
    expect(stringCalculator.add('1')).to.equal(1);
  });

  it('should give back the addition of two numbers if string contains two number separated by a comma', function() {
    expect(stringCalculator.add('1,2')).to.equal(3);
    expect(stringCalculator.add('2,1')).to.equal(3);
    expect(stringCalculator.add('0,1')).to.equal(1);
  });

  it('should give back the addition of any numbers if string contains numbers separated by commas', function () {
    expect(stringCalculator.add('1,2,3')).to.equal(6);
    expect(stringCalculator.add('1,2,3,5')).to.equal(11);
    expect(stringCalculator.add('5,3,2,1')).to.equal(11);
  });

  it('should give back the addition of the given numbers if the separator is new line', function() {
    expect(stringCalculator.add("1\n2")).to.equal(3);
    expect(stringCalculator.add("1\n2\n3")).to.equal(6);
  });

  it('should support different delimiter given in the first line optionally', function() {
    expect(stringCalculator.add('//;\n1;2;3')).to.equal(6);
    expect(stringCalculator.add('//;\n1;2,3\n4')).to.equal(10);
  });

  it('should throw an exception if there is a negative number', function() {

    expect(function() {
      stringCalculator.add('1,2,-3');
    }).to.throw(StringCalculator.NegativeNumberError);
  });



});



