import React, {useCallback, useMemo} from "react";
import {Text, TouchableOpacity, View, Linking, Alert} from "react-native";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import BottomSheet, {BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import {styles} from "./style";

export default function Support({support}) {
    const snapPoints = useMemo(() => ['49%'], []);

    const handleBack = () => {
        support.current?.close();
    };

    const shadowBlock = useCallback(
        (props) => (
            <BottomSheetBackdrop
                opacity={0.7}
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        []
    );

    const contactType = [
        {id: 1, name: 'Написать E-mail', iconName: 'mail-bulk', action: 'mailto:botedze@gmail.com'},
        {id: 2, name: 'Позвонить', iconName: 'phone-alt', action: 'tel:+996504130622'},
        {id: 3, name: 'Написать в Telegram', iconName: 'telegram-plane', action: 'tg://resolve?domain=@baaliev'},
        {id: 4, name: 'Написать в WhatsApp', iconName: 'whatsapp', action: 'whatsapp://send?phone=+996504130622'}
    ];

    // Функция для открытия ссылки
    const handleLinkPress = async (url) => {
        const supported = await Linking.canOpenURL(url);

        console.log(supported, 'supported')
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Ошибка', 'Не удается открыть приложение.');
        }
    };

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
                <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonsGroupContainer}>
                {contactType.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.contactButton}
                        onPress={() => handleLinkPress(item.action)}
                    >
                        <Text style={styles.contactText}>{item.name}</Text>
                        <FontAwesome5 name={item.iconName} size={30} color="#666667" />
                    </TouchableOpacity>
                ))}
            </View>
        </BottomSheet>
    );
}
