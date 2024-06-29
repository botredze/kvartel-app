import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  {styles} from './styles/otpStyles'
import SideBar from "../../components/SideBar/SideBar";


export default function OTPInputScreen() {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleInputChange = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (cleanedText.length <= 6) {
            setOtp(cleanedText);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
        <SideBar/>
            <View style={styles.content}>
                <Text style={styles.headerText}>Введите код из сообщения</Text>
                <View style={styles.otpContainer}>
                    <TextInput
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={6}
                        value={otp}
                        onChangeText={handleInputChange}
                        autoFocus
                    />
                    <View style={styles.otpMask}>
                        {Array(6).fill().map((_, index) => (
                            <View key={index} style={styles.otpMaskItem}>
                                <Text style={styles.otpMaskText}>{otp[index] || ''}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Повторно через {timer}с</Text>
            </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
