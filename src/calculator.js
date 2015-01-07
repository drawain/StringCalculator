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
    if (stringProcessor.hasDelimiter()) {
      stringWithNumbers = stringProcessor.stringWithoutDelimiter();
    }
    var delimiter = stringProcessor.getDelimiter();
    return stringWithNumbers.split(delimiter).map(this._stringToNumber);
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
    console.log(regString);
    if (this.hasDelimiter()) return new RegExp(regString);
    return /[,\n]/;
  },
  stringWithoutDelimiter: function() {
    return this.stringWithNumbers.slice(4);
  }
};

module.exports = StringCalculator;
