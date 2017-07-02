import { createStore, combineReducers } from "redux";
import { gameBoardReducer, tileReducer} from "../reducers/reducers.js";

const reducers = combineReducers({
    tileReducer,
    gameBoardReducer
})

var store = createStore(
    reducers,
    {});

export default store;

/*store.subscribe(() => {
    console.log("store changed", store.getState())
});

store.dispatch({type: "INC", payload: 1});*/