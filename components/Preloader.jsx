import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import {MD2Colors} from "react-native-paper";
import React from "react";

export const Preloader = () => {
    const { preloader } = useSelector((state) => state.requestSlice);

    console.log(preloader)
    if (preloader) {
        return (
            <View
                style={{
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                    minHeight: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                }}
            >
                <ActivityIndicator
                    animating={true}
                    color={MD2Colors.deepPurpleA700}
                    size={45}
                />
            </View>
        );
    }
};
