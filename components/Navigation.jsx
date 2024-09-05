import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Preloader } from "./Preloader";
import Creeting from "../screens/Creeting/Greeting";
import Register from "../screens/Registration/Register";
import OTPInputScreen from "../screens/Registration/OTPInput";
import UserSettingScreen from "../screens/Registration/UserSettingScreen";
import ChatScreen from "../screens/Registration/ChatScreen";
import HomePage from "../screens/HomePage/HomePage";
import BurgerMenu from "../screens/BurgerMenu/BurgerMenu";
import PaymentMethods from "../screens/PaymentMethods/PaymentMethods";
import DocsView from "../screens/DocsView/DocsView";
import AddCardWebView from "../screens/AddCardWebView/AddCardWebView";
import ViewRegistrationDogovor from "../screens/DocsView/ViewRegistrationDogovor";
import LoadPassportPhotos from "../screens/LoadPassportPhotos/LoadPassportPhotos";
import {checkUserVerify, getApartments, loginByToken, userFavoritesApartments} from "../store/reducers/requestSlice";
import {useEffect, useRef} from "react";
import {usePushNotifications} from "../usePushNotifications";
import MyBooking from "../screens/MyBooking/MyBooking";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.saveDataSlice)

    console.log(data, 'data')
    useEffect(() => {
        dispatch(getApartments({status: 1, codeid_client: data.userId ? data.userId : 1}))
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
                dispatch(checkUserVerify({ codeid: data.userId }));
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [dispatch, data.verificated, data.userId]);

    return (
        <NavigationContainer>
            <Preloader />
            <Stack.Navigator
                initialRouteName={data.userId ? 'HomePage' : 'Creeting'}
                screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
            >

            {/*<Stack.Navigator*/}
            {/*    initialRouteName={data.userId ? 'AddCardWebView' : 'AddCardWebView'}*/}
            {/*    screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}*/}
            {/*>*/}
                <Stack.Screen
                    name="Creeting"
                    component={Creeting}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                name='Register'
                component={Register}
                options={{headerShown: false}}
                />

                <Stack.Screen
                    name='OTP'
                    component={OTPInputScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='UserSettingScreen'
                    component={UserSettingScreen}
                    options={{headerShown: false}}
                />

                {/*<Stack.Screen*/}
                {/*    name='ChatScreen'*/}
                {/*    component={ChatScreen}*/}
                {/*    options={{headerShown: false}}*/}
                {/*/>*/}

                <Stack.Screen
                    name='HomePage'
                    component={HomePage}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='BurgerMenu'
                    component={BurgerMenu}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='PaymentMethods'
                    component={PaymentMethods}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='DocsView'
                    component={DocsView}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='AddCardWebView'
                    component={AddCardWebView}
                    options={{headerShown: false}}
                />


                <Stack.Screen
                    name='ViewRegistrationDogovor'
                    component={ViewRegistrationDogovor}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='LoadPassportPhotos'
                    component={LoadPassportPhotos}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='MyBooking'
                    component={MyBooking}
                    options={{headerShown: false}}
                ></Stack.Screen>

            </Stack.Navigator>
            <StatusBar theme="auto" backgroundColor="rgba(47, 71, 190, 0.287)" />
        </NavigationContainer>
    );
};
