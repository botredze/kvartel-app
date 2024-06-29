import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  {styles} from './styles/settingsStyles'
import SideBar from "../../components/SideBar/SideBar";

export default function UserSettingScreen () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.container}>
          <SideBar title='Настройки'/>
            <View style={styles.content}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ИМЯ</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="Имя"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ФАМИЛИЯ</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Фамилия"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ОТЧЕСТВО</Text>
                    <TextInput
                        style={styles.input}
                        value={middleName}
                        onChangeText={setMiddleName}
                        placeholder="Отчество"
                    />
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
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                <Text style={styles.saveButtonText}>Сохранить</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
