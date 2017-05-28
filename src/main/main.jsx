'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReactRouter from 'react-router';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../js/history' 

import Home from '../pages/Home.jsx';
import GameBoard from '../pages/GameBoard.jsx';



//Starting the material javascript backend






// Set Our Routes 
ReactDOM.render(
  <Router history={history}>
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/game" component={GameBoard}/>
      </Switch>
  </Router>,
document.getElementById("main"));