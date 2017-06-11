'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as actions from '../actions/actions.js';
import { connect } from "react-redux";

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

  render() {
    return (
      <button disabled={this.props.gameComplete} onClick={this.handleClick} onContextMenu={this.handleOnContextMenu}>
        {this.props.text}
      </button>
    );
  };
};