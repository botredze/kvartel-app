import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles/settingsStyles';
import SideBar from "../../components/SideBar/SideBar";
import { useNavigation } from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {changePassportVerifyData} from "../../store/reducers/stateSlice";

export default function UserSettingScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handlePressSaveUserData = () => {
        const newErrors = {};
        if (!firstName) newErrors.firstName = 'Имя не может быть пустым';
        if (!lastName) newErrors.lastName = 'Фамилия не может быть пустой';
        if (!middleName) newErrors.middleName = 'Отчество не может быть пустым';
        if (!email) newErrors.email = 'E-mail не может быть пустым';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            dispatch(changePassportVerifyData({email: email, fio: `${firstName} ${lastName} ${middleName}`}))
            const documents = [
                { id: 1, name: 'Договор оферты', documentUrl: 'http://admin-kvartel.ibm.kg/files/dogovorArend.pdf' },
                { id: 2, name: 'Правила бронирования', documentUrl: 'http://admin-kvartel.ibm.kg/files/praviloBron.pdf' },
                { id: 3, name: 'Согласие на обработку персональных данных', documentUrl: 'http://admin-kvartel.ibm.kg/files/soglasie.pdf' },
            ];

            navigation.navigate('ViewRegistrationDogovor', { item: documents[0], step: 0, documents });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <SideBar title='Настройки' navigateTo='Creeting' />
            <View style={styles.content}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ИМЯ</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Имя"
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ФАМИЛИЯ</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Фамилия"
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ОТЧЕСТВО</Text>
                    <TextInput
                        style={styles.input}
                        value={middleName}
                        onChangeText={setMiddleName}
                        placeholder="Отчество"
                    />
                    {errors.middleName && <Text style={styles.errorText}>{errors.middleName}</Text>}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-MAIL</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="E-mail"
                        keyboardType="email-address"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handlePressSaveUserData}>
                <Text style={styles.saveButtonText}>Сохранить</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
