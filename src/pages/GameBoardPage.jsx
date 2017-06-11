'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import * as s from '../component-styles/component-styles.js';

import GameBoard from '../components/GameBoard.jsx';



export default class GameBoardPage extends React.Component {
  render() {
    return (
      <GameBoard/>
    );
  };
};