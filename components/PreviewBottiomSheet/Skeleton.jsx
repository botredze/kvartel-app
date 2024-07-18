import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {colors} from "../../constants/constants";

export default function Skeleton() {
    return (
        <View style={styles.skeletonContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.imageAndAdress}>
                    <View style={styles.skeletonImage} />

                    <View style={styles.skeletonBlock}>
                        <View style={styles.skeletonText} />
                        <View style={[styles.skeletonText]} />
                    </View>
                </View>
                <TouchableOpacity style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.selectDateContainer}>
                <TouchableOpacity style={styles.selectDateBtn}>
                    <Text style={styles.selectDateBtnText}>Выбрать дату</Text>
                    <View style={[styles.skeletonText, { width: '30%' }]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
                    <Entypo name="dots-three-horizontal" size={22} color="#666666" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    skeletonContainer: {
        flex: 1,
        paddingHorizontal: 17,
    },
    selectDateBtnText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.mainWhite
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    imageAndAdress: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    skeletonImage: {
        width: 52,
        height: 52,
        borderRadius: 13,
        backgroundColor: '#E0E0E0',
    },
    skeletonText: {
        height: 16,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 5,
    },
    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        height: 90,
        justifyContent: 'space-between',
        gap: 5
    },
    selectDateBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '88%',
        height: 50,
        backgroundColor: '#5127FF',
        borderRadius: 30,
        paddingHorizontal: 15,
    },

    skeletonBlock: {
        width: '70%'
    }

});

