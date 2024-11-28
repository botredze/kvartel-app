import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateSlice from "./reducers/stateSlice";
import requestSlice from "./reducers/requestSlice";
import saveDataSlice from "./reducers/saveDataSlice";
import visibilitySlice from "./reducers/visibilitySlice";

const reducer = combineReducers({
    stateSlice,
    requestSlice,
    saveDataSlice,
    visibilitySlice
});
export const store = configureStore({
    reducer,
});
