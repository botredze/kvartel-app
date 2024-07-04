import BottomSheet, {BottomSheetFlatList} from "@gorhom/bottom-sheet";

import React, {useMemo} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./style";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";


export default function Support(){
    const snapPoints = useMemo(() => ['47%'], []);
    const handleBack = () => {
        console.log('ХУЙХУЙ')
    }

    const contactType = [
        {id: 1, name: 'Написать E-mail', iconName: 'heart'},
        {id: 2, name: 'Позвонить', iconName: 'phone-alt'},
        {id: 3, name: 'Написать в Telegram', iconName: 'telegram-plane'},
        {id: 4, name: 'Написать в WhatsApp', iconName: 'whatsapp'}
    ]
    return (
        <BottomSheet
            snapPoints={snapPoints}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
        >
            <View style={styles.sidebarContainer}>
                <View style={styles.sidebarTitleContainer}>
                <Text style={styles.sidebarTitle}>Выберите удобный для вас способ связи</Text>
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>


            <View style={styles.buttonsGroupContainer}>
                {contactType.map((item)=> (
                    <TouchableOpacity style={styles.contactButton} key={item.id}>
                        <Text style={styles.contactText}>{item.name}</Text>
                        <FontAwesome5 name={item.iconName} size={30} color="#666667" />
                    </TouchableOpacity>
                ))}
            </View>
        </BottomSheet>
    )
}
