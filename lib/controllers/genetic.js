'use strict';

var _ = require('lodash'),
  Utility = require('./utility'),
  Genome = require('./genome'),
  Maze = require('./Maze');

function Genetic() {
  var genomesArr = [],
    maze;

  return {
    init: function(numOfBits, populationSize, mazeArg) {
      for (var i = 0; i < numOfBits; i++) {
        genomesArr[i] = new Genome(numOfBits);
      };
      maze = mazeArg;
    },
    getGenomesArr: function() {
      return genomesArr;
    },
    updateFitnessScore: function() {
      var moveArrForGenome = [];
      _.each(genomesArr, function(genome) {
        //currently tightly coupled; refactor in future
        moveArrForGenome = Utility.convertBinaryToMoves(genome.bits);
        maze.makeSeriesOfMoves(moveArrForGenome, true);
        console.log(maze.getDistanceFromExitPos());
      });
    }
  }
};

var genetic = new Genetic(),
  maze = Maze();

maze.init([
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [8, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5],
  [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]);

genetic.init(70, 30, maze);
// genetic.updateFitnessScore();

// var t = convertBinaryToMoves('0001110000000111000010111101100000011001000110111010010100101001101111');
// console.log(t)
// console.log(convertMovesToBinary(t));
module.exports = Genetic;