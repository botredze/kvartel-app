import { API } from "../../env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {changeAwaitedCode, changeRegistrationModalVisible} from "./stateSlice";
import {changeLocalData} from "./saveDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getLocalDataUser} from "../../helpers/returnDataUser";


const initialState  = {
    listApartaments: [],
    preloader: false,
    session: null,
}

export const getApartaments = createAsyncThunk(
    "getApartaments",
    async function ({rejectWithValue }) {
        try {
            const response = await axios({
                method: "POST",
                url: `${API}/getApartaments`,
            });
            if (response.status >= 200 && response.status < 300) {
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const passportVerification = createAsyncThunk("passportVerification",
    async function(formData,{dispatch, rejectWithValue}) {
    try {
        console.log(formData)
        // const response = await axios({
        //     method: 'POST',
        //     url: `${API}/passport_verfication`,
        //     formData
        // })
        // if (response.status >= 200 && response.status < 300) {
             dispatch(changeRegistrationModalVisible(true));
        //     return response?.data;
        // } else {
        //     throw Error(`Error: ${response.status}`);
        // }
    }catch (error){
        return rejectWithValue(error.message)
    }
})

export const getApartamentDetails = createAsyncThunk("getApartamentDetails",
    async function(codeid, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'GET',
                url: `${API}/getDetails/${codeid}`,
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const login = createAsyncThunk(
    "login",
    async function(props, {dispatch, rejectWithValue}){
        const  {phoneNumber, navigation} = props
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/login`,
                data: phoneNumber
            })
            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data)
                // const {userId, code} = response?.data
                // if(code && userId) {
                    // dispatch(changeAwaitedCode({code: code, phone: phoneNumber}))
                    dispatch(changeAwaitedCode({code: '556464', phone: phoneNumber.phone}))
                    await navigation.navigate('OTP')
                // }
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const verifyOtpCode = createAsyncThunk("verifyOtpCode",
    async function(props, {dispatch, rejectWithValue}){
        console.log(props)
        const {navigation, loginData, data} = props

        try {
            console.log(loginData)
            // const response = await axios({
            //     method: 'POST',
            //     url: `${API}/verifyOtpCode`,
            //     data: loginData
            // })
            // if (response.status >= 200 && response.status < 300) {
            //     const {fio, name, userId } = response?.data
            //     await AsyncStorage.setItem("userId", userId);
            //     await AsyncStorage.setItem("fio", fio);
            //     await AsyncStorage.setItem("name", name);
            //     await getLocalDataUser({ changeLocalData, dispatch });
            //     return response?.data;
            //}  else if (response.status == 401) {
                navigation.navigate('UserSettingScreen');
            // }else {
            //     throw Error(`Error: ${response.status}`);
            // }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const apartamentFilters = createAsyncThunk("apartamentFilters",
    async function(data, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/apartamentFilters`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })


export const createBooking = createAsyncThunk("createBooking",
    async function(data, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/createBooking`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })


export const userBookingList = createAsyncThunk("userBookingList",
    async function(data, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/bookList`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const userFavoritesApartaments = createAsyncThunk("userFavoritesApartaments",
    async function(data, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'GET',
                url: `${API}/favorites`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const getUserCardData = createAsyncThunk("getUserCardData",
    async function(data, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'GET',
                url: `${API}/getPaymentMethods`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })


const requestSlice = createSlice({
    name: "requestSlice",
    initialState,
    extraReducers: (builder) => {

        ///// getApartaments
        builder.addCase(getApartaments.fulfilled, (state, action) => {
            // state.preloader = false;
           // state.balance = action.payload;
        });
        builder.addCase(getApartaments.rejected, (state, action) => {
            state.error = action.payload;
            // state.preloader = false;
        });
        builder.addCase(getApartaments.pending, (state, action) => {
            // state.preloader = true;
        });


        /////passportVerification
        builder.addCase(passportVerification.fulfilled, (state, action) => {
            // state.preloader = false;
            // state.balance = action.payload;
        });
        builder.addCase(passportVerification.rejected, (state, action) => {
           // state.error = action.payload;
            // state.preloader = false;
        });
        builder.addCase(passportVerification.pending, (state, action) => {
            // state.preloader = true;
        });

        //getApartamentDetails
        builder.addCase(getApartamentDetails.fulfilled, (state, action) => {
            // state.preloader = false;
            // state.balance = action.payload;
        });
        builder.addCase(getApartamentDetails.rejected, (state, action) => {
            // state.error = action.payload;
            // state.preloader = false;
        });
        builder.addCase(getApartamentDetails.pending, (state, action) => {
            // state.preloader = true;
        });

    },
});

export const {
} = requestSlice.actions;

export default requestSlice.reducer;

