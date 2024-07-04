import {Text, TouchableOpacity, View} from "react-native";
import {styles} from './styles'
import React from "react";

const Dates = ({itemDate}) => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.dateTitle}>{itemDate?.name}</Text>
            <TouchableOpacity style={styles.selectDateButton}>
                <Text style={styles.selectDateTitle}>
                    {itemDate?.date}
                </Text>

                {itemDate?.output && (
                    <Text style={styles.outActive}>только выезд</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default Dates
