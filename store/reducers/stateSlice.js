import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLogin: { login: "", otpCode: "" },
};

const stateSlice = createSlice({
    name: "stateSlice",
    initialState,
    reducers: {
        changeDataLogin: (state, action) => {
            state.dataLogin = action.payload;
        },
        clearLogin: (state) => {
            state.dataLogin = { login: "", otpCode: "" };
        },
    }
});

export const {
    changeDataLogin, clearLogin,
} = stateSlice.actions;

export default stateSlice.reducer;
