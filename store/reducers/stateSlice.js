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
    },

    bookingData: {
        date_from: 0,
        days_amount: 0,
        codeid_client: 0,
        codeid_apartment:0,
        name: '',
        summ: 0
    },

    paymentData: {
        pg_amount: 0,
        pg_description: '',
        pg_user_phone: '',
        pg_user_contact_email: '',
        pg_user_id: ''
    },

    expoPushToken: "",
    showBookingModal: false,
    showSuccessBookingModal: false,

    paymentStatusData: {
        pg_payment_id: "",
        pg_order_id: ''
    },

    paymentStatus: false
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
        },
        changeBookingData: (state, action)=> {
            state.bookingData = action.payload
        },
        clearBookingData: (state, action) => {
            state.bookingData = {
                    date_from: 0,
                    days_amount: 0,
                    codeid_client: 0,
                    codeid_apartment:0,
                    name: '',
                summ: 0
                }
        },
        changeBookingModal: (state, action) => {
            state.showBookingModal = action.payload
        },

        changeShowSuccessBookingModal: (state, action) => {
            state.showSuccessBookingModal = action.payload
        },

        changeExpoPushToken: (state, action) => {
            state.expoPushToken = action.payload
        },

        clearExpoPushToken: (state, action) => {
            state.expoPushToken = ''
        },

        changePaymentData: (state, action) => {
            state.paymentData = action.payload
        },

        clearPaymentData: (state, action) => {
            state.paymentData = {
                pg_amount: 0,
                pg_description: '',
                pg_user_phone: '',
                pg_user_contact_email: '',
                pg_user_id: ''
            }
        },

        changePaymentStatusData: (state, action) => {
            state.paymentStatusData = action.payload
        },

        clearPaymentStatusData: (state, action) => {
            state.paymentStatusData = {
                pg_payment_id: "",
                pg_order_id: ''
            }
        },
        changePaymentStatus: (state, action) => {
            state.paymentStatus = action.payload
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
    changeFavorites,
    changeBookingData,
    clearBookingData,
    changeBookingModal,
    changeShowSuccessBookingModal,
    changeExpoPushToken,
    clearExpoPushToken,
    changePaymentData,
    clearPaymentData,
    changePaymentStatusData,
    clearPaymentStatusData,
    changePaymentStatus
} = stateSlice.actions;

export default stateSlice.reducer;
