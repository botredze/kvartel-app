import React, {useState} from 'react';
import {SafeAreaView, Text, View, TextInput, StyleSheet, Platform, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {styles} from './styles/registerStyle'
import { Ionicons } from '@expo/vector-icons';
import MaskInput from "react-native-mask-input/src/MaskInput";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {changePhoneNumber} from "../../store/reducers/stateSlice";
import {login_ver} from "../../store/reducers/requestSlice";
import SideBar from "../../components/SideBar/SideBar";

export default function Register() {
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {phoneNumber} = useSelector((state)=> state.stateSlice)

    const handlePhoneChange = (masked, unmasked) => {
        dispatch(changePhoneNumber({phone_number: `996${unmasked}`}))
        setPhone(masked);
        setIsPhoneValid(masked.length === 15);
    };

    const handleSendSMS = () => {
        if(phone && isPhoneValid) {
            dispatch(login_ver({phoneNumber, navigation}))
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <SideBar navigateTo='Creeting'/>
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
