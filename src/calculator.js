'use strict';

function StringCalculator() {
}

StringCalculator.prototype = {
  add: function (stringWithNumbers) {
    if (!this._isEmpty(stringWithNumbers)) return 0;

    var numbers = this._getNumbers(stringWithNumbers);
    return this._addNumbers(numbers);
  },

  _stringToNumber: function (stringWithNumber) {
    var number = parseInt(stringWithNumber, 10);
    if (number < 0) {
      throw new StringCalculator.NegativeNumberError();
    }
    return number;
  },

  _isEmpty: function (stringWithNumbers) {
    return Boolean(stringWithNumbers);
  },

  _getNumbers: function (stringDataSet) {
    var stringProcessor = new StringProcessor(stringDataSet);
    return stringProcessor.getData().map(this._stringToNumber);
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
  getData: function() {
    return this._stringWithoutStarterDelimiter().split(this._getDelimiter());
  },
  _hasDelimiter: function() {
    return this.stringWithNumbers[0] === '/';
  },
  _getDelimiter: function() {
    var regString = '[\,\n\\' + this.stringWithNumbers[2] + ']';
    if (this._hasDelimiter()) return new RegExp(regString);
    return /[,\n]/;
  },
  _stringWithoutStarterDelimiter: function() {
    if (this._hasDelimiter())return this.stringWithNumbers.slice(4);
    return this.stringWithNumbers;
  }

};


StringCalculator.NegativeNumberError = function() {};
StringCalculator.NegativeNumberError.prototype = new Error();

StringCalculator.create = function() {
  return new StringCalculator();
};

module.exports = StringCalculator;
