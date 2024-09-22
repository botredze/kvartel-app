import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Navigation } from "./components/Navigation";
import { store } from "./store";
import { PaperProvider } from "react-native-paper";
import { usePushNotifications } from "./usePushNotifications";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./env";

export default function App() {
    const { expoPushToken, notification } = usePushNotifications();
    const [userData, setUserData] = useState(null);

    const loginByToken = async (expoPushToken) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${API}/register_by_token`,
                data: { token: expoPushToken }
            });

            if (response.status >= 200 && response.status < 300) {
                const { codeid, fio, phone, email } = response.data;
                await AsyncStorage.setItem("userId", codeid);
                await AsyncStorage.setItem("fio", fio);
                await AsyncStorage.setItem('phone', phone);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem("verificated", 'true');
                await AsyncStorage.setItem("rejectRegistration", "false");
                return response.data;
            } else {
                throw new Error('Request failed with status code ' + response.status);
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (expoPushToken) {
                try {
                    const data = await loginByToken(expoPushToken);
                    setUserData(data); // Обновляем состояние с полученными данными
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchData();
    }, [expoPushToken]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <Provider store={store}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Navigation userData={userData} />
                        <StatusBar style="auto" backgroundColor="rgba(47, 71, 190, 0.287)" />
                    </SafeAreaView>
                </Provider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
