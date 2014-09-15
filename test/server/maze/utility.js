'use strict';

var Utility = require('../../../lib/controllers/utility'),
  _ = require('lodash'),
  should = require('should');

describe('convertBinaryToMoves', function() {
  it('should throw an error if a string is not passed in', function(){
    (function() {
      Utility.convertBinaryToMoves(123);
    }).should.throw('invalid argument passed in');
  });

  it('should throw an error when a string that has odd number is passed in', function() {
    (function() {
      Utility.convertBinaryToMoves('000');
    }).should.throw('bits must have even length');
  });

  it('should return an array of numbers', function() {
    (Utility.convertBinaryToMoves('00') instanceof Array).should.be.true;
  });

  it('should return an array of numbers of half the length of the bits', function() {
    Utility.convertBinaryToMoves('00').length.should.equal(1);
    Utility.convertBinaryToMoves('00112233').length.should.equal(4);
  });

  it('should return 0 when 00 is passed in', function() {
    _.isEqual(Utility.convertBinaryToMoves('00'), [0]).should.be.true;
  });

  it('should return 1 when 01 is passed in', function() {
    _.isEqual(Utility.convertBinaryToMoves('01'), [1]).should.be.true;
  });

  it('should return 2 when 10 is passed in', function() {
    _.isEqual(Utility.convertBinaryToMoves('10'), [2]).should.be.true;
  });

  it('should return 3 when 11 is passed in', function() {
    _.isEqual(Utility.convertBinaryToMoves('11'), [3]).should.be.true;
  });      
});

describe('convertMovesToBinary', function() {
  it('should accept an array of numbers', function() {
    (function() {
      Utility.convertMovesToBinary('123');
    }).should.throw('invalid argument passed in')
  });

  it('should accept an array of numbers', function() {
    (function() {
      Utility.convertMovesToBinary(['123', 232]);
    }).should.throw('invalid argument passed in')
  });  

  it('should only accept numbers between 0-3', function() {
    (function() {
      Utility.convertMovesToBinary([-1, 3, 2]);
    }).should.throw('invalid argument passed in');

    (function() {
      Utility.convertMovesToBinary([0, 1, 4]);
    }).should.throw('invalid argument passed in');    
  })

  it('should convert 0 to "00"', function() {
    Utility.convertMovesToBinary([0]).should.equal('00');
  });

  it('should convert 1 to "01"', function() {
    Utility.convertMovesToBinary([1]).should.equal('01');
  });  

  it('should convert 2 to "10"', function() {
    Utility.convertMovesToBinary([2]).should.equal('10');
  });

  it('should convert 3 to "11"', function() {
    Utility.convertMovesToBinary([3]).should.equal('11');
  });    

  it('should convert a an array of numbers', function() {
    Utility.convertMovesToBinary([0, 1, 2, 3, 0]).should.equal('0001101100');
    Utility.convertMovesToBinary([1, 2, 3, 3, 1]).should.equal('0110111101');
  })
});

describe('converting bits to numbers and back', function() {
  var testData = [
    '0010000010011101101100111110001111001000000001111110001010000001101010',
    '0001001011100101100000101110010011101011100011101000011111000111000101',
    '1001110110001110001000101000111001001001011010101011001110110100010010',
    '0000001110000001110111001010110100100110101010110111000111100010011001',
    '1101010011101011011011011001110100001011111100100000101111100111100100',
    '1111001000010011010111100101101011101001100000000110001001111001100110',
    '1100101010011011001101011100000110011101000101000101110110111100101100',
    '0110010111100110110111010100000100111011110111110010111011000100011111',
    '1011011001110100110010101001101111001110010011010011001111000111000001',
    '0111101000111010011100011001110010001000111110011111100001001011001101',
    '1010101100000100100111001010011010100010100101110000100101110011001010',
    '1010111111011001111000000101101001110010001000111111111110010011001011',
    '1111001010110011100001000111101111101011110001101111100111101010111100',
    '0101110100010011100100011100111111111001001101110010101111001010010110',
    '1110011011100010111001101101101111010100101011010011101000010111010111',
    '1011001101110110110000101101110110101101100110110111010001111001101010',
    '1011000001100010110000010011100101000110101110101100101100110010000100',
    '0000110101010101010000010111000000101111001001110110111011100011110111'
    ];

  it('should convert correctly', function() {
    _.each(testData, function(data) {
      Utility.convertMovesToBinary(Utility.convertBinaryToMoves(data)).should.equal(data);
    });
  });
});