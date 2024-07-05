import BottomSheet, {BottomSheetBackdrop, BottomSheetFlatList} from "@gorhom/bottom-sheet";

import React, {useCallback, useMemo} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./style";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";


export default function Support({support}){
    const snapPoints = useMemo(() => ['47%'], []);

    const handleBack = () => {
        support.current?.close()
    }

    const shadowBlock = useCallback(
        (props) => (
            <BottomSheetBackdrop
                opacity={0.7}
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            ></BottomSheetBackdrop>
        ),
        []
    );

    const contactType = [
        {id: 1, name: 'Написать E-mail', iconName: 'heart'},
        {id: 2, name: 'Позвонить', iconName: 'phone-alt'},
        {id: 3, name: 'Написать в Telegram', iconName: 'telegram-plane'},
        {id: 4, name: 'Написать в WhatsApp', iconName: 'whatsapp'}
    ]
    return (
        <BottomSheet
            ref={support}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={shadowBlock}
            onClose={handleBack}
            snapPoints={snapPoints}
        >
            <View style={styles.sidebarContainer}>
                <View style={styles.sidebarTitleContainer}>
                <Text style={styles.sidebarTitle}>Выберите удобный для вас способ связи</Text>
                </View>
                <TouchableOpacity onPress={() => {handleBack()}} style={styles.closeButton}>
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
