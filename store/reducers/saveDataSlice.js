import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: { userId: "", fio: "", verificated: true, rejectRegistration: false, email: '', phoneNumber: '' },
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
                verificated: false,
                rejectRegistration: false,
                email: '',
                phoneNumber: ''
            };
        },
    },
});

export const { changeLocalData, clearLocalData } = saveDataSlice.actions;

export default saveDataSlice.reducer;
