import gameboard from "../Js/gameboard.js";

var rows = gameboard.DEFAULT_ROWS;
var columns = gameboard.DEFAULT_COLUMNS;
var bombs = gameboard.DEFAULT_BOMBS;
var defaultGameboard = new gameboard(rows, columns, bombs);

export const gameBoardReducer = function(state = {gameboard: defaultGameboard}, action) {
    const newState = {...state};
    switch(action.type) {
        case "PRE_DIG":
            newState.gameboard.setPreDig();
            break;
        case "PRE_FLAG":
            newState.gameboard.setPreFlag();
            break;
    };
    return newState;
};

export const tileReducer = function(state = {tiles: defaultGameboard.tiles}, action) {
    const newState = {...state};
    switch(action.type) {
        case "FLAGED":
            var newTile = newState.tiles[action.x][action.y];
            newTile.flag();
            break;
        case "DIG":
            var newTile = newState.tiles[action.x][action.y];
            newTile.dig();
            break;
        /*case "WON":
            newTile.setWon();
            break;
        case "LOST":
            newTile.setLost();
            break;*/
    };
    
    return newState;
};