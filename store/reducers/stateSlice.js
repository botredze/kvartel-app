import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLogin: { login: "", password: "" },

};

const stateSlice = createSlice({
    name: "stateSlice",
    initialState,
    reducers: {
        changeDataLogin: (state, action) => {
            state.dataLogin = action.payload;
        },
        clearLogin: (state) => {
            state.dataLogin = { login: "", password: "" };
        },
    }
});

export const {
    changeDataLogin, clearLogin,
} = stateSlice.actions;

export default stateSlice.reducer;
