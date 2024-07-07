import {View, Text, TouchableOpacity} from "react-native";
import {styles} from './style'
import {Feather, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import React, {useCallback, useRef, useState} from "react";
import {colors} from "../../constants/constants";
import {useNavigation} from "@react-navigation/native";
import FaqBottomSheet from "../../components/FaqBottomSheet/FaqBottomSheet";
import Favorites from "../../components/Favorites/Favorites";
import Support from "../../components/Support/Support";
import HistoryOrder from "../../components/HistoryOrder/HistoryOrder";

export default function BurgerMenu() {
    const navigation = useNavigation();
    const [showHistory, setShowHistory] = useState(false)
    const [showFavorites, setShowFavorites] = useState(false)
    const [showFaq, setShowFaq] = useState(false)
    const [showSupport , setShowSupport] = useState(false)

    const history = useRef(null)
    const favorites = useRef(null)
    const faq = useRef(null)
    const support = useRef(null)

    const username = 'Баатыр'
    const buttons = [
        {id: 1, name: 'История аренды', bottomComponent: 'history'},
        {id: 2, name: 'Избранное', bottomComponent: 'favorites'},
        {id: 3, name: 'Частые вопросы', bottomComponent: 'faq'},
        {id: 4, name: 'Служба поддержки', bottomComponent: 'support'},
        {id: 5, name: 'Способы оплаты', bottomComponent: 'payments'},
    ]

    const showBottomSheetHistory = useCallback((index) => {
        history.current?.snapToIndex(index);
    }, []);

    const showBottomSheetFavorites = useCallback((index) => {
        favorites.current?.snapToIndex(index);
    }, []);

    const showBottomSheetFaq = useCallback((index) => {
        faq.current?.snapToIndex(index);
    }, []);

    const showBottomSheetSupport = useCallback((index) => {
        support.current?.snapToIndex(index);
    }, []);

    const handleNavigationClick = (navigateTo) => {
        switch (navigateTo) {
            case 'history':
                showBottomSheetHistory(0)
                break;
            case 'favorites':
                showBottomSheetFavorites(0)
                break;
            case 'faq':
                showBottomSheetFaq(0)
                break;
            case 'support':
                showBottomSheetSupport(0)
                break;
            case 'payments':
                navigation.navigate('PaymentMethods')
                break;
            default:
                break;
        }
    }


    const documents = [
        {id: 1, name: 'Договор аренды', documentUrl: 'http://mttp-renaissance.333.kg/files/w4mZFGm1BwNHBX5lvTeJvGIUi.pdf'},
        {id: 2, name: 'Лицензионное соглашения', documentUrl: 'http://mttp-renaissance.333.kg/files/kmfVTfdgAmoQihzVMfDGihHLE.pdf'},
        {id: 3, name: 'Условия использования', documentUrl: 'http://broker.data.kg/files/dogovor.pdf'},
    ]

    function handleBack() {
        navigation.navigate('HomePage')
    }

    const handleShowDogovor = (item) => {
        console.log(item)
        navigation.navigate("DocsView", { item });
    };

    function handleClickLogout() {
        navigation.replace('Creeting')
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.sideBarContainer}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userNameTitle}>Привет, {username} </Text>
                        <Feather name="settings" size={20} color={colors.mainPurple}/>
                    </View>

                    <TouchableOpacity onPress={() => {handleBack()}} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonGroupContainer}>
                    {buttons.map((item) => (
                        <TouchableOpacity
                            style={styles.navigateButton}
                            key={item.id}
                            onPress={() => {handleNavigationClick(item.bottomComponent)}}
                        >
                            <Text style={styles.navigateButtonText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.bottomButtonsGroup}>
                <View style={styles.appVersionContainer}>
                    <Text style={styles.appVersionText}>MIG Apartment</Text>
                    <Text style={styles.versionTitle}> * Версия (1.0.0)</Text>
                </View>

                <View style={styles.documentsContainer}>
                    {documents.map((item)=> (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => {handleShowDogovor(item)}}
                        >
                            <Text style={styles.documentNameText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity
                onPress={() => {handleClickLogout()}}>
                    <Text style={styles.logoutButton}>Выйти</Text>
                </TouchableOpacity>
            </View>

             <FaqBottomSheet faq = {faq}/>
             <Favorites favorites = {favorites}/>
             <Support support = {support}/>
            <HistoryOrder history = {history}/>

        </View>
    )
}
