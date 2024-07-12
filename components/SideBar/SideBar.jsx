import {TouchableOpacity, View, Text} from "react-native";
import {styles} from "./sidebarStyles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default  function SideBar({title, navigateTo}){

    const navigation = useNavigation()

    const handleBackNavigation = () => {
        navigation.replace(`${navigateTo}`)
    }

    const handleCloseRegistration = () => {
        navigation.replace('Creeting')
    }

    return (
        <View style={styles.topBar}>
            <TouchableOpacity onPress={() => {handleBackNavigation()}}>
                <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            {title && (
                <Text style={styles.titleText}>{title}</Text>
            )}
            <TouchableOpacity onPress={() => {handleCloseRegistration()}} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}
