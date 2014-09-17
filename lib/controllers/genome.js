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
  if (fs < 0) throw new Error('should take a number greater or equals to 0');

  this.fitnessScore = fs;
};

//returns a new genome with the same bits as current genome
Genome.prototype.clone = function() {
  var result = new Genome();
  result.bits = this.bits;

  return result;
};

//takes a target genome as an argument and swap bits with current genome
//changes are made inplace
Genome.prototype.swap = function(target) {
  var swapPos = Math.floor(Math.random() * this.bits.length),
    modifiedBits,
    modifiedTargetBits;

    //split up for readability

    //sections that are not swapped
    modifiedBits = this.bits.substring(0, swapPos);
    modifiedTargetBits = target.bits.substring(0, swapPos);

    //sections that are swapped
    modifiedBits += target.bits.substring(swapPos);
    modifiedTargetBits += this.bits.substring(swapPos);

    this.bits = modifiedBits;
    target.bits = modifiedTargetBits;
};

module.exports = Genome;