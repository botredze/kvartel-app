import React from 'react';
import {SafeAreaView, Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from './styles/style'
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
    return (
        <SafeAreaView style={styles.container}>
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
                <Text style={styles.countryCode}>+996</Text>
                <TextInput style={styles.phoneInput} keyboardType="phone-pad" />
            </View>
            </View>
        </SafeAreaView>
    );
}
