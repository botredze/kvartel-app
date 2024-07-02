import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {MaterialCommunityIcons} from "@expo/vector-icons";

const ConvenienceItem = ({ item, onSelect, isSelected }) => {
    console.log(item, onSelect, isSelected )
    return (
        <TouchableOpacity
            style={[styles.itemContainer, isSelected && styles.selectedItem]}
            onPress={() => onSelect(item.id)}
        >
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons  name={item.icon} size={24} color={isSelected ? 'white' : '#ccc'} />
            </View>
            <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: 'white',
    },
    selectedItem: {
        backgroundColor: '#6200ea',
        borderColor: '#6200ea',
    },
    iconContainer: {
        marginRight: 10,
    },
    itemText: {
        fontSize: 16,
    },
    selectedItemText: {
        color: 'white',
    },
});

export default ConvenienceItem;
