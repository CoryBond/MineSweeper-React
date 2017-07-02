'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as actions from '../actions/actions.js';
import { connect } from "react-redux";

import Tile from './Tile.jsx';

import * as s from '../component-styles/component-styles.js';

@connect((store) => {
  var gameboard = store.gameBoardReducer.gameboard;
  return {
    headSource: gameboard.headSource,
    gameover: gameboard.gameover,
    gameComplete: gameboard.gameComplete,
    flagsCount: gameboard.flagsCount,
    tiles: gameboard.tiles
  }
})
export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { score: 0 };
    this.start = null;
    this.intervalId = 0;
  }

  componentDidMount(){
    this.start = new Date();
    this.intervalId = setInterval(this.tick, 1000);
  }

  tick(){
    if(!this.props.gameComplete)
      this.setState({score: Math.floor((new Date() - this.start) / 1000)});
    else
      clearInterval(this.intervalId);
    
  }

  componentWillUnMount(){
    clearInterval(this.intervalId);
  }

  createTile(x_location, y_location){
    return <Tile x = {x_location} y = {y_location}/>;
  }

  render() {
    return (
      <s.Gameboard>
        <s.MineSweepHeaderBar>
          <s.MineSweepHeaderFlag>Flags: {this.props.flagsCount}</s.MineSweepHeaderFlag>
          <s.MineSweepHeader><s.MineSweepHead src={'./src/resources/head-images/' + this.props.headSource + '.jpg'}/></s.MineSweepHeader>
          <s.MineSweepHeader>Score: {this.state.score}</s.MineSweepHeader>
        </s.MineSweepHeaderBar>
        <s.GameboardTable>
          <tbody>
            {this.props.tiles.map((tileRows, i) =>
              <tr key={i}>
                {tileRows.map((tile, i) =>
                  <td key={i}>
                    {this.createTile(tile.x, tile.y)}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </s.GameboardTable>
      </s.Gameboard>
    );
  };
};