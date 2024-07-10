import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phoneNumber: {phone: ''},
    otpCodeValid: false,
    loginData: {code: '', phone: ""},
    passportVerifyData: {
        email: '',
        firstName: "",
        lastName: "",
        middleName: "",
    },
    registrationModalVisible: "false"
};

const stateSlice = createSlice({
    name: "stateSlice",
    initialState,
    reducers: {
        changePhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },

        clearPhone: (state, action) => {
            state.phoneNumber = {phone: ''};
        },
        changeAwaitedCode: (state, action) => {
            state.loginData = action.payload
        },

        clearAwaitedCode: (state, action) => {
            state.loginData = {}
        },

        changePassportVerifyData: (state, action) => {
            state.passportVerifyData = action.payload
        },

        clearPassportVerifyData: (state, action) => {
            state.passportVerifyData = {email: '', firstName: "", lastName: "", middleName: "",}
        },

        changeRegistrationModalVisible: (state, action) => {
            state.registrationModalVisible = action.payload
        }
    }
});

export const {
    changePhoneNumber,
    clearPhone,
    changeAwaitedCode,
    clearAwaitedCode,
    changePassportVerifyData,
    clearPassportVerifyData,
    changeRegistrationModalVisible
} = stateSlice.actions;

export default stateSlice.reducer;
