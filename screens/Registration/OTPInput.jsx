import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {styles} from './styles/otpStyles'
import SideBar from "../../components/SideBar/SideBar";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {login_ver, verifyOtpCode} from "../../store/reducers/requestSlice";
import {usePushNotifications} from "../../usePushNotifications";

export default function OTPInputScreen() {
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [otpValid, setOtpValid] = useState(false);
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.saveDataSlice);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const { loginData, phoneNumber} = useSelector((state)=> state.stateSlice)
    const {expoPushToken, notification} = usePushNotifications()
    useEffect(() => {
        if (otp.length === 6) {
            if (otp == loginData?.code) {
                dispatch(verifyOtpCode({navigation, loginData, data, expoPushToken}))
            } else {
                setOtpValid(true);
            }
        } else {
            setOtpValid(false);
        }
    }, [otp]);

    const handleInputChange = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        if (cleanedText.length <= 6) {
            setOtp(cleanedText);
        }
    };

    const handleRefreshOtpCode = () => {
        setTimer(60)
        dispatch(login_ver({phoneNumber, navigation,expoPushToken }))
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <SideBar navigateTo='Register'/>
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

                        {otpValid && (
                            <View style={styles.otpErrorCode}>
                                <Text style={styles.otpError}>Введенный код не верный</Text>
                            </View>
                        )}
                    </View>
                </View>

                {timer === 0 ? (
                    <TouchableOpacity
                        style={styles.refreshhCode}
                        onPress={() => {handleRefreshOtpCode()}}
                    >
                        <Text style={styles.refreshhCodeText}>Отправить код повторно</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>Повторно через {timer}с</Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
