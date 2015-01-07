'use strict';

function StringCalculator() {
}

StringCalculator.prototype = {
  add: function (stringWithNumbers) {
    if (!this._hasNumber(stringWithNumbers)) return 0;

    var numbers = this._getNumbers(stringWithNumbers);
    return this._addNumbers(numbers);
  },

  _stringToNumber: function (numbers) {
    return parseInt(numbers, 10);
  },

  _hasNumber: function (stringWithNumbers) {
    return Boolean(stringWithNumbers);
  },

  _getNumbers: function (stringWithNumbers) {
    var stringProcessor = new StringProcessor(stringWithNumbers);
    var delimiter = stringProcessor.getDelimiter();
    return stringProcessor.stringWithoutStarterDelimiter().split(delimiter).map(this._stringToNumber);
  },

  _addNumbers: function(numbers) {
    return numbers.reduce(function(summedNumbers, number) {
      return summedNumbers + number;
    }, 0);
  }
};

function StringProcessor(stringWithNumbers) {
  this.stringWithNumbers = stringWithNumbers;
}

StringProcessor.prototype = {
  hasDelimiter: function() {
    return this.stringWithNumbers[0] === '/';
  },
  getDelimiter: function() {
    var regString = '[\,\n\\' + this.stringWithNumbers[2] + ']';
    if (this.hasDelimiter()) return new RegExp(regString);
    return /[,\n]/;
  },
  stringWithoutStarterDelimiter: function() {
    if (this.hasDelimiter())return this.stringWithNumbers.slice(4);
    return this.stringWithNumbers;
  }
};

module.exports = StringCalculator;
