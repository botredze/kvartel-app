import {View, Text, TouchableOpacity} from "react-native";
import {styles} from './style'
import {Feather, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import React from "react";
import {colors} from "../../constants/constants";

export default function BurgerMenu() {
    const username = 'Баатыр'
    const buttons = [
        {id: 1, name: 'История аренды', bottomComponent: ''},
        {id: 2, name: 'Избранное', bottomComponent: ''},
        {id: 3, name: 'Частые вопросы', bottomComponent: ''},
        {id: 4, name: 'Служба поддержки', bottomComponent: ''},
        {id: 5, name: 'Способы оплаты', bottomComponent: ''},
    ]

    const documents = [
        {id: 1, name: 'Договор аренды', documentUrl: ''},
        {id: 2, name: 'Лицензионное соглашения', documentUrl: ''},
        {id: 3, name: 'Условия использования', documentUrl: ''},
    ]

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.sideBarContainer}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userNameTitle}>Привет, {username} </Text>
                        <Feather name="settings" size={20} color={colors.mainPurple}/>
                    </View>

                    <TouchableOpacity onPress={() => {
                    }} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonGroupContainer}>
                    {buttons.map((item) => (
                        <TouchableOpacity
                            style={styles.navigateButton}
                            key={item.id}
                        >
                            <Text style={styles.navigateButtonText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.bottomButtonsGroup}>
                <View style={styles.appVersionContainer}>
                    <Text style={styles.appVersionText}>kvartel</Text>
                    <Text style={styles.versionTitle}> * Версия (1.0.0)</Text>
                </View>

                <View style={styles.documentsContainer}>
                    {documents.map((item)=> (
                        <TouchableOpacity
                            key={item.id}
                        >
                            <Text style={styles.documentNameText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity>
                    <Text style={styles.logoutButton}>Удалить аккаунт</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
