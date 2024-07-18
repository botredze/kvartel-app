import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
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
import {checkUserVerify, getApartments, userFavoritesApartments} from "../store/reducers/requestSlice";
import {useEffect} from "react";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.saveDataSlice)

    useEffect(() => {
        //dispatch(getApartments({status: 1, codeid_client: data.userId}))
        dispatch(getApartments({status: 1, codeid_client: 1}))
    }, [data]);

    useEffect(() => {
        console.log(!data.verificated, 'data.verificated === false')
        if(!data.verificated) {
            console.log(!'data.verificated === false')
            dispatch(checkUserVerify({codeid: data.userId}));
        }
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Preloader />
            <Stack.Navigator
                initialRouteName={data.userId ? 'HomePage' : 'Creeting'}
                screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
            >
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

                <Stack.Screen
                    name='ChatScreen'
                    component={ChatScreen}
                    options={{headerShown: false}}
                />

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

            </Stack.Navigator>
            <StatusBar theme="auto" backgroundColor="rgba(47, 71, 190, 0.287)" />
        </NavigationContainer>
    );
};
