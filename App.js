import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Navigation } from "./components/Navigation";
import { store } from "./store";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Navigation />
                    <StatusBar style="auto" backgroundColor="rgba(47, 71, 190, 0.287)" />
                </SafeAreaView>
            </Provider>
        </GestureHandlerRootView>
    );
}
