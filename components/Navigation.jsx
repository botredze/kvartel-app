import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Preloader } from "./Preloader";
import Creeting from "../screens/Creeting/Greeting";
import Register from "../screens/Registration/Register";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    const dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Preloader />
            <Stack.Navigator
                initialRouteName="Register"
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
            </Stack.Navigator>
            <StatusBar theme="auto" backgroundColor="rgba(47, 71, 190, 0.287)" />
        </NavigationContainer>
    );
};
