import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider, useDispatch} from "react-redux";
import {Navigation} from "./components/Navigation";
import {store} from "./store";
import {PaperProvider} from "react-native-paper";
import {usePushNotifications} from "./usePushNotifications";
import {changeExpoPushToken} from "./store/reducers/stateSlice";


export default function App() {
   // const dispatch = useDispatch();
    const {expoPushToken, notification} = usePushNotifications()

    const data = JSON.stringify(notification, undefined, 2)

    console.log(data, 'data')
    // if(expoPushToken && expoPushToken.length > 0){
    //     dispatch(changeExpoPushToken(expoPushToken));
    // }
    console.log(expoPushToken, 'expoPushToken')
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
