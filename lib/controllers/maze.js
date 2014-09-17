'use strict';

var _ = require('lodash');

function Maze() {
  var map = [],
    //all pos are array in format [row pos, col pos]
    startPos,
    exitPos,
    currPos,
    numMoves;

  /* private functions */

  //tries to find a cell in map containing the argument passed in
  //returns an array containing the row and col position 
  //otherwise return null
  function findCellByValue(val) {
    var row, col;

    for (row = 0; row < map.length; row++) {
      var col = map[row].indexOf(val);
      if (col !== -1) {
        return [row, col];
      }      
    }
    return null;
  };

  //0 = up
  //1 = down
  //2 = left
  //3 = right
  function makeMove(move) {
    //vertical move
    if (move < 2) {
      //converts 0 and 1 to -1(up) and +1(down) respectively
      makeMoveHelper(move * 2 - 1 , 0);
    } 
    //horizontal move
    else {
      //converts 2 and 3 to -1(left) and +1(right) respectively
      makeMoveHelper(0, move * 2 - 5);
    }
    numMoves++;
  };

  function makeMoveHelper(rowOffset, colOffset) {
    var newRowPos = currPos[0] + rowOffset,
      newColPos = currPos[1] + colOffset,
      destCell;

    //checks if new positions are beyond the map boundaries
    if (newRowPos < 0 || newRowPos >= map.length) return false;
    if (newColPos < 0 || newColPos >= map[0].length) return false;

    destCell = getCell(newRowPos, newColPos);

    //if the destination cell is empty or is the exit
    //we assume we can go back to the start cell too
    if (destCell === 0 || destCell === 5 || destCell === 8 ) {
      currPos[0] = newRowPos;
      currPos[1] = newColPos;
      return true;
    };

    return false;
  }

  function getCell(row, col) {
    return map[row][col];
  }

  function getCurrentCell() {
    return getCell(currPos[0], currPos[1]);
  }

  /* end private functions */

  return {
    init: function(mazeData) {
      map = mazeData;
      //start point designated by 8, end point by 5, 1 for wall, 0 for blank
      startPos = findCellByValue(8);
      exitPos = findCellByValue(5);

      if (startPos === null) throw new Error('Invalid map passed in - no startPos.');
      if (exitPos === null) throw new Error('Invalid map passed in - no exitPos.');
      currPos = startPos.slice();
      numMoves = 0;
    },
    getMap: function() {
      return map;
    },
    getCurrPos: function() {
      return currPos;
    },
    makeSeriesOfMoves: function(movesArr, reset) {
      if (reset) {
        currPos = startPos.slice();
        numMoves = 0;
      };

      for (var i = 0; i < movesArr.length; i++) {
        //if already at exitPos, stops the search
        if (getCurrentCell() === 5) return;
        makeMove(movesArr[i]);
      }
    },
    getDistanceFromExitPos: function() {
      return Math.abs(exitPos[0] - currPos[0]) + Math.abs(exitPos[1] - currPos[1]);
    },
    printInfo: function() {
      console.log('curr pos: ' + currPos);
    },
    getNumMoves: function() {
      return numMoves;
    }
  }
}

module.exports = Maze;