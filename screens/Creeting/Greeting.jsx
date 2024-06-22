import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import background from '../assets/background.jpg'

export default function Creeting() {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={background}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={{display: 'flex', alignItems: "center"}} >
                        <Text style={styles.title}>kvartel</Text>
                    </View>
                    <View style={{display: 'flex', alignItems: "center"}} >
                        <Text style={styles.subtitle}>
                            Хоумшерин сервис автоматизированной аренды жилья посуточно.
                            Не тратьте время на встречи с хозяевами, не переплачивайте посредникам.
                            Заселитесь тогда, когда это удобно вам!
                        </Text>
                    </View>
                </View>

                <View style={styles.loginBtnGroup}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Вход и регистрация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.skipButton}>
                        <Text style={styles.skipText}>Пропустить</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "column",
        height: '56%'
    },
    title: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 15,
        width: '90%',
        alignItems: "center"
    },
    buttonText: {
        color: '#9B84F3',
        fontSize: 16,
        fontWeight: "500"
    },
    skipButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    skipText: {
        color: '#fff',
        fontSize: 16,
    },

    loginBtnGroup: {
        width: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        bottom: 20,
        gap: 10
    }

});
