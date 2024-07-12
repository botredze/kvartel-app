import { API } from "../../env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {changeAwaitedCode, changeRegistrationModalVisible} from "./stateSlice";
import {changeLocalData} from "./saveDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getLocalDataUser} from "../../helpers/returnDataUser";
import {Alert} from "react-native";


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
        const response = await axios({
            method: 'POST',
            url: `${API}/passport_verfication`,
            data: formData
        })
        console.log(response.status, 'response.status')
        console.log(response.data, ' response.data')
        if (response.status >= 200 && response.status < 300) {
            if(response?.data.status == 0) {
                dispatch(changeRegistrationModalVisible(true));
            }else {
                Alert.alert('При попытке сделать запрос произошла ошибка, попробуйте чуть позже')
            }
        } else {
            throw Error(`Error: ${response.status}`);
        }
    }catch (error){
        console.log(error)
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

export const login_ver = createAsyncThunk(
    "login_ver",
    async function(props, {dispatch, rejectWithValue}){
        const  {phoneNumber, navigation} = props
        console.log(phoneNumber, 'phoneNumber')
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/login_ver`,
                data: phoneNumber
            })
            if (response.status >= 200 && response.status < 300) {
                const {code} = response?.data
                if(code) {
                    console.log(code)
                    dispatch(changeAwaitedCode({code: code, phone_number: phoneNumber?.phone_number}))
                    if (navigation) {
                        await navigation.navigate('OTP')
                    }
                 }
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
            const response = await axios({
                method: 'POST',
                url: `${API}/confirm_reg`,
                data: loginData
            })
            if (response.status >= 200 && response.status < 300) {
                const {result, codeid, fio} = response?.data

                console.log(codeid, fio)
                if(result == 0) {
                    await navigation.navigate('HomePage');
                    await AsyncStorage.setItem("userId", codeid);
                    await AsyncStorage.setItem("fio", fio);
                    await getLocalDataUser({ changeLocalData, dispatch });
                }else if (result == 1) {
                    await AsyncStorage.setItem("userId", codeid);
                    await navigation.navigate('UserSettingScreen');
                    await getLocalDataUser({ changeLocalData, dispatch });
                }else if(result == 3) {
                    dispatch(login_ver({phoneNumber: loginData}))
                    Alert.alert('Ваш код устарел, мы отправили вам код еще раз, пожалуйста дождитесь и введите код еще раз')
                }else if (result == 4) {
                    Alert.alert('Номер телефона не верный, пожалуйста проверьте номер и попробуйте еще раз')
                }
            }else {
                throw Error(`Error: ${response.status}`);
            }
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

