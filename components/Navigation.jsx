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

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    const dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Preloader />
            <Stack.Navigator
                initialRouteName="HomePage"
                screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
            >
                {/*<Stack.Screen*/}
                {/*    name="Creeting"*/}
                {/*    component={Creeting}*/}
                {/*    options={{ headerShown: false }}*/}
                {/*/>*/}

                {/*<Stack.Screen*/}
                {/*name='Register'*/}
                {/*component={Register}*/}
                {/*options={{headerShown: false}}*/}
                {/*/>*/}

                {/*<Stack.Screen*/}
                {/*    name='OTP'*/}
                {/*    component={OTPInputScreen}*/}
                {/*    options={{headerShown: false}}*/}
                {/*/>*/}

                {/*<Stack.Screen*/}
                {/*    name='UserSettingScreen'*/}
                {/*    component={UserSettingScreen}*/}
                {/*    options={{headerShown: false}}*/}
                {/*/>*/}

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
            </Stack.Navigator>
            <StatusBar theme="auto" backgroundColor="rgba(47, 71, 190, 0.287)" />
        </NavigationContainer>
    );
};
