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

module.exports = Genome;