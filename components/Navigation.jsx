import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Preloader } from "./Preloader";
import Creeting from "../screens/Creeting/Greeting";
import Register from "../screens/Registration/Register";
import OTPInputScreen from "../screens/Registration/OTPInput";
import UserSettingScreen from "../screens/Registration/UserSettingScreen";
import HomePage from "../screens/HomePage/HomePage";
import BurgerMenu from "../screens/BurgerMenu/BurgerMenu";
import PaymentMethods from "../screens/PaymentMethods/PaymentMethods";
import DocsView from "../screens/DocsView/DocsView";
import AddCardWebView from "../screens/AddCardWebView/AddCardWebView";
import ViewRegistrationDogovor from "../screens/DocsView/ViewRegistrationDogovor";
import LoadPassportPhotos from "../screens/LoadPassportPhotos/LoadPassportPhotos";
import MyBooking from "../screens/MyBooking/MyBooking";
import MapForBooking from "../screens/MapForBooking/MapForBooking";
import { checkUserVerify, getApartments, getMyActiveBooking } from "../store/reducers/requestSlice";
import DevView from "../screens/DevView";

const Stack = createNativeStackNavigator();

export const Navigation = ({ userData }) => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.saveDataSlice);

    useEffect(() => {
        if (data.userId) {
            dispatch(getApartments({ status: 0, codeid_client: data.userId }));
            dispatch(getMyActiveBooking({ codeid: data.userId }));
        }
    }, [data.userId]);

    // useEffect(() => {
    //     if (userData) {
    //         getLocalDataUser({ changeLocalData, dispatch });
    //     } else {
    //         dispatch(clearLocalData());
    //     }
    // }, [userData]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (data.verificated == false && data.userId) {
                dispatch(checkUserVerify({ codeid: data.userId }));
            }
        }, 5 * 60 * 10);
        return () => clearInterval(interval);
    }, [data]);

    return (
        <NavigationContainer>
            <Preloader />
            <Stack.Navigator
                initialRouteName={userData ? 'HomePage' : 'Creeting'}
               // initialRouteName='DevView'
                screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
            >
                <Stack.Screen name="Creeting" component={Creeting} options={{ headerShown: false }} />
                <Stack.Screen name="MapForBooking" component={MapForBooking} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="OTP" component={OTPInputScreen} options={{ headerShown: false }} />
                <Stack.Screen name="UserSettingScreen" component={UserSettingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
                <Stack.Screen name="BurgerMenu" component={BurgerMenu} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ headerShown: false }} />
                <Stack.Screen name="DocsView" component={DocsView} options={{ headerShown: false }} />
                <Stack.Screen name="AddCardWebView" component={AddCardWebView} options={{ headerShown: false }} />
                <Stack.Screen name="ViewRegistrationDogovor" component={ViewRegistrationDogovor} options={{ headerShown: false }} />
                <Stack.Screen name="LoadPassportPhotos" component={LoadPassportPhotos} options={{ headerShown: false }} />
                <Stack.Screen name="MyBooking" component={MyBooking} options={{ headerShown: false }} />
                <Stack.Screen name="DevView" component={DevView} options={{ headerShown: false }} />

            </Stack.Navigator>
            <StatusBar style="auto" backgroundColor="rgba(47, 71, 190, 0.287)" />
        </NavigationContainer>
    );
};
