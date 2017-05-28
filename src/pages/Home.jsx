'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import history from '../js/history' 


export default class Home extends React.Component {
  routeFromHome(e){
    history.push("/game");
  }

  render() {
    return (
      <div>
        <h1>You are now playing MineSweep!</h1>
        <p>House Rules: The Grid will be 30x15 and there will be 20 bombs.</p>
        <p>For further rules checkout the wikipedia page:</p>
        <a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)"> Wikipedia(MineSweep)</a>
        <button onClick={this.routeFromHome}>Start Game</button>
      </div>
    );
  };
};