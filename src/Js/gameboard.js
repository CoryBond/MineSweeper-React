'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as actions from '../actions/actions.js';

import tile from './tile.js';

export default class gameboard {c
  constructor(rows, columns, bombs) {
    this.headText = "Game Active";
    this.gameover = false;
    this.gameComplete = false,
    this.falgsCount = gameboard.BOMBS;
    this.tiles = [[]];
    this.bombs = [[]];
    this.nearbyBombCount = [[]];
    // Necessary Evil For Cascading
    //this.tileDigFuncs = [[]];
    this.numberOfTilesClicked = 0;
    this.flagsCount = bombs;
    this.numberOfTiles = rows * columns;
    this.setBoardTiles(rows, columns, bombs);
  }

  increaseClickedCounter(){
    this.numberOfTilesClicked--;
    this.flagsCount = this.flagsCount + 1
  }

  decreaseClickedCounter(clickFlag){
    this.numberOfTilesClicked++;
    if(clickFlag)
        this.flagsCount = this.flagsCount - 1

    this.checkIfWon();
  }

  setGameOverState(){
    this.gameover = true;
    this.headText = "Game Over!";
    this.gameComplete = true;
    this.tiles.map(tileRows =>
      tileRows.map(tile =>
        tile.setLost()
      )
    );
  }

  checkIfWon(){
    if(this.numberOfTilesClicked == this.numberOfTiles && this.flagsCount == 0)
      this.setWonState();
  }

  // Console log the winner state right now.
  setWonState(){
    this.headText = "You WON!";
    this.gameComplete = true;
    this.tiles.map(tileRows =>
      tileRows.map(tile =>
        tile.setWon()
      )
    );
  }
  
  cascadeBlanks(x, y){
    this._cascadeBlanks(x, y);
    this.decreaseClickedCounter(false);
  }

  _cascadeBlanks(x, y){
    var exploded = false;
    if(x !== 0)
      exploded = this.tiles[x-1][y].dig();
    if(!exploded && y !== 0)
      exploded = this.tiles[x][y-1].dig();
    if(!exploded && this.tiles[x+1])
      exploded = this.tiles[x+1][y].dig();
    if(!exploded && this.tiles[x][y+1])
      exploded = this.tiles[x][y+1].dig();

    //diagnols
    if(!exploded && x !== 0 && y !== 0)
      exploded = this.tiles[x-1][y-1].dig();
    if(!exploded && this.tiles[x+1] && y !== 0)
      exploded = this.tiles[x+1][y-1].dig();
    if(!exploded && x !== 0 && this.tiles[x][y+1])
      exploded = this.tiles[x-1][y+1].dig();
    if(!exploded && this.tiles[x+1] && this.tiles[x][y+1])
      exploded = this.tiles[x+1][y+1].dig();
  }
  
  setBoardTiles(numRows,numColumns, bombs) {
    var tempTiles = this.createTiles(numRows,numColumns);

    this.setBombs(tempTiles, bombs, numRows, numColumns);

    this.tiles = tempTiles;
  };

  setBombs(tiles, numBombs, numRows, numColumns) {
    // Max number but with consideration that we are using an index.
    var maxNum = numRows * numColumns;
    var bombLocations = this.getRandomUniqueArray(numBombs, maxNum);
    for(var i = 0; i < bombLocations.length; i++){
      var bombLocation = bombLocations[i];
      var row = Math.floor(bombLocation / numColumns);
      var column = bombLocation % numColumns;
      tiles[row][column].isBomb = true;

      // Set Bomb Counts
      var nextRow = row+1;
      var lastRow = row-1;
      var lastColumn = column-1;
      var nextColumn = column+1;
      if(lastRow >= 0)
        tiles[lastRow][column].nearbyBombCount++;
      if(lastColumn >= 0)
        tiles[row][lastColumn].nearbyBombCount++;
      if(nextRow < numRows)
        tiles[nextRow][column].nearbyBombCount++;
      if(nextColumn < numColumns)
        tiles[row][nextColumn].nearbyBombCount++;

      //Diagnol Tiles
      if(nextRow < numRows && nextColumn < numColumns)
        tiles[nextRow][nextColumn].nearbyBombCount++;
      if(lastRow >= 0 && nextColumn < numColumns)
        tiles[lastRow][nextColumn].nearbyBombCount++;
      if(nextRow < numRows && lastColumn >= 0)
        tiles[nextRow][lastColumn].nearbyBombCount++;
      if(lastRow >= 0 && lastColumn >= 0)
        tiles[lastRow][lastColumn].nearbyBombCount++;
    }
  };

  //Swap out for the Knuth Shuffle(aka the Fisher-Yates shuffle) Algorithm?
  getRandomUniqueArray(num, max){
    var arr = []
    while(arr.length < num){
        var randomnumber = Math.floor(Math.random()*max)
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
  }

  createTiles(numRows,numColumns){
    var tempTiles = [[]];
    for(var x = 0; x < numRows; x++){
      tempTiles[x] = [];
      //this.bombs[x] = [];
      //this.tileDigFuncs[x] = [];
      //this.nearbyBombCount[x] = [];
      //for(var y = 0; y < numColumns; y++){
      //  this.nearbyBombCount[x][y] = 0;
      //}
    }

    for(var x = 0; x < numRows; x++)
      for(var y = 0; y < numColumns; y++)
        tempTiles[x][y] = this.createTile(x, y);

    return tempTiles;
  }

  createTile(x, y){
    return new tile(this, x, y);
  }
};

gameboard.DEFAULT_ROWS = 2;
gameboard.DEFAULT_COLUMNS = 2;
gameboard.DEFAULT_BOMBS = 4;