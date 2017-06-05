import { createStore } from "redux";
import { gameboard } from "../Js/gameboard.js";


const gameBoardReducer = function(state, action) {
    //const newState = {...state};
    switch(action.type) {
        case "SET_TILES":
            break;
        case "CASCADE_BLANKS":
            break;
        case "INCREASE_CLICKED":
            break;
        case "DECREASE_CLICKED":
            break;
        case "WON":
            break;
        case "LOST":
            break;
    };
    
    return state;
};

const tileReducer = function(state, action) {
    const newState = {...state};
    switch(action.type) {
        case "FLAGED":
            //newState.
            break;
        case "DIG":
            break;
        case "WON":
            break;
        case "LOST":
            break;

    };
    
    return state;
};


const reducers = combineReducers({
    tile: tileReducer,
    gameboard: gameBoardReducer
})

const store = createStore(
    reducers,
    gameboard);




/*store.subscribe(() => {
    console.log("store changed", store.getState())
});

store.dispatch({type: "INC", payload: 1});*/