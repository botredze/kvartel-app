import { API } from "../../env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    changeAwaitedCode, changeBookingModal,
    changeFavorites,
    changeRegistrationModalVisible,
    changeShowSuccessBookingModal
} from "./stateSlice";
import {changeLocalData} from "./saveDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getLocalDataUser} from "../../helpers/returnDataUser";
import {Alert} from "react-native";


const initialState  = {
    listApartments: [
        {
            dolgota: '',
            favourite: false,
            shirota: "",
            codeid: '',
            apartament_name: '',

        }
    ],

    favoritesList: [
        {
            dolgota: '',
            favourite: false,
            shirota: "",
            codeid: '',
            apartament_name: '',

        }
    ],

    filtredApartaments: [
        {
        dolgota: '',
            favourite: false,
        shirota: "",
        codeid: '',
        apartament_name: '',
    }],
    preloader: false,
    bottomSheetPreloader: false,
    session: null,
    apartmentDetail: {
        conversions: [],
        photos: [{pathUrl: ''}],
        othersHere: [],
        rules: [],
        floor: "88",                                                     //этаж
        num_rooms: "88",                                                 //количество комнат
        num_bathroom: "88",                                              //количество ванныч
        num_guests: "88",                                                //количество спальных мест
        max_guest: "",
    },

    search: {
        codeid_client: 0,
        address: ''
    }
}

