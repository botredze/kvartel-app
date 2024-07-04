import {TouchableOpacity, View, Text} from "react-native";
import {styles} from './styles'
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default  function BottomSheetSideBar({handleClickBack, title}) {
    return (
        <View style={styles.sidebarContainer}>
            <TouchableOpacity style={styles.stepBackButton} onPress={() => {handleClickBack()}}>
                <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.sidebarTitle}>{title}</Text>
        </View>
    )
}
