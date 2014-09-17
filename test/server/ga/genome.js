'use strict';

var Genome = require('../../../lib/controllers/genome'),
  _ = require('lodash'),
  should = require('should');
  
var genome;

describe('constructor', function() {
  beforeEach(function() {
    genome = new Genome(70);
  });

  it('create a genome with bits the same length as the argument passed in', function(){
    genome.bits.length.should.equal(70);
  });

  it('all the bits should be either 0 or 1', function() {
    _.each(genome.bits, function(genome) {
      (genome === '0' || genome === '1').should.be.true;
    });
  })
});

describe('updateFitnessScore function', function() {
  beforeEach(function() {
    genome = new Genome(70);
  });

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

describe('clone function', function() {
  beforeEach(function() {
    genome = new Genome(70);
  });

  it('should return a new genome', function() {
    var child = genome.clone();
    (child instanceof Genome).should.be.true;
  });

  it('should return a new genome with the same bits as the current genome', function() {
    var child = genome.clone();
    child.bits.should.equal(genome.bits);
  });

  it('changing the bits of the child genome shouldn\'t affect parent genome', function() {
    var child = genome.clone();
    //modifies the first bit of the child genome

    var firstBit = child.bits.substring(0, 1) === '0' ? '1' : '0';
    child.bits = firstBit + child.bits.substring(1);
    child.bits.should.not.equal(genome.bits);
  });
});

describe('swap function', function() {
  var genome2;
  beforeEach(function() {
    genome = new Genome(8);
    genome2 = new Genome(8);
  });  
});