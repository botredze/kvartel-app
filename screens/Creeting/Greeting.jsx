import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import background from '../../assets/background.jpg'
import {styles} from './style'

export default function Creeting() {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={background}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={{display: 'flex', alignItems: "center"}}>
                        <Text style={styles.title}>kvartel</Text>
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


