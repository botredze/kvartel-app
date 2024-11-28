import { API } from "../../env";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    changeAwaitedCode, changeBookingData, changeBookingModal,
    changeFavorites, changePaymentStatus, changePaymentStatusData,
    changeRegistrationModalVisible, changeRejectComment,
    changeShowSuccessBookingModal, clearBookingData, clearExtendBookingData, clearFavorites, clearPaymentStatusData,
    clearSelectedBookingData
} from "./stateSlice";
import {changeLocalData, clearLocalData} from "./saveDataSlice";
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

    myBookingList: [
        
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
    otherPreloader: false,

    session: null,
    apartmentDetail: {
        conversions: [],
        photos: [{pathUrl: ''}],
        othersHere: [],
        rules: [],
        date_from: "",
        date_to: "",
        floor: "88",                                                     //этаж
        num_rooms: "88",                                                 //количество комнат
        num_bathroom: "88",                                              //количество ванныч
        num_guests: "88",                                                //количество спальных мест
        max_guest: "",
    },

    search: {
        codeid_client: 0,
        address: ''
    },
    paymentFinished: false,
    // {
    //     date_to: '',
    //     date_from: "",
    //     days: '',
    //     address: '',
    //     fio: '',
    //     apartament_name: '',
    //     code_lock: "",
    //     status: '',
    // }
    activeBooking: [],
    bookHistory: [
        {
            dolgota: '',
            favourite: false,
            shirota: "",
            codeid: '',
            apartament_name: '',

        }
    ],
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
                const filteredApartments = newData?.filter(item => item?.favourite == 'true');
                if(filteredApartments.length > 0){
                dispatch(changeFavorites(filteredApartments));
                    }else {
                    dispatch(clearFavorites())
                }
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
        const  {phoneNumber, navigation} = props
        const reqdata = {
            ...phoneNumber,
        }
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/login_ver`,
                data: reqdata
            })
            if (response.status >= 200 && response.status < 300) {
                const {code} = response?.data
                if(code) {
                    dispatch(changeAwaitedCode({code: code, phone_number: phoneNumber?.phone_number}))
                    if (navigation) {
                        await navigation.replace('OTP')
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
        async function (props, { dispatch, rejectWithValue }) {
            const { navigation, loginData, data, expoPushToken } = props;
    
            try {
                const response = await axios({
                    method: 'POST',
                    url: `${API}/confirm_reg`,
                    data: {
                        ...loginData,
                        expoPushToken
                    }
                });
    
                if (response.status >= 200 && response.status < 300) {
                    const { result, codeid, fio, phone, email } = response?.data;
    
                    if (result == 0) {
                        dispatch(checkUserVerify({codeid: codeid}));
                        await AsyncStorage.setItem("userId", codeid);
                        await AsyncStorage.setItem("fio", fio);
                        await AsyncStorage.setItem('phone', phone)
                        await AsyncStorage.setItem('email', email)
                        await getLocalDataUser({ changeLocalData, dispatch });
                        await navigation.replace('HomePage');
                    } else if (result == 1) {
                        await AsyncStorage.multiSet([
                            ["verificated", "false"],
                            ["rejectRegistration", "false"],
                            ["userId", codeid],
                        ]);
                        await getLocalDataUser({ changeLocalData, dispatch });
                        navigation.replace('UserSettingScreen');
                    } else if (result === 3) {
                        // Код устарел
                        dispatch(login_ver({ phoneNumber: loginData, expoPushToken }));
                        Alert.alert(
                            'Ваш код устарел',
                            'Мы отправили вам код еще раз, пожалуйста дождитесь и введите код еще раз'
                        );
                    } else if (result === 4) {
                        // Неверный номер телефона
                        Alert.alert(
                            'Неверный номер',
                            'Пожалуйста, проверьте номер и попробуйте ещё раз'
                        );
                    }
                    dispatch(checkUserVerify({ codeid }));
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
    );
    

export const apartamentFilters = createAsyncThunk("apartamentFilters",
    async function(data, {dispatch, rejectWithValue}){
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/get_apartments_filters`,
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
                url: `${API}/booking`,
                data
            })
            if (response.status >= 200 && response.status < 300) {
                dispatch(changeBookingModal(false))
                dispatch(changeShowSuccessBookingModal(true))
                dispatch(getMyActiveBooking({codeid: codeid_client}))
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
            const {action, userId, apartamentId} = data
            const response = await axios({
                method: 'POST',
                url: `${API}/addFavoritesList`,
                data: {status: action, codeid_client: userId, codeid_apartment: apartamentId}
            })
            if (response.status >= 200 && response.status < 300) {
                dispatch(getApartments({status: 0, codeid_client: userId}))
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
            const response = await axios({
                method: 'POST',
                url: `${API}/passport_check`,
                data: {codeid: data.codeid}
            })

            if (response.status >= 200 && response.status < 300) {

                const {status, codeid, fio, phone, email, comment} = response?.data
                if(status == 0) {
                    dispatch(changeRejectComment(comment))
                    await AsyncStorage.setItem("rejectRegistration", 'true');
                    await AsyncStorage.setItem("verificated", 'false');
                }else if (status == 1) {
                    await AsyncStorage.setItem("verificated", 'true');
                    await AsyncStorage.setItem("userId", codeid);
                    await AsyncStorage.setItem("fio", fio)
                    await AsyncStorage.setItem('phone', phone)
                    await AsyncStorage.setItem('email', email)
                }else if (status ==2) {
                    await AsyncStorage.setItem("verificated", 'false');
                    await AsyncStorage.setItem("rejectRegistration", 'false');
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
        const response = await axios({
            method: 'POST',
            url: `${API}/address_search`,
            data
        })
        if (response.status >= 200 && response.status < 300) {
            return response?.data;
        } else {
            throw Error(`Error: ${response.status}`);
        }

    }catch (error) {
       return  rejectWithValue(error.message)
    }
} )

export const applyPayment = createAsyncThunk('applyPayment', async function(props, {rejectWithValue, dispatch}) {
   const {navigation, paymentData} = props
    try {
        const response = await axios({
            method: 'POST',
            url: `${API}/create-payment`,
            data: {...paymentData}
        })

        if(response.status === 200){
          await navigation.navigate('AddCardWebView', {url: response.data?.data?.response?.pg_redirect_url[0], state: "booting"})
            dispatch(changePaymentStatusData({
                pg_payment_id: response.data?.data?.response?.pg_payment_id[0],
                pg_order_id: response.data?.pg_order_id
            }))
            dispatch(changeBookingModal(false))
        }
    }catch (error){
        return  rejectWithValue(error.message)
    }
})

export const applyExtendPayment = createAsyncThunk('applyExtendPayment', async function(props, {rejectWithValue, dispatch}) {
    const {navigation, paymentData} = props
    try {
        const response = await axios({
            method: 'POST',
            url: `${API}/create-payment`,
            data: {...paymentData}
        })

        if(response.status === 200){
            await navigation.navigate('AddCardWebView', {url: response.data?.data?.response?.pg_redirect_url[0], state: 'extend'})
            dispatch(changePaymentStatusData({
                pg_payment_id: response.data?.data?.response?.pg_payment_id[0],
                pg_order_id: response.data?.pg_order_id
            }))
        }
    }catch (error){
        return  rejectWithValue(error.message)
    }
})

export const checkExtendPaymentStatus = createAsyncThunk('checkExtendPaymentStatus', async function(props, {rejectWithValue, dispatch}) {
    try {

        const {pg_payment_id, pg_order_id, extendData} = props

        const response = await axios({
            method: 'POST',
            url: `${API}/get-payment_result`,
            data: {
                pg_order_id,
                pg_payment_id
            }
        })

        if (response.status >= 200 && response.status < 300) {

            if(response.data.data.response.pg_status[0] == 'ok' && response.data.data.response.pg_payment_status[0] == 'success') {
                dispatch(changePaymentStatus(true))
                dispatch(clearPaymentStatusData())
                dispatch(extendBooking({...extendData, dispatch}))
                dispatch(changePaymentFinished(true))
                dispatch(clearExtendBookingData())
            }else{
                throw Error(`Платеж еще не завершен`);
            }
        }else {
            throw Error(`Error: ${response.status}`);
        }
    }catch (error) {
        console.log(error, 'error')
        return  rejectWithValue(error.message)
    }
})

export const loginByToken = createAsyncThunk('loginByToken', async function(props, {rejectWithValue,dispatch}) {
    try {
        const {navigation, expoPushToken} = props
        const response = await axios({
            method: 'POST',
            url: `${API}/register_by_token`,
            data: {
                token: expoPushToken
            }
        })

        if (response.status >= 200 && response.status < 300) {
            const {codeid, fio, phone, email} = response.data
            await navigation.replace('HomePage')
            await AsyncStorage.setItem("userId", codeid);
            await AsyncStorage.setItem("fio", fio);
            await AsyncStorage.setItem('phone', phone)
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem("verificated", 'true');
            await AsyncStorage.setItem("rejectRegistration", "false");
            await getLocalDataUser({ changeLocalData, dispatch });
        }else {
            dispatch(clearLocalData())
        }

    }catch (error){
        console.log(error, 'errorРГГВГРАОШВ')
        return  rejectWithValue(error.message)
    }
})

export const logoutUser = createAsyncThunk('logoutUser', async function(props, {rejectWithValue,dispatch}) {
    try {
        const {codeid} = props
        const response = await axios({
            method: 'POST',
            url: `${API}/logout_app`,
            data: {
                userId: codeid
            }
        })

        if (response.status >= 200 && response.status < 300) {
            await AsyncStorage.setItem("userId", '');
            await AsyncStorage.setItem("fio", '');
            await AsyncStorage.setItem('phone', '')
            await AsyncStorage.setItem('email', '')
            await AsyncStorage.setItem("verificated", 'false');
            await AsyncStorage.setItem("rejectRegistration", "false");
            dispatch(clearLocalData())
        }else {
            throw Error(`Error: ${response.status}`);
        }

    }catch (error){
        console.log(error, 'error sdfsdf')
        return  rejectWithValue(error.message)
    }
})

export const checkPaymentStatus = createAsyncThunk('checkPaymentStatus', async function(props, {rejectWithValue, dispatch}) {
    try {

        const {pg_payment_id, pg_order_id, bookingData} = props

        const response = await axios({
            method: 'POST',
            url: `${API}/get-payment_result`,
            data: {
                pg_order_id,
                pg_payment_id
            }
        })

        if (response.status >= 200 && response.status < 300) {

            if(response.data.data.response.pg_status[0] == 'ok' && response.data.data.response.pg_payment_status[0] == 'success') {
                dispatch(changePaymentStatus(true))
                dispatch(clearPaymentStatusData())
                dispatch(createBooking({...bookingData}))
                dispatch(changePaymentFinished(true))
                dispatch(clearBookingData())
            }else{
                throw Error(`Платеж еще не завершен`);
            }
        }else {
            throw Error(`Error: ${response.status}`);
        }
    }catch (error) {
        console.log(error, 'error')
        return  rejectWithValue(error.message)
    }
})

export const saveMyCard = createAsyncThunk(
    'saveMyCard', async function(props, {rejectWithValue, dispatch}) {
        try {
            const {} = props
            const response = await axios({
                method: 'POST',
                url: `${API}/get-payment_result`,
                data: {
                }
            })
            if (response.status >= 200 && response.status < 300) {

            }else  {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return  rejectWithValue(error.message)
        }
    }
)

export const getMyCardList = createAsyncThunk('getMyCardList', async  function(props, {rejectWithValue, dispatch}) {
    try {
        const {} = props
        const response = await axios({
            method: 'POST',
            url: `${API}/register_by_token`,
            data: {
            }
        })
        if (response.status >= 200 && response.status < 300) {

        }else  {
            throw Error(`Error: ${response.status}`);
        }
    }catch (error){
        return  rejectWithValue(error.message)
    }
})

export const getMyBookingHistory = createAsyncThunk('getMyBookingHistory', async  function(props, {rejectWithValue, dispatch}) {
    try {
        const {codeid} = props
        const response = await axios({
            method: 'POST',
            url: `${API}/get_history`,
           // data: {codeid_user: codeid}
            data: {codeid_user: codeid}
        })
        if (response.status >= 200 && response.status < 300) {
            if(response?.data.length> 0) {
            return  response?.data
            }else {
                return [
                    {
                        dolgota: '',
                        favourite: false,
                        shirota: "",
                        codeid: '',
                        apartament_name: '',

                    }
                ]
            }
        }else  {
            throw Error(`Error: ${response.status}`);
        }
    }catch (error){
        return  rejectWithValue(error.message)
    }
})

export const getMyActiveBooking = createAsyncThunk('getMyActiveBooking', async  function(props, {rejectWithValue, dispatch}) {
    try {
        const { codeid } = props
        const response = await axios({
            method: 'POST',
            url: `${API}/booking_info`,
            data: {codeid_client: codeid}
        })
        if (response.status >= 200 && response.status < 300) {
            return response?.data;
        }else  {
            throw Error(`Error: ${response.status}`);
        }
    }catch (error){
        return  rejectWithValue(error.message)
    }
})


export const finishBooking = createAsyncThunk(
    'finishBooking',
    async function (props, { rejectWithValue, dispatch }) {
      try {
        const { codeid_client, codeid_apartment } = props;
  
        const response = await axios({
          method: 'POST',
          url: `${API}/end_booking`,
          data: { codeid_apartment, codeid_client },
        });
  
        if (response.status >= 200 && response.status < 300) {
          Alert.alert(
            "Успешно",
            "Аренда успешно завершена!",
            [
              {
                text: "OK",
                onPress: () => {
                  dispatch(getMyActiveBooking({ codeid: codeid_client }));
                  dispatch(clearSelectedBookingData());
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          throw Error(`Error: ${response.status}`);
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const infoNextBooking = createAsyncThunk(
    'infoNextBooking', async function(props, {rejectWithValue, dispatch}) {
        try {
            const {codeid_apartment, date_from, days_amount, setCounts} = props
            const response = await axios({
                method: 'POST',
                url: `${API}/info_next_booking`,
                data: {codeid_apartment, date_from, days_amount}
            })
            if (response.status >= 200 && response.status < 300) {
                const {data} = response

                if(data.status == 2){
                    Alert.alert(
                        'Ошибка',
                        'Квартира уже забронирована на эти даты !',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ]
                    );
                    setCounts(days_amount -1)
                }
            }else  {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return  rejectWithValue(error.message)
        }
    }
)

export const extendBooking = createAsyncThunk(
    'extendBooking', async function(props, {rejectWithValue, dispatch}) {
        try {
            const {codeid_apartment, date_from, days_amount, codeid_client, dispatch} = props
            const response = await axios({
                method: 'POST',
                url: `${API}/extend_booking`,
                data: {codeid_apartment, date_from, days_amount, codeid_client}
            })

            if (response.status >= 200 && response.status < 300) {
                const {data} = response
                dispatch(getMyActiveBooking({codeid: codeid_client}));
                if(data.status == 1) {
                    Alert.alert(
                        'Успешно',
                        'Бронь успешно продлена!',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ]
                    );
                }
            }else  {
                throw Error(`Error: ${response.status}`);
            }
        }catch (error){
            return  rejectWithValue(error.message)
        }
    }
)

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

        clearApartmentDetail: (state, action) => {
            state.apartmentDetail = {
                conversions: [],
                    photos: [{pathUrl: ''}],
                    othersHere: [],
                    rules: [],
                    floor: "88",
                    date_from: "",
                    date_to: "",
                    num_rooms: "88",                                                 //количество комнат
                    num_bathroom: "88",                                              //количество ванныч
                    num_guests: "88",                                                //количество спальных мест
                    max_guest: "",
            }
        },

         changeSearchData: (state, action) => {
            state.search = action.payload
        },

        changeActiveBookingData: (state, action) => {
            state.activeBooking = action.payload
        },

        changePaymentFinished: (state, action) => {
            state.paymentFinished = action.payload
        },

        clearActiveBookingData: (state, action) => {
            state.activeBooking = {
                date_to: '',
                    date_from: "",
                    days: '',
                    address: '',
                    fio: '',
                    apartament_name: '',
                    code_lock: "",
                    status: '',
            }
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
            state.otherPreloader = false;
            state.favoritesList = action.payload;
        });
        builder.addCase(userFavoritesApartments.rejected, (state, action) => {
            state.error = action.payload;
            state.otherPreloader = false;
        });
        builder.addCase(userFavoritesApartments.pending, (state, action) => {
            state.otherPreloader = true;
        });

        //apartamentFilters
        builder.addCase(apartamentFilters.fulfilled, (state, action) => {
            state.otherPreloader = false;
            state.filtredApartaments = action.payload;
        });
        builder.addCase(apartamentFilters.rejected, (state, action) => {
            state.error = action.payload;
            state.otherPreloader = false;
        });
        builder.addCase(apartamentFilters.pending, (state, action) => {
            state.otherPreloader = true;
        });

        //getMyActiveBooking
        builder.addCase(getMyActiveBooking.fulfilled, (state, action) => {
            state.otherPreloader = false;
            state.activeBooking = action.payload;
        });
        builder.addCase(getMyActiveBooking.rejected, (state, action) => {
            state.error = action.payload;
            state.otherPreloader = false;
        });
        builder.addCase(getMyActiveBooking.pending, (state, action) => {
            state.otherPreloader = true;
        });

        //searchByAddress
        builder.addCase(searchByAddress.fulfilled, (state, action) => {
            state.otherPreloader = false;
            state.listApartments = action.payload;
        });
        builder.addCase(searchByAddress.rejected, (state, action) => {
            state.error = action.payload;
            state.otherPreloader = false;
        });
        builder.addCase(searchByAddress.pending, (state, action) => {
            state.otherPreloader = true;
        });

        //bookHistory
        builder.addCase(getMyBookingHistory.fulfilled, (state, action) => {
            state.otherPreloader = false;
            state.bookHistory = action.payload;
        });
        builder.addCase(getMyBookingHistory.rejected, (state, action) => {
            state.error = action.payload;
            state.otherPreloader = false;
        });
        builder.addCase(getMyBookingHistory.pending, (state, action) => {
            state.otherPreloader = true;
        });

        //bookHistory
        builder.addCase(applyExtendPayment.fulfilled, (state, action) => {
            state.preloader = false;
        });
        builder.addCase(applyExtendPayment.rejected, (state, action) => {
            state.error = action.payload;
            state.preloader = false;
        });
        builder.addCase(applyExtendPayment.pending, (state, action) => {
            state.preloader = true;
        });

    },
});

export const {updateListApartmentsAndDetail,
    changeSearchData,
    clearActiveBookingData,
    changePaymentFinished,
    clearApartmentDetail
} = requestSlice.actions;


export default requestSlice.reducer;

