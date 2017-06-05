'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as actions from '../actions.js';
import { store } from '../stores.js';

import Tile from './Tile.js';

export default class gameboard {
  constructor(props) {
    this.headText = "Game Active";
    this.gameover = false;
      // Technically shouldn't this be a "low score??"
    this.highscore = 0;
    this.score = 0;
    this.gameComplete = false,
    this.falgsCount = gameboard.BOMBS;
    this.tiles = [[]];
    this.bombs = [[]];
    this.nearbyBombCount = [[]];
    // Necessary Evil For Cascading
    this.tileDigFuncs = [[]];
    this.numberOfTilesClicked = 0;
    this.numberOfTiles = gameboard.ROWS * gameboard.COLUMNS;
  }

  checkIfWon(){
    if(this.numberOfTilesClicked === this.numberOfTiles && this.state.flagsCount === 0)
      this.setWonState();
  }

  decreaseClickedCounter(clickFlag){
    this.numberOfTilesClicked++;
    if(clickFlag)
        this.flagsCount = this.flagsCount - 1
  }

  increaseCounters(){
    this.numberOfTilesClicked--;
    this.flagsCount = this.flagsCount + 1
  }

  setGameOverState(){
    gameover = true;
    headText = "Game Over!";
    gameComplete = true;
    //clearInterval(this.intervalId);
  }

  // Console log the winner state right now.
  setWonState(){
    headText = "You WON!";
    gameComplete = true;
    //clearInterval(this.intervalId);
  }
  
  cascadeBlanks(x, y){
    this._cascadeBlanks(x, y);
    this.decreaseClickedCounter(false);
  }

  _cascadeBlanks(x, y){
    var exploded = false;
    if(x !== 0)
      exploded = this.tileDigFuncs[x-1][y]();
    if(!exploded && y !== 0)
      exploded = this.tileDigFuncs[x][y-1]();
    if(!exploded && this.tileDigFuncs[x+1])
      exploded = this.tileDigFuncs[x+1][y]();
    if(!exploded && this.tileDigFuncs[x][y+1])
      exploded = this.tileDigFuncs[x][y+1]();

    //diagnols
    if(!exploded && x !== 0 && y !== 0)
      exploded = this.tileDigFuncs[x-1][y-1]();
    if(!exploded && this.tileDigFuncs[x+1] && y !== 0)
      exploded = this.tileDigFuncs[x+1][y-1]();
    if(!exploded && x !== 0 && this.tileDigFuncs[x][y+1])
      exploded = this.tileDigFuncs[x-1][y+1]();
    if(!exploded && this.tileDigFuncs[x+1] && this.tileDigFuncs[x][y+1])
      exploded = this.tileDigFuncs[x+1][y+1]();
  }

  setBombs(numBombs, numRows, numColumns) {
    var bombLocations = this.getRandomUniqueArray(numBombs, numRows * numColumns);
    for(var i = 0; i < bombLocations.length; i++){
      var bombLocation = bombLocations[i];
      var row = Math.floor(bombLocation / numColumns);
      var column = bombLocation % numColumns;
      this.bombs[row][column] = true;

      // Set Bomb Counts
      var nextRow = row+1;
      var lastRow = row-1;
      var lastColumn = column-1;
      var nextColumn = column+1;
      if(lastRow >= 0)
        this.nearbyBombCount[lastRow][column]++;
      if(lastColumn >= 0)
        this.nearbyBombCount[row][lastColumn]++;
      if(nextRow < numRows)
        this.nearbyBombCount[nextRow][column]++;
      if(nextColumn < numColumns)
        this.nearbyBombCount[row][nextColumn]++;

      //Diagnol Tiles
      if(nextRow < numRows && nextColumn < numColumns)
        this.nearbyBombCount[nextRow][nextColumn]++;
      if(lastRow >= 0 && nextColumn < numColumns)
        this.nearbyBombCount[lastRow][nextColumn]++;
      if(nextRow < numRows && lastColumn >= 0)
        this.nearbyBombCount[nextRow][lastColumn]++;
      if(lastRow >= 0 && lastColumn >= 0)
        this.nearbyBombCount[lastRow][lastColumn]++;
    }
  };

  //Swap out for the Knuth Shuffle(aka the Fisher-Yates shuffle) Algorithm?
  getRandomUniqueArray(num, max){
    var arr = []
    while(arr.length < num){
        var randomnumber = Math.ceil(Math.random()*max)
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
  }

  setMatrixes(numRows,numColumns){
    var tempTiles = [[]];
    for(var x = 0; x < numRows; x++){
      tempTiles[x] = [];
      this.bombs[x] = [];
      this.tileDigFuncs[x] = [];
      this.nearbyBombCount[x] = [];
      for(var y = 0; y < numColumns; y++){
        this.nearbyBombCount[x][y] = 0;
      }
    }

    tiles = tempTiles;

    return tempTiles;
  }

  setBoardTiles(numRows,numColumns) {
    var tempTiles = this.setMatrixes(numRows,numColumns);

    this.setBombs(gameboard.BOMBS, numRows, numColumns);

    for(var x = 0; x < numRows; x++)
      for(var y = 0; y < numColumns; y++)
        tempTiles[x][y] = this.createTile(x, y);

    tiles = tempTiles;
  };

  createTile(x, y){
    var isBomb = false;
    if(this.bombs[x] && this.bombs[x][y])
      var isBomb = true;
    return new Tile(isBomb, x, y, this.nearbyBombCount[x][y]);
  }
};

gameboard.ROWS = 15;
gameboard.COLUMNS = 30;
gameboard.BOMBS = 20;