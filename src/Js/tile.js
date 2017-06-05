'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export default class Tile extends React.Component {
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

  componentDidMount(){
    store.subscribe(() => {
        console.log("store changed", store.getState());
    });
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
        this.isFlaged = true,
        this.text = "flag";
      this.props.decreaseClickedCounter(true);
      dispatch()
    }
    else
    {
      if(this.isClicked){
        this.isClicked = false;
        this.isFlaged = false;
        this.text = "nothing";
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