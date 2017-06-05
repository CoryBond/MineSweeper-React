'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ReactRouter from 'react-router';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../js/history' 

import { Provider } from "react-redux";
import { store } from "../stores/store.js";

import Home from '../pages/Home.jsx';
import GameBoardPage from '../pages/GameBoardPage.jsx';




// Set Our Routes and Redux Store
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/game" component={GameBoardPage}/>
            </Switch>
        </Router>
    </Provider>,
document.getElementById("main"));