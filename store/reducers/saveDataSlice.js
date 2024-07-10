import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: { userId: "", name: "", fio: "" },
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
                name: "",
                fio: "",
            };
        },
    },
});

export const { changeLocalData, clearLocalData } = saveDataSlice.actions;

export default saveDataSlice.reducer;
