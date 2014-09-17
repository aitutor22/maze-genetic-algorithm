'use strict';

function Genome(numBits) {
  var buffer = [];
  this.bits = '';
  this.fitnessScore;

  for (var i = 0; i < numBits; i++) {
    buffer[i] = (Math.random() < 0.5) ? 0 : 1;
  };

  this.bits = buffer.join('');
}

Genome.prototype.updateFitnessScore = function(fs) {
  if (typeof fs !== 'number') throw new Error('invalid argument passed in');
  if (fs < 0 || fs > 1) throw new Error('should take a number between 0 and 1');

  this.fitnessScore = fs;
};

//returns a new genome with the same bits as current genome
Genome.prototype.cloneBits = function() {
  var result = new Genome();
  genome.bits = this.bits;

  return result;
}

module.exports = Genome;