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
    registrationModalVisible: false,
    isOpen: false,
    selectedDates: {
        startDate: null,
        endDate: null,
        displayedDate: null,
    },
    disabledDates: [],

    selectedItems:[],
    selectedRooms:[],
    favoritesList: [
        {
            dolgota: '',
            shirota: "",
            codeid: '',
            apartament_name: '',

        }
    ],

    filters: {
        status: 1,
        date_from: 0,
        date_to: 0,
        roomsCount: [],
        convensions: [],
        bookingType: 0,
        priceMin: 0,
        priceMax: 0,
        max_guest: 0,
        num_bathroom: 0,
        num_guests: 0
    }
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
        },

        changeDatesSelected: (state, action) =>{
            state.selectedDates = action.payload
        },

        changeOpenDateRange: (state, action)=> {
            state.isOpen = action.payload
        },

        changeDisabledDates: (state, action) => {
            state.disabledDates = action.payload
        },

        changeFilters: (state, action) => {
            state.filters = action.payload
        },

        changeSelectedItems: (state, action) => {
            state.selectedItems = action.payload
        },

        changeSelectedRooms: (state, action) => {
            state.selectedRooms = action.payload
        },

        changeFavorites: (state, action) => {
            state.favoritesList = action.payload
        },

        clearFilters: (state, action) => {
            state.filters = {
                status: 1,
                date_from: 0,
                date_to: 0,
                roomsCount: [],
                convensions: [],
                bookingType: 0,
                priceMin: 0,
                priceMax: 0,
                max_guest: 0,
                num_bathroom: 0,
                num_guests: 0
            }
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
    changeRegistrationModalVisible,
    changeDatesSelected,
    changeOpenDateRange,
    changeDisabledDates,
    changeFilters,
    clearFilters,
    changeSelectedItems,
    changeSelectedRooms,
    changeFavorites
} = stateSlice.actions;

export default stateSlice.reducer;
