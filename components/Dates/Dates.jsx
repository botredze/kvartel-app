import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from './styles';

const Dates = ({ itemDate, isSelected, onPress, isNextSelected }) => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.dateTitle}>{itemDate?.name}</Text>
            <TouchableOpacity
                style={[styles.selectDateButton, isSelected && styles.activeDateButton]}
                onPress={onPress}
            >
                <Text style={[styles.selectDateTitle, isSelected && styles.activeDateTitle]}>
                    {itemDate?.date}
                </Text>

                {itemDate?.output && (
                    <Text style={styles.outActive}>только выезд</Text>
                )}
            </TouchableOpacity>
            {isSelected && isNextSelected && <View style={styles.connectionLine} />}
        </View>
    );
};

export default Dates
