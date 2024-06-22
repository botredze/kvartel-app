import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  {styles} from './styles/otpStyles'

export default function  OTPInputScreen ()  {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleInputChange = (text, index) => {
        const newOtp = otp.split('');
        newOtp[index] = text;
        setOtp(newOtp.join(''));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => {}}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => {}}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.headerText}>Введите код из сообщения</Text>
                <View style={styles.otpContainer}>
                    {Array(4).fill().map((_, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={otp[index] || ''}
                            onChangeText={(text) => handleInputChange(text, index)}
                            autoFocus={index === 0}
                        />
                    ))}
                </View>
                <Text style={styles.timerText}>Повторно через {timer}с</Text>
            </View>
        </SafeAreaView>
    );
};
