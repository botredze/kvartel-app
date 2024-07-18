import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import {View, StyleSheet} from "react-native";
import React from "react";
import {deepPurpleA700} from "react-native-paper/src/styles/themes/v2/colors";


export default function Loader() {
    return (
        <View style={styles.preloaderActivity}>
            <ActivityIndicator
                animating={true}
                color={MD2Colors.deepPurpleA700}
                size={45}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    preloaderActivity: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
