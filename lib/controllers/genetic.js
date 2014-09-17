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
    //best scores for a particular population
    bestSolutionIndex,
    bestSolutionScore,

    //best lifetime solution
    bestEverSolutionScore,
    bestEverSolutionGenome,
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

      bestEverSolutionScore = Number.NEGATIVE_INFINITY;
      bestEverSolutionGenome = null,

      this.updateFitnessScore();
    },
    getGenomesArr: function() {
      return genomesArr;
    },
    updateFitnessScore: function() {
      var moveArrForGenome = [],
        distanceFromExit;

      //resets totalFitnessScore and recalculates
      totalFitnessScore = 0;
      bestSolutionIndex = -1,
      bestSolutionScore = Number.NEGATIVE_INFINITY,      

      //KIV - currently tightly coupled; refactor in future
      _.each(genomesArr, function(genome, index) {
        //converts geonme's bits to series of moves to be fed to maze
        //gets results and updates genome's fitnessScore
        moveArrForGenome = utility.convertBinaryToInteger(genome.bits);
        maze.makeSeriesOfMoves(moveArrForGenome, true);
        distanceFromExit = maze.getDistanceFromExitPos();
        genome.updateFitnessScore(1 / (distanceFromExit + 1));

        //if solution is found
        if (genome.fitnessScore >= 1) {
          //weighing function to prioritize faster routes
          genome.updateFitnessScore(1 + (70 - maze.getNumMoves())/15);
          console.log(distanceFromExit, maze.getNumMoves())
        }

        if (genome.fitnessScore > bestSolutionScore) {
          bestSolutionIndex = index;
          bestSolutionScore = genome.fitnessScore;
        };

        totalFitnessScore += genome.fitnessScore;
      });

      //we want to save the best solution ever, just in case an optimal solution is killed
      if (bestSolutionScore > bestEverSolutionScore) {
        bestEverSolutionScore = bestSolutionScore;
        bestEverSolutionGenome = genomesArr[bestSolutionIndex];
      }
    },
    printScores: function() {
      console.log('*******************');
      console.log('Current best genome: ' + bestSolutionIndex);
      console.log('Current best score: ' + bestSolutionScore);
      console.log('*******************');
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
    mutate: function(target) {
      var modifiedBitsArr;

      modifiedBitsArr = _.map(target.bits.split(''), function(bit) {
        if (Math.random() < MUTATIONRATE) {
          return bit === '0' ? '1' : '0';
        };
        return bit;
      });

      target.bits = modifiedBitsArr.join('');
    },
    crossover: function(p1, p2) {
      //creates clones of the parents to ensure that changing them do not affect parents
      var childA = p1.clone(),
        childB = p2.clone();
      
      //crossover
      if (Math.random() < CROSSOVERRATE) {
        // console.log('swapping')
        childA.swap(childB);
      }

      this.mutate(childA);
      this.mutate(childB);
      return [childA, childB];
     },
    epoch: function() {
      var newPop = [],
        newPopCount = 0,
        mom,
        dad;

      while (newPopCount < POPSIZE) {
        mom = this.rouletteWheelSelection();
        dad = this.rouletteWheelSelection();

        newPop = newPop.concat(this.crossover(mom, dad));
        newPopCount += 2;
      };

      //saves the new population and calculates new fitness scores
      genomesArr = newPop;
      this.updateFitnessScore();
    },
    main: function() {
      var counter = 0;
      while(counter < 1000) {
        this.epoch();
        counter++;
      }

      console.log('Best Ever Solution Score: ' + bestEverSolutionScore);
      maze.makeSeriesOfMoves(utility.convertBinaryToInteger(bestEverSolutionGenome.bits), true);
      console.log(maze.getNumMoves());
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
genetic.main();

// var t = convertBinaryToMoves('0001110000000111000010111101100000011001000110111010010100101001101111');
// console.log(t)
// console.log(convertMovesToBinary(t));
module.exports = Genetic;