import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phoneNumber: {phone_number: ''},
    otpCodeValid: false,
    loginData: {code: '', phone_number: ""},
    passportVerifyData: {
        email: '',
        fio: '',
        photo1: {
            base64: '',
            type: '',
            orig_name: ""
        },
        photo2: {
            base64: '',
            type: '',
            orig_name: ""
        },
        photo3: {
            base64: '',
            type: '',
            orig_name: ""
        },
        codeid: ''
    },
    registrationModalVisible: false
};

const stateSlice = createSlice({
    name: "stateSlice",
    initialState,
    reducers: {
        changePhoneNumber: (state, action) => {
            state.phoneNumber = action.payload;
        },

        clearPhone: (state, action) => {
            state.phoneNumber = {phone_number: ''};
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
            state.passportVerifyData = {
                email: '',
                fio: '',
                photo1: {
                    base64: '',
                    type: '',
                    orig_name: ""
                },
                photo2: {
                    base64: '',
                    type: '',
                    orig_name: ""
                },
                photo3: {
                    base64: '',
                    type: '',
                    orig_name: ""
                },
                codeid: ''
            }
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
