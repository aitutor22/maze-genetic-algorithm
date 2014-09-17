'use strict';

var Genetic = require('../../../lib/controllers/genetic'),
  _ = require('lodash'),
  should = require('should'),
  Maze = require('../../../lib/controllers/Maze'),
  Utility = require('../../../lib/controllers/Utility');

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

describe('init function', function() {
  it('should initialize x number of genomes', function() {
    var x = 10;

    genetic.init(4, x, 0.7, 0.01, maze, utility);
    genetic.getGenomesArr().length.should.equal(x);
  });

  it('genomes should have y number of bits', function() {
    var y = 4;

    genetic.init(y, 10, 0.7, 0.01, maze, utility);
    genetic.getGenomesArr()[0].bits.length.should.equal(y);
  });
});