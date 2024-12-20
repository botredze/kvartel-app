import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import background from '../../assets/background.jpg'
import {styles} from './style'
import {useNavigation} from "@react-navigation/native";
import {loginByToken} from "../../store/reducers/requestSlice";
import {usePushNotifications} from "../../usePushNotifications";
import {useDispatch} from "react-redux";

export default function Creeting() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    function handleLoginOrRegister() {
        navigation.navigate('Register')
    }

    // const {expoPushToken, notification} = usePushNotifications()
    //
    // useEffect(() => {
    //     dispatch(loginByToken({navigation, expoPushToken}))
    // }, [expoPushToken])
    //
    //
    // function handleSwitchRegister() {
    //     navigation.navigate('HomePage')
    // }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={background}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={{display: 'flex', alignItems: "center"}}>
                        <Text style={styles.title}>MIG Apartment</Text>
                    </View>
                    <View style={{display: 'flex', alignItems: "center"}}>
                        <Text style={styles.subtitle}>
                            Хоумшеринг сервис автоматизированной аренды жилья посуточно.
                            Не тратьте время на встречи с хозяевами, не переплачивайте посредникам.
                            Заселитесь тогда, когда это удобно вам!
                        </Text>
                    </View>
                </View>

                <View style={styles.loginBtnGroup}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLoginOrRegister}
                    >
                        <Text style={styles.buttonText}>Вход и регистрация</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity*/}
                    {/*    style={styles.skipButton}*/}
                    {/*    onPress={handleSwitchRegister}*/}
                    {/*>*/}
                    {/*    <Text style={styles.skipText}>Пропустить</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}


