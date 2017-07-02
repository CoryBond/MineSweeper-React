'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as actions from '../actions/actions.js';

export default class tile {
  constructor(gameboard, x, y) {
    this.gameboard = gameboard;
    this.x = x;
    this.y = y;
    this.gameComplete = false;
    this.isFlaged = false;
    this.hasExploded = false;
    this.text = "n";
    this.isClicked = false;
    this.isBomb = false;
    this.nearbyBombCount = 0;
  }

  /*componentDidMount(){
    store.subscribe(() => {
        console.log("store changed", store.getState());
    });
  }*/

  setWon(){
    this.gameComplete = true;
  }

  setLost(){
    this.gameComplete = true;
    if(this.isBomb){
      this.text = "b";
      this.hasExploded = true;
    }
  }

  // Returns if exploded or not because we dug up a bomb or not.
  dig(){
    if(this.isClicked){
      return;
    }
    this.isClicked = true;

    if(this.isBomb){
        this.setLost();
        this.gameboard.setGameOverState();
        return this.hasExploded;
    }else{
      this.gameboard.setRelieved();
      if(this.nearbyBombCount === 0){
          //counter: this.state.counter+1,
        this.text = ""; /*+ this.state.counter*/
        this.gameboard.cascadeBlanks(this.x,this.y);
      }else{
        this.text = this.nearbyBombCount;
        this.gameboard.decreaseClickedCounter(false);
      }
    }
    return false;
  }

  flag(){
    if(!this.isFlaged){
      if(this.isClicked) return;
      this.isClicked = true;
      this.isFlaged = true,
      this.text = "f";
      this.gameboard.decreaseClickedCounter(true);
    }
    else
    {
      if(this.isClicked){
        this.isClicked = false;
        this.isFlaged = false;
        this.text = "n";
        this.gameboard.increaseClickedCounter();
      }
    }
    this.gameboard.setNormal();
  }

  render() {
    return (
      <button disabled={this.state.gameComplete} onClick={this.handleClick} onContextMenu={this.handleOnContextMenu}>
        {this.state.text}
      </button>
    );
  };
};