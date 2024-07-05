import React, {useState} from 'react';
import {SafeAreaView, Text, View, TextInput, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {styles} from './styles/registerStyle'
import { Ionicons } from '@expo/vector-icons';
import MaskInput from "react-native-mask-input/src/MaskInput";
import {useNavigation} from "@react-navigation/native";

export default function Register() {
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const navigation = useNavigation();

    const handlePhoneChange = (masked, unmasked) => {
        setPhone(masked);
        setIsPhoneValid(masked.length === 15);
    };

    const handleSendSMS = () => {
        navigation.navigate('OTP')
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => {}}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Введите номер телефона</Text>
                    </View>
                    <View style={styles.phoneInputContainer}>
                        <View style={styles.countryCodeContainer}>
                            <Text style={styles.countryCode}>+996</Text>
                            <View style={styles.underline} />
                        </View>
                        <MaskInput
                            style={styles.phoneInput}
                            value={phone}
                            keyboardType="phone-pad"
                            onChangeText={handlePhoneChange}
                            mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, /\d/]}
                        />
                    </View>
                </View>

                <View style={styles.sendCodeButtonContainer}>
                    {isPhoneValid && (
                        <TouchableOpacity style={styles.sendCodeButton} onPress={() => {handleSendSMS()}}>
                            <Text style={styles.sendCodeButtonText}>Отправить код СМС</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
