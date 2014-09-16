'use strict';

var Maze = require('../../../lib/controllers/maze'),
  _ = require('lodash'),
  should = require('should');

var maze = Maze(),
  testMap = [
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
  ];

describe('initializing maze', function() {
  beforeEach(function() {
    maze.init(testMap);
  });

  it('map data is saved', function() {
    _.isEqual(maze.getMap(), testMap).should.be.true;
  });

  it('should throw error if no start or exit pos are in map', function() {
    (function() {
      maze.init([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [7, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5],
        [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]);
    }).should.throw('Invalid map passed in - no startPos.');
    (function() {
      maze.init([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [8, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2],
        [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ]);
    }).should.throw('Invalid map passed in - no exitPos.');
  });  
});

describe('makeSeriesOfMoves', function() {
  beforeEach(function() {
    maze.init(testMap);
  });

  it('should not move into a wall', function() {
    maze.makeSeriesOfMoves([0]);
    _.isEqual(maze.getCurrPos(), [2, 0]).should.be.true;

    maze.init(testMap);
    maze.makeSeriesOfMoves([1]);
    _.isEqual(maze.getCurrPos(), [2, 0]).should.be.true;

    maze.init(testMap);
    maze.makeSeriesOfMoves([2]);
    _.isEqual(maze.getCurrPos(), [2, 0]).should.be.true;
  });

  it('should be able to move into a blank space', function() {
    maze.makeSeriesOfMoves([3]);
    _.isEqual(maze.getCurrPos(), [2, 1]).should.be.true;
  });

  it('should be able to move into a series of blank spaces', function() {
    maze.makeSeriesOfMoves([3, 3, 1, 2]);
    _.isEqual(maze.getCurrPos(), [3, 1]).should.be.true;
  });

  it('should be able to move into a series of blank spaces and then hit a wall', function() {
    maze.makeSeriesOfMoves([3, 3, 1, 2, 2, 1, 3, 1, 2]);
    _.isEqual(maze.getCurrPos(), [5, 2]).should.be.true;
  });

  it('should be able to backtrack into the startPos', function() {
    maze.makeSeriesOfMoves([3, 2]);
    _.isEqual(maze.getCurrPos(), [2, 0]).should.be.true;
  });

  it('should be able to enter to exitPos', function() {
    maze.makeSeriesOfMoves([3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 0, 3]);
    _.isEqual(maze.getCurrPos(), [7, 14]).should.be.true;
  });

  it('once we reach exitPos, does not evaluate any more moves even if there are still some left', function() {
    maze.makeSeriesOfMoves([3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 0, 3]);
    maze.makeSeriesOfMoves([2]);
    _.isEqual(maze.getCurrPos(), [7, 14]).should.be.true;
  });

  it('should reset currPos to start if true is passed in as second argument', function() {
    //base case
    maze.makeSeriesOfMoves([3, 3]);
    _.isEqual(maze.getCurrPos(), [2, 2]).should.be.true;

    maze.makeSeriesOfMoves([3, 3]);
    _.isEqual(maze.getCurrPos(), [2, 4]).should.be.true;

    //resetting
    maze.init(testMap);
    maze.makeSeriesOfMoves([3, 3]);
    _.isEqual(maze.getCurrPos(), [2, 2]).should.be.true;

    maze.makeSeriesOfMoves([3, 3], true);
    _.isEqual(maze.getCurrPos(), [2, 2]).should.be.true;    

  });
});

describe('getDistanceFromExitPos', function() {
  //moves currPos to exitPos
  beforeEach(function() {
    maze.init(testMap);
    maze.makeSeriesOfMoves([3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 1, 3, 3, 3, 3]);
  });

  it('should return 0 when it is at exit', function() {
    maze.makeSeriesOfMoves([3]);
    maze.getDistanceFromExitPos().should.equal(0);
  });

  it('should correctly return how many horizontal units away', function() {
    maze.makeSeriesOfMoves([2, 2]);
    maze.getDistanceFromExitPos().should.equal(3);
  });

  it('should consider horizontal and vertical', function() {
    maze.makeSeriesOfMoves([2, 1]);
    maze.getDistanceFromExitPos().should.equal(3);

    maze.makeSeriesOfMoves([2, 2]);
    maze.getDistanceFromExitPos().should.equal(5);
  });  
})