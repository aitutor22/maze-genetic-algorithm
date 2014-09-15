'use strict';

var _ = require('lodash');

//takes a string of even length comprising bits ('00110010') and converts them into an array of numbers
//two bits are converted into an integer from 0-3
function convertBinaryToMoves(bits) {
  var results = [],
    buffer = '';

  //error checking
  if (typeof bits !== 'string') throw new Error('invalid argument passed in');
  if (bits.length % 2 > 0) throw new Error('bits must have even length');

  for (var i = 0; i < bits.length - 1; i += 2) {
    //converts the 2 length bits into an integer and pushes it into the results array
    results.push(parseInt(bits.substring(i, i + 2), 2));
  };
  return results;
};

//converts 0-3 to binary
function convertMovesToBinary(movesArr) {
  var buffer = [];

  //error checking
  if (!(movesArr instanceof Array)) throw new Error('invalid argument passed in');
  _.each(movesArr, function(move) {
    if (typeof move !== 'number' || move < 0 || move > 3) throw new Error('invalid argument passed in');
  });

  _.each(movesArr, function(move) {
    //when 0 (decimal) is converted to binary, it is usually converted to '0'
    //we want this to be '00', so we have to create a separate condition

    if (move === 0) {
      buffer.push('00');
    } else if (move === 1) {
      buffer.push('01');
    } 
    else {
      buffer.push(move.toString(2));  
    };
  });
  return buffer.join('');
};

module.exports = {
  convertBinaryToMoves: convertBinaryToMoves,
  convertMovesToBinary: convertMovesToBinary
};