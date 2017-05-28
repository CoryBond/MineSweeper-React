'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as s from '../component-styles/component-styles.js';




class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnContextMenu = this.handleOnContextMenu.bind(this);
    this.dig = this.dig.bind(this);
    this.flag = this.flag.bind(this);
    this.state = {
      gameComplete: false,
      isFlaged: false,
      hasExploded: false,
      text: "nothing"
    };
    this.isClicked = false;
  }

  gameCompleted(){
    this.setState({
      gameComplete: true,
    });
  }

  handleClick(e){
    e.preventDefault();
    this.dig();
  }

  handleOnContextMenu(e){
    e.preventDefault();
    this.flag();
  }

  dig(){
    if(this.isClicked){
      return;
    }
    this.isClicked = true;

    if(this.props.isBomb){
      this.setState({
        text: "bomb",
        gameComplete: true,
        hasExploded: true
      });
      this.props.setGameOverState();
      return true;
    }else{
      if(this.props.nearbyBombCount === 0){
        this.setState({
          counter: this.state.counter+1,
          text: "blank " + this.state.counter
        });
        this.props.cascadeBlanks(this.props.x, this.props.y);
      }else{
        this.setState({
          text: this.props.nearbyBombCount
        });
        this.props.decreaseClickedCounter(false);
      }
    }
    return false;
  }

  flag(){
    if(!this.state.isFlaged){
      if(this.isClicked) return;
      this.isClicked = true;
      this.setState({
        isFlaged: true,
        text: "flag"
      });
      this.props.decreaseClickedCounter(true);
    }
    else
    {
      if(this.isClicked){
        this.isClicked = false;
        this.setState({
          isFlaged: false,
          text: "nothing"
        });
        this.props.increaseCounters();
      }
    }
  }

  render() {
    return (
      <button disabled={this.state.gameComplete} onClick={this.handleClick} onContextMenu={this.handleOnContextMenu}>
        {this.state.text}
      </button>
    );
  };
};

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.decreaseClickedCounter = this.decreaseClickedCounter.bind(this);
    this.increaseCounters = this.increaseCounters.bind(this);
    this.setGameOverState = this.setGameOverState.bind(this);
    this.cascadeBlanks = this.cascadeBlanks.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      headText: "Game Active",
      gameover: false,
      // Technically shouldn't this be a "low score??"
      highscore: 0,
      score: 0,
      gameComplete: false,
      flagsCount: GameBoard.BOMBS,
      tiles: [[]]
    };
    this.bombs = [[]],
    this.nearbyBombCount = [[]],
    // Necessary Evil For Cascading
    this.tileDigFuncs = [[]];
    this.numberOfTilesClicked = 0;
    this.numberOfTiles = GameBoard.ROWS * GameBoard.COLUMNS;
    this.start = null;
    this.intervalId = 0;
  }

  componentDidMount(){
    this.setBoardTiles(GameBoard.ROWS,GameBoard.COLUMNS);
    this.start = new Date();
    this.intervalId = setInterval(this.tick, 1000);
  }

  tick(){
    this.setState({score: Math.floor((new Date() - this.start) / 1000)});
  }

  checkIfWon(){
    if(this.numberOfTilesClicked === this.numberOfTiles && this.state.flagsCount === 0)
      this.setWonState();
  }

  decreaseClickedCounter(clickFlag){
    this.numberOfTilesClicked++;
    if(clickFlag)
      this.setState({
        flagsCount: this.state.flagsCount - 1
      }, () => {
        this.checkIfWon();
      }
      );
  }

  increaseCounters(){
    this.numberOfTilesClicked--;
    this.setState({
      flagsCount: this.state.flagsCount + 1
      }
    );
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
  }

  setGameOverState(){
    this.setState({
      gameover: true,
      headText: "Game Over!",
      gameComplete: true
    });

    clearInterval(this.intervalId);
  }

  // Console log the winner state right now.
  setWonState(){
    this.setState({
      headText: "You WON!",
      gameComplete: true
    });

    clearInterval(this.intervalId);
  }

  setBombs(numBombs, numRows, numColumns) {
    var bombLocations = this.getRandomUniqueArray(numBombs, numRows * numColumns);
    for(var i = 0; i < bombLocations.length; i++){
      var bombLocation = bombLocations[i];
      var row = Math.floor(bombLocation / numColumns);
      var column = bombLocation % numColumns;
      this.bombs[row][column] = true;

      // Set Bomb Counts
      if(row-1 >= 0)
        this.nearbyBombCount[row-1][column]++;
      if(column-1 >= 0)
        this.nearbyBombCount[row][column-1]++;
      if(row+1 < numRows)
        this.nearbyBombCount[row+1][column]++;
      if(column+1 < numColumns)
        this.nearbyBombCount[row][column+1]++;
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
    this.setState({
      tiles: tempTiles
    });
    return tempTiles;
  }

  setBoardTiles(numRows,numColumns) {
    var tempTiles = this.setMatrixes(numRows,numColumns);

    this.setBombs(GameBoard.BOMBS, numRows, numColumns);

    for(var x = 0; x < numRows; x++)
      for(var y = 0; y < numColumns; y++)
        tempTiles[x][y] = this.createTile(x, y);

    this.setState({
      tiles: tempTiles
    });
  };

  createTile(x, y){
    var isBomb = false;
    if(this.bombs[x] && this.bombs[x][y])
      var isBomb = true;
    return <Tile 
      isBomb = {isBomb}
      x = {x} y = {y}
      gameComplete = {this.state.gameComplete}
      nearbyBombCount = {this.nearbyBombCount[x][y]}
      decreaseClickedCounter={this.decreaseClickedCounter} setGameOverState={this.setGameOverState} 
      cascadeBlanks={this.cascadeBlanks} increaseCounters={this.increaseCounters}
      ref={(c) => { this.tileDigFuncs[x][y] = c.dig; this.tileDigFuncs[x][y] = c.dig; }}/>;
  }

  componentWillUnMount(){
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Flags: {this.state.flagsCount}</th>
            <th>{this.state.headText}</th>
            <th>Score: {this.state.score}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tiles.map((tileRows, i) =>
            <tr key={i}>
              {tileRows.map((tile, i) =>
                <td key={i}>
                  {tile}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  };
};

GameBoard.ROWS = 15;
GameBoard.COLUMNS = 30;
GameBoard.BOMBS = 2 ;