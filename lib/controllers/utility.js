'use strict';

var _ = require('lodash');

function Utility(maxNum) {
  //error checking
  if (typeof maxNum === 'undefined') throw new Error('Missing argument');
  
  //number of bits required to represent maxNum
  var numDigits = maxNum === 0 ? 1 : Math.floor(Math.log(maxNum) / Math.log(2)) + 1,
    max = maxNum;

  return {
    convertBinaryToInteger: function(bits) {
      var results = [],
        buffer = '';

      //error checking
      if (typeof bits !== 'string') throw new Error('invalid argument passed in');
      if (bits.length % numDigits > 0) throw new Error('bits have incorrect length');

      for (var i = 0; i < bits.length - numDigits + 1; i += numDigits) {
        //converts the 2 length bits into an integer and pushes it into the results array
        results.push(parseInt(bits.substring(i, i + numDigits), 2));
      };
      return results;
    },
    convertIntegerToBinary: function(movesArr) {
      var results = [],
        converted;

      //error checking
      if (!(movesArr instanceof Array)) throw new Error('invalid argument passed in');
      _.each(movesArr, function(move) {
        if (typeof move !== 'number' || move < 0 || move > max) throw new Error('invalid argument passed in');
      });

      //for each integer, we want to calculate what is the representation in binary form and add trailing os
      _.each(movesArr, function(move) {
        converted = move.toString(2);
        for (var i = 0, len = numDigits - converted.length; i < len; i++) {
          results.push('0');
        };
        results.push(converted);

      });
      return results.join('');
    }
  };
};

module.exports = Utility;