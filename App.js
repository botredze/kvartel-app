import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider, useDispatch} from "react-redux";
import {Navigation} from "./components/Navigation";
import {store} from "./store";
import {PaperProvider} from "react-native-paper";
import {usePushNotifications} from "./usePushNotifications";


export default function App() {
   // const dispatch = useDispatch();
    const {expoPushToken, notification} = usePushNotifications()
    console.log(expoPushToken, 'expoPushToken')
    const data = JSON.stringify(notification, undefined, 2)

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <PaperProvider>
                <Provider store={store}>
                    <SafeAreaView style={{flex: 1}}>
                        <Navigation/>
                        <StatusBar style="auto" backgroundColor="rgba(47, 71, 190, 0.287)"/>
                    </SafeAreaView>
                </Provider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
