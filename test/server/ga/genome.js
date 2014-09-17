'use strict';

var Genome = require('../../../lib/controllers/genome'),
  _ = require('lodash'),
  should = require('should');
  
var genome;

describe('constructor', function() {
  it('create a genome with bits the same length as the argument passed in', function(){
    genome = new Genome(70);
    genome.bits.length.should.equal(70);
  });

  it('all the bits should be either 0 or 1', function() {
    _.each(genome.bits, function(genome) {
      (genome === '0' || genome === '1').should.be.true;
    });
  })
});

describe('updateFitnessScore function', function() {
  it('should take a number', function() {
    (function() {
      genome.updateFitnessScore(1);
    }).should.not.throw();

    (function() {
      genome.updateFitnessScore();
    }).should.throw('invalid argument passed in');
  });

  it('should take a number between 0 and 1', function() {
    (function() {
      genome.updateFitnessScore(-1);
      genome.updateFitnessScore(2);
    }).should.throw('should take a number between 0 and 1');
  });

  it('should update fitnessScore field', function() {
    genome.fitnessScore = 0.5;

    genome.updateFitnessScore(1);
    genome.fitnessScore.should.equal(1);
  })
});