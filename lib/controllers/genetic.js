'use strict';

var _ = require('lodash'),
  Utility = require('./utility'),
  Genome = require('./genome'),
  Maze = require('./Maze');

function Genetic() {
  var genomesArr = [],
    maze,
    utility,
    totalFitnessScore,
    POPSIZE,
    CROSSOVERRATE,
    MUTATIONRATE;

  return {
    init: function(numOfBits, populationSize, crossoverRate, mutationRate, mazeArg, conversionUtility) {
      //initializes the first generation of geneomes and calculates their fitness scores
      for (var i = 0; i < populationSize; i++) {
        genomesArr[i] = new Genome(numOfBits);
      };
      maze = mazeArg;
      utility = conversionUtility;
      POPSIZE = populationSize;
      CROSSOVERRATE = crossoverRate;
      MUTATIONRATE = mutationRate;

      this.updateFitnessScore();
    },
    getGenomesArr: function() {
      return genomesArr;
    },
    updateFitnessScore: function() {
      var moveArrForGenome = [],
        distanceFromExit;

      //resets totalFitnessScore and recaclautes
      totalFitnessScore = 0;

      //KIV - currently tightly coupled; refactor in future
      _.each(genomesArr, function(genome) {
        //converts geonme's bits to series of moves to be fed to maze
        //gets results and updates genome's fitnessScore
        moveArrForGenome = utility.convertBinaryToInteger(genome.bits);
        maze.makeSeriesOfMoves(moveArrForGenome, true);
        distanceFromExit = maze.getDistanceFromExitPos();
        genome.updateFitnessScore(1 / (distanceFromExit + 1));
        totalFitnessScore += genome.fitnessScore;
      });
    },
    rouletteWheelSelection: function() {
      var total = 0,
        threshold = totalFitnessScore * Math.random();

      for (var i = 0; i < genomesArr.length; i++) {
        total += genomesArr[i].fitnessScore;

        if (total >= threshold) break;
      };

      return genomesArr[i];
    },

    crossover: function(p1, p2) {

    },
    epoch: function() {
      var newPop = [],
        newPopCount = 0,
        childA,
        childB;

      while (newPopCount < POPSIZE) {
        mom = this.rouletteWheelSelection();
        dad = this.rouletteWheelSelection();

        this.crossover(mom, dad);
        newPopCount += 2;
      };

    }
  }
};

var genetic = new Genetic(),
  maze = Maze(),
  utility = Utility(3);

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

genetic.init(70, 30, 0.7, 0.01, maze, utility);
genetic.getGenomesArr();
console.log(genetic.rouletteWheelSelection())
// genetic.updateFitnessScore();

// var t = convertBinaryToMoves('0001110000000111000010111101100000011001000110111010010100101001101111');
// console.log(t)
// console.log(convertMovesToBinary(t));
module.exports = Genetic;