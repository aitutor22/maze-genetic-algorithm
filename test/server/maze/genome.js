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