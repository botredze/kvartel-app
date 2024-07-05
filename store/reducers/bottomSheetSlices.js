import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLogin: { login: "", password: "" },
};

const bottomSheetSlices = createSlice({
    name: "bottomSheetSlices",
    initialState,
    reducers: {
        changeDataLogin: (state, action) => {
            state.dataLogin = action.payload;
        },
    }
});

export const {
    changeDataLogin, clearLogin,
} = bottomSheetSlices.actions;

export default bottomSheetSlices.reducer;
