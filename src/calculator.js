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
    return stringWithNumbers.split(',').map(this._stringToNumber);
  },

  _addNumbers: function(numbers) {
    return numbers.reduce(function(summedNumbers, number) {
      return summedNumbers + number;
    }, 0);
  }
};

module.exports = StringCalculator;
