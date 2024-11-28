import {View, Text, TouchableOpacity} from "react-native";
import {styles} from './style'
import {Feather, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {colors} from "../../constants/constants";
import {useNavigation} from "@react-navigation/native";
import FaqBottomSheet from "../../components/FaqBottomSheet/FaqBottomSheet";
import Favorites from "../../components/Favorites/Favorites";
import Support from "../../components/Support/Support";
import HistoryOrder from "../../components/HistoryOrder/HistoryOrder";
import {useDispatch, useSelector} from "react-redux";
import Details from "../../components/Details/Details";
import moment from "moment/moment";
import Booking from "../../components/Booking/Booking";
import {getMyBookingHistory, logoutUser} from "../../store/reducers/requestSlice";

export default function BurgerMenu({ route, navigation }) {
    const { detailsRef ,booking } = route.params;

    const history = useRef(null)
    const favorites = useRef(null)
    const faq = useRef(null)
    const support = useRef(null)
    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.saveDataSlice)

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
        displayedDate: moment(),
    });

    useEffect(() => {
        dispatch(getMyBookingHistory({codeid: data.userId}))
    }, [data]);

    const buttons = [
        {id: 1, name: 'История аренды', bottomComponent: 'history'},
        {id: 2, name: 'Избранное', bottomComponent: 'favorites'},
        {id: 3, name: 'Частые вопросы', bottomComponent: 'faq'},
        {id: 4, name: 'Служба поддержки', bottomComponent: 'support'},
        // {id: 5, name: 'Способы оплаты', bottomComponent: 'payments'},
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

    const onDatesChange = (dates) => {
        const newStartDate = dates.startDate ? moment(dates.startDate) : selectedDates.startDate;
        const newEndDate = dates.endDate ? moment(dates.endDate) : selectedDates.endDate;
        setSelectedDates({ ...selectedDates, startDate: newStartDate, endDate: newEndDate });

        if(selectedDates.endDate) {
            setTimeout(() => {
                setIsOpen(false)
            }, 5000)
        }
    };


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
        { id: 1, name: 'Договор оферты', documentUrl: 'http://admin-kvartel.ibm.kg/files/dogovorArend.pdf' },
        { id: 2, name: 'Правила бронирования', documentUrl: 'http://admin-kvartel.ibm.kg/files/praviloBron.pdf' },
        { id: 3, name: 'Согласие на обработку персональных данных', documentUrl: 'http://admin-kvartel.ibm.kg/files/soglasie.pdf' },
    ]

    function handleBack() {
        navigation.navigate('HomePage')
    }

    const handleShowDogovor = (item) => {
        navigation.navigate("DocsView", { item, detailsRef ,booking });
    };

    function handleClickLogout() {
        dispatch(logoutUser({codeid: data.userId}))
        navigation.replace('Creeting')
    }

    const username =  data.fio.split(' ')

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.sideBarContainer}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userNameTitle}>Привет, {username[1]} </Text>
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

            {/*<DateRangePicker*/}
            {/*    onChange={onDatesChange}*/}
            {/*    endDate={selectedDates.endDate}*/}
            {/*    startDate={selectedDates.startDate}*/}
            {/*    displayedDate={selectedDates.displayedDate}*/}
            {/*    range*/}
            {/*    open={isOpen}*/}
            {/*>*/}
            {/*    <View />*/}
            {/*</DateRangePicker>*/}

             <FaqBottomSheet faq = {faq}/>
            <HistoryOrder history = {history} detailsRef={detailsRef} />
             <Favorites favorites = {favorites}  detailsRef={detailsRef} />
            <Details detailsRef={detailsRef} booking={booking}/>
            <Booking booking={booking} selectedDates={selectedDates} setIsOpen={setIsOpen}/>

             <Support support = {support}/>
        </View>
    )
}