export const getApartments = createAsyncThunk(
    "getApartments",
    async function ( status,{ dispatch,rejectWithValue }) {
        try {
            const response = await axios({
                method: "POST",
                url: `${API}/get_apartments`,
                data: status
            });

            if (response.status >= 200 && response.status < 300) {
                const newData = response?.data
                const filteredApartments = newData?.filter(item => item?.favourite !== true);
                dispatch(changeFavorites(filteredApartments));
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
                url: `${API}/get_details?codeid_apartment=${codeid}`,
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data[0];
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
        const  {phoneNumber, navigation, expoPushToken} = props
        console.log(phoneNumber, 'phoneNumber')
        const reqdata = {
            ...phoneNumber,
            expoPushToken: expoPushToken
        }
        console.log(reqdata, 'reqdata')
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/login_ver`,
                data: reqdata
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
            console.log(error, 'error')
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
                    await AsyncStorage.setItem("userId", codeid);
                    await AsyncStorage.setItem("fio", fio);
                    await AsyncStorage.setItem("verificated", 'true');
                    await AsyncStorage.setItem("rejectRegistration", "false");
                    await navigation.replace('HomePage');
                    await getLocalDataUser({ changeLocalData, dispatch });
                }else if (result == 1) {
                    await AsyncStorage.setItem("verificated", "false");
                    await AsyncStorage.setItem("rejectRegistration", "false");
                    await AsyncStorage.setItem("userId", codeid);
                    await navigation.replace('UserSettingScreen');
                    await getLocalDataUser({ changeLocalData, dispatch });
                }else if(result == 3) {
                    dispatch(login_ver({phoneNumber: loginData}))
                    Alert.alert('Ваш код устарел, мы отправили вам код еще раз, пожалуйста дождитесь и введите код еще раз')
                }else if (result == 4) {
                    Alert.alert('Номер телефона не верный, пожалуйста проверьте номер и попробуйте еще раз')
                }
                dispatch(checkUserVerify({codeid: codeid}))
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
                url: `${API}/get_apartments_filters`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                return response?.data.recordset;
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
            console.log(data)
            const response = await axios({
                method: 'POST',
                url: `${API}/booking`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                dispatch(changeBookingModal(false))
                dispatch(changeShowSuccessBookingModal(true))
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

export const userFavoritesApartments = createAsyncThunk("userFavoritesApartments",
    async function(data, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'GET',
                url: `${API}/favorites`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                //dispatch(updateListApartmentsAndDetail());
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })

export const addOrDeleteFavorites = createAsyncThunk('addOrDeleteFavorites' ,
    async function(data, {dispatch, rejectWithValue}){
        try {
            console.log(data)
            const {action, userId, apartamentId} = data
            const response = await axios({
                method: 'POST',
                url: `${API}/addFavoritesList`,
                data: {status: action, userId: userId, apartamentId: apartamentId}
            })
            if (response.status >= 200 && response.status < 300) {
                dispatch(getApartments({status: 1, codeid_client: userId}))
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


export const checkUserVerify = createAsyncThunk('checkUserVerify',
    async function(data, {dispatch, rejectWithValue}){
        try {
            console.log(data, 'verify-data-check')
            const response = await axios({
                method: 'POST',
                url: `${API}/passport_check`,
                data
            })

            console.log(response?.data, 'status')
            if (response.status >= 200 && response.status < 300) {
                const {status, codeid, fio} = response?.data
                if(status == 0) {
                    await AsyncStorage.setItem("rejectRegistration", 'true');
                    await AsyncStorage.setItem("verificated", 'false');
                }else if (status == 1) {
                    await AsyncStorage.setItem("verificated", 'true');
                    await AsyncStorage.setItem("userId", codeid);
                    await AsyncStorage.setItem("fio", fio)
                }else if (status ==2) {
                    await AsyncStorage.setItem("verificated", 'false');
                }
                await getLocalDataUser({ changeLocalData, dispatch });
                return response?.data;
            } else {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return rejectWithValue(error.message)
        }
    })


export const searchByAddress = createAsyncThunk('searchByAddress', async function(data, {rejectWithValue, dispatch}){
    try {
        console.log('ХУХЙХЙХУХХЙХУ')
        console.log(data, 'хуйхуйdata')
        const response = await axios({
            method: 'POST',
            url: `${API}/address_search`,
            data
        })
        console.log(response.data,  'ХУЙХЙХУХЙХУЙ', response.status)
        if (response.status >= 200 && response.status < 300) {
            return response?.data;
        } else {
            throw Error(`Error: ${response.status}`);
        }

    }catch (error) {
       return  rejectWithValue(error.message)
    }
} )

export const applyPayment = createAsyncThunk('applyPayment', async function(data, {rejectWithValue}) {
    try {
        const response = await axios.post({
            method: 'POST',
            url: `${API}/applyPayment`,
            data
        })
    }catch (error){
        return  rejectWithValue(error.message)
    }
})

const requestSlice = createSlice({
    name: "requestSlice",
    initialState,

    reducers: {
        checkFavorites: (state, action) => {
            state.loginData = action.payload
        },
        updateListApartmentsAndDetail: (state) => {
            const favoritesCodeIds = state.favoritesList.map(fav => fav.codeid);
            state.listApartments = state.listApartments.map(apartment => ({
                ...apartment,
                favorites: favoritesCodeIds.includes(apartment.codeid)
            }));

            state.apartmentDetail = {
                ...state.apartmentDetail,
                favorites: favoritesCodeIds.includes(state.apartmentDetail.codeid)
            };
        },

        changeSearchData: (state, action) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        ///// getApartaments
        builder.addCase(getApartments.fulfilled, (state, action) => {
            state.preloader = false;
           state.listApartments = action.payload;
        });
        builder.addCase(getApartments.rejected, (state, action) => {
            state.error = action.payload;
             state.preloader = false;
        });
        builder.addCase(getApartments.pending, (state, action) => {
            state.preloader = false;
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
            state.bottomSheetPreloader = false;
            state.apartmentDetail = action.payload;
        });
        builder.addCase(getApartamentDetails.rejected, (state, action) => {
            state.error = action.payload;
            state.bottomSheetPreloader = false;
        });
        builder.addCase(getApartamentDetails.pending, (state, action) => {
            state.bottomSheetPreloader = true;
        });

        //userFavoritesApartments
        builder.addCase(userFavoritesApartments.fulfilled, (state, action) => {
            state.bottomSheetPreloader = false;
            state.favoritesList = action.payload;
        });
        builder.addCase(userFavoritesApartments.rejected, (state, action) => {
            state.error = action.payload;
            state.bottomSheetPreloader = false;
        });
        builder.addCase(userFavoritesApartments.pending, (state, action) => {
            state.bottomSheetPreloader = true;
        });

        //apartamentFilters
        builder.addCase(apartamentFilters.fulfilled, (state, action) => {
            state.bottomSheetPreloader = false;
            state.filtredApartaments = action.payload;
        });
        builder.addCase(apartamentFilters.rejected, (state, action) => {
            state.error = action.payload;
            state.bottomSheetPreloader = false;
        });
        builder.addCase(apartamentFilters.pending, (state, action) => {
            state.bottomSheetPreloader = true;
        });

        //searchByAddress
        builder.addCase(searchByAddress.fulfilled, (state, action) => {
            state.bottomSheetPreloader = false;
            state.listApartments = action.payload;
        });
        builder.addCase(searchByAddress.rejected, (state, action) => {
            state.error = action.payload;
            state.bottomSheetPreloader = false;
        });
        builder.addCase(searchByAddress.pending, (state, action) => {
            state.bottomSheetPreloader = true;
        });

    },
});

export const {updateListApartmentsAndDetail, changeSearchData} = requestSlice.actions;


export default requestSlice.reducer;

