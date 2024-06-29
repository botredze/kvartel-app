import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateSlice from "./reducers/stateSlice";

const reducer = combineReducers({
    stateSlice
});
export const store = configureStore({
    reducer,
});
