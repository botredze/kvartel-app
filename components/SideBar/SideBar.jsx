import {TouchableOpacity, View, Text} from "react-native";
import {styles} from "./sidebarStyles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default  function SideBar({title}){

    return (
        <View style={styles.topBar}>
            <TouchableOpacity onPress={() => {}}>
                <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            {title && (
                <Text style={styles.titleText}>{title}</Text>
            )}
            <TouchableOpacity onPress={() => {}} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}
