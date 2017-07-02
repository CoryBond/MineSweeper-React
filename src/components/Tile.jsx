'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as actions from '../actions/actions.js';
import { connect } from "react-redux";

import * as s from '../component-styles/component-styles.js';

@connect((store, ownProps) => {
  var tile = store.tileReducer.tiles[ownProps.x][ownProps.y];
  if (!tile){ 
    console.log("Could Not Map To Gamebaord");
  }
  return {
    gameComplete: tile.gameComplete,
    isFlaged: tile.isFlaged,
    hasExploded: tile.hasExploded,
    text: tile.text
  };
})
export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnContextMenu = this.handleOnContextMenu.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }

  /*componentDidMount(){
    store.subscribe(() => {
        console.log("store changed", store.getState());
    });
  }*/

  handleClick(e){
    e.preventDefault();
    this.props.dispatch(actions.DIG(this.props.x,this.props.y));
  }

  handleOnContextMenu(e){
    e.preventDefault();
    this.props.dispatch(actions.FLAGED(this.props.x,this.props.y));
  }

  mouseDown(e) {

    switch (e.button) {
      case 0: 
        if(this.nothingToFear(this.props.text)) return;
        this.props.dispatch(actions.PRE_DIG());
        break;
      case 1: 
        if(this.nothingToFear(this.props.text)) return;
        this.props.dispatch(actions.PRE_DIG());
        break;
      case 2: 
        this.props.dispatch(actions.PRE_FLAG());
        break;
    };
  }

  nothingToFear(text){
    return text != "n" && text != "" && text != "b";
  }

  render() {
    return (
      <s.TileButton disabled={this.props.gameComplete} type="button" onClick={this.handleClick} 
                    onContextMenu={this.handleOnContextMenu} onMouseDown={this.mouseDown}>
        {this.props.text}
      </s.TileButton>
    );
  };
};