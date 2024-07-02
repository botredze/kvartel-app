import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../../constants/constants";

const ConvenienceViewItem = ({ item}) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons  name={item.icon} size={24} color= '#666666' />
            </View>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 8,
        borderRadius: 10,
        marginVertical: 5,
    },
    iconContainer: {
        marginRight: 10,
        backgroundColor: colors.mainGrey,
        borderRadius: 15,
        width: 35,
        height: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    itemText: {
        fontSize: 16,
    },
    selectedItemText: {
        color: 'white',
    },
});

export default ConvenienceViewItem;
