import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: { userId: "", fio: "" },
};

const saveDataSlice = createSlice({
    name: "saveDataSlice",
    initialState,
    reducers: {
        changeLocalData: (state, action) => {
            state.data = action.payload;
        },
        clearLocalData: (state, action) => {
            state.data = {
                userId: "",
                fio: "",
            };
        },
    },
});

export const { changeLocalData, clearLocalData } = saveDataSlice.actions;

export default saveDataSlice.reducer;
