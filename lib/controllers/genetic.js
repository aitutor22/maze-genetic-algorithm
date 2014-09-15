'use strict';

var _ = require('lodash'),
  Utility = require('./utility'),
  Genome = require('./genome');

function Genetic() {
  var genomesArr = [];

  return {
    init: function(numOfBits, populationSize, conversion) {
      for (var i = 0; i < numOfBits; i++) {
        genomesArr[i] = new Genome(numOfBits);
      };
    },
    getGenomesArr: function() {
      return genomesArr;
    },
    updateFitnessScore: function() {

    }
  }
};

var genetic = new Genetic();
genetic.init(70, 30);

// var t = convertBinaryToMoves('0001110000000111000010111101100000011001000110111010010100101001101111');
// console.log(t)
// console.log(convertMovesToBinary(t));
module.exports = Genetic;