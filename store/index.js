import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stateSlice from "./reducers/stateSlice";
import bottomSheetSlices from "./reducers/bottomSheetSlices";

const reducer = combineReducers({
    stateSlice,
    bottomSheetSlices
});
export const store = configureStore({
    reducer,
});
