import {SafeAreaView, View, Text, TouchableOpacity, Modal} from "react-native";
import {styles} from './style'
import Maps from "../../components/Maps/Maps";
import BottomSheet, {BottomSheetFlatList, BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import {Searchbar} from 'react-native-paper';
import Recomendation from "../../components/Recomendation/Recomendation";
import Filters from "../../components/Filters/Filters";
import Details from "../../components/Details/Details";
import PreviewBottiomSheet from "../../components/PreviewBottiomSheet/PreviewBottiomSheet";
import Booking from "../../components/Booking/Booking";
import {Entypo, FontAwesome6, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import FilteredApartaments from "../../components/FilteredApartaments/FilteredApartaments";
import {
    applyPayment,
    changeSearchData,
    checkUserVerify,
    clearApartmentDetail,
    getApartments, getMyActiveBooking,
    searchByAddress
} from "../../store/reducers/requestSlice";
import { debounce } from "lodash"
import {changeBookingModal, changeShowSuccessBookingModal, clearFilters, clearPaymentData} from "../../store/reducers/stateSlice";
import { toggleFiltersVisibility } from "../../store/reducers/visibilitySlice";
import { getLocalDataUser } from "../../helpers/returnDataUser";
import { changeLocalData } from "../../store/reducers/saveDataSlice";


export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showListApartments, setShowApartments] = useState(true)
    const dispatch = useDispatch();

    const [showStatus, setShowStatus] = useState(false)
    const [statusText, setStatusText] = useState('')

    useEffect(() => {
        getLocalDataUser({changeLocalData, dispatch})
        if (data?.userId) {
            dispatch(getApartments({ status: 0, codeid_client: data?.userId }));
            dispatch(getMyActiveBooking({ codeid: data?.userId }));
        }
    }, [data?.userId, dispatch]);



    const navigation = useNavigation();
    const filterRef = useRef(null)
    const detailsRef = useRef(null)
    const previewButton = useRef(null)
    const booking = useRef(null)
    const filtered = useRef(null)


    const {data} = useSelector((state) => state.saveDataSlice)
    const {listApartments, search, activeBooking, searchPreloade} = useSelector((state) => state.requestSlice);
   const {showBookingModal, bookingData, showSuccessBookingModal, paymentData, rejectComment} = useSelector((state) => state.stateSlice)
   const {filtersVisible,filteredApartamentsVisible, previewBottomSheetVisible, detailsVisible, bookingVisible } = useSelector((state) => state.visibilitySlice)

    const snapPoints = useMemo(() => ['10%', '94%'], [])
    
    const toggleFilters = useCallback((index) => {
        dispatch(clearApartmentDetail())
        dispatch(clearFilters())
        dispatch(toggleFiltersVisibility(true))
        filterRef.current?.snapToIndex(index);
    }, []);

    const inputRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery) {
                setRecommendations([
                    'Vefa',
                    'ул. Тыныстанова',
                    'рабочий городок',
                    'район филармонии',
                    'район Политех',
                    '6 микрорайон',
                    '12 микрорайон',
                    'Джал',
                    'Улан 2',
                    'Кок жар',
                    'Восток 5',
                ]);
            }
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearchSubmit = () => {
        setShowApartments(true)
        setShowRecommendations(false);
    };

    const handleClearSearch = () => {
        clear()
        dispatch(getApartments({status: 0, codeid_client: data.userId}))
        setSearchQuery("");
        setShowApartments(true)
        setShowRecommendations(false);
        handleSearchSubmit()
        inputRef.current.blur();
    };

    const handleFocusSearch = () => {
        setShowRecommendations(true)
        setShowApartments(false)
    };


    useEffect ( () => {
        if(searchPreloade) {
            setShowRecommendations(false)
            setShowApartments(true)
        }
    }, [searchPreloade])


    const handlePressBurgerButton = () => {
        navigation.navigate('BurgerMenu', { detailsRef, booking });
    };


    useEffect(() => {
        const searchData = {
            codeid_client: data.userId,
            address: ''
        }
        dispatch(changeSearchData(searchData))
    }, [data])

    useEffect(()=> {
        if(data.userId) {
            dispatch(getMyActiveBooking({codeid: data.userId}))
        }
    }, [data])


    const handleModalClose = () => {
        setShowStatus(false)
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (data.verificated === 'false') {
                dispatch(checkUserVerify({ codeid: data.userId }));
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [data.verificated, data.userId, dispatch]);


    const handleStatus = () => {
        dispatch(checkUserVerify({ codeid: data.userId }));
        setShowStatus(true);
        if (data.verificated == 'false' && data.rejectRegistration == 'true') {
            setStatusText("Ваша регистрация отклонена")
        } else {
            setShowStatus(true)
        }
    }



    const handleChangeInputText =  (text) => {
        console.log(text, 'text');
        
        setSearchQuery(text)
         searchData(text)
        dispatch(changeSearchData({...search, address: searchQuery}))
        search?.length === 0 && dispatch(getApartments({status: 0, codeid_client: data.userId}));
    };

    const searchData = useCallback(
        debounce((text) => {
            if (text?.length > 1) {
                dispatch(searchByAddress({...search, address: text}))
            }
        }, 500),
        []
    );

    const clear = () => {
        dispatch(changeSearchData({
            codeid_client: data.userId,
            address: ''}))
        dispatch(getApartments({status: 0, codeid_client: data.userId}))
    }

    const handleCloseBookingModal = () => {
        dispatch(changeBookingModal(false))
    };

    const handleActivateBooking = () => {
       dispatch(applyPayment({paymentData,navigation}))
    };


    const cancelBooking = () => {
        dispatch(changeBookingModal(false))
        dispatch(clearPaymentData())
    }

    const handleCloseBookingModal2 = () => {
        dispatch(changeShowSuccessBookingModal(false))
    };

    const handlePressMyBooking = () => {
        navigation.navigate('MyBookingList')
    };

    return (
        <SafeAreaView style={styles.container}>
            <Maps previewButton={previewButton}/>

            {data.verificated == 'true' && (
                <View style={styles.butgerMenuButtonContainer}>
                    <TouchableOpacity
                        style={styles.burgerMenuButton}
                        onPress={() => {
                            handlePressBurgerButton()
                        }}
                    >
                        <FontAwesome6 name="grip-lines" size={28} color="#613DDC"/>
                    </TouchableOpacity>
                    {activeBooking?.length > 0  && (
                    <TouchableOpacity
                        style={styles.burgerMenuButton}
                        onPress={() => {
                            handlePressMyBooking();
                        }}>
                        <Ionicons name="timer-outline" size={28} color="#613DDC" />
                    </TouchableOpacity>)}
                </View>
            )}

            {data.verificated === 'false' && (
                <TouchableOpacity
                    style={{
                        ...styles.registrationStatusContainer,
                        height: data.rejectRegistration === 'true' ? 80 : 40
                    }}
                    onPress={handleStatus}
                >
                    {data.rejectRegistration === 'true' ? (
                        <View style={{gap: 5}}>
                            <Text style={{
                                ...styles.statusTitle,
                                color: '#FF3B30'
                            }}>
                                Ваши данные для регистрации отклонены, для решения напишите в поддержку
                            </Text>

                            <Text
                                style={{
                                    ...styles.statusTitle,
                                    color: '#FF3B30'
                                }}>Комментарий: {rejectComment}</Text>

                            {/*<TouchableOpacity*/}
                            {/*    style={styles.retryRegistrationButton}*/}
                            {/*    onPress={() => navigation.navigate('UserSettingScreen')}*/}
                            {/*>*/}
                            {/*    <Text style={styles.retryRegistrationText}>Повторная регистрация</Text>*/}
                            {/*</TouchableOpacity>*/}

                        </View>
                    ) : (
                    <Text style={{
                            ...styles.statusTitle,
                            color: '#6200EE'
                        }}>
                            Ваш запрос на регистрацию находится в обработке
                        </Text>
                    )}
                </TouchableOpacity>
            )}


            <BottomSheet
                snapPoints={snapPoints}
                enableContentPanningGesture={false}
                enableHandlePanningGesture={true}
            >

                <View style={styles.searchContainer}>
                    <Searchbar
                        ref={inputRef}
                        style={styles.searchInput}
                        placeholder="Поиск по адресу"
                        value={searchQuery}
                        onChangeText={handleChangeInputText}
                        onFocus={handleFocusSearch}
                        onSubmitEditing={handleSearchSubmit}
                        icon="magnify"
                        clearIcon='close'
                        onClearIconPress={handleClearSearch}
                    />
                    <TouchableOpacity style={styles.filterButton} onPress={() => toggleFilters(0)}>
                        <Text style={styles.filterButtonText}>Фильтры</Text>
                    </TouchableOpacity>
                </View>

                {showRecommendations && (
                    <BottomSheetView style={styles.recommendationList}>
                        <BottomSheetFlatList
                            data={recommendations}
                            renderItem={({item}) => <Recomendation item={item}
                                setSearchQuery={setSearchQuery}
                                handleSearchSubmit={handleSearchSubmit}/>}
                            keyExtractor={(item, index) => item?.guid}
                            style={styles.recommendationList}
                        />
                    </BottomSheetView>
                )}


                {showListApartments && (
                    listApartments && listApartments.length > 0 ? (
                        <BottomSheetFlatList
                            data={listApartments}
                            renderItem={({ item }) => (
                                <ApartmentCard apartment={item} detailsRef={detailsRef} />
                            )}
                            keyExtractor={(item) => item?.guid}
                            style={styles.apartmentList}
                        />
                    ) : (
                        <View style={styles.dataNotFound}>
                            <Entypo name="emoji-sad" size={54} color="#2B2B2B" />
                            <Text style={styles.dataNotFoundText}>
                               Данные не найдены
                            </Text>
                        </View>
                    )
                )}

            </BottomSheet>

            <Filters filtered={filtered} filterRef={filterRef}/>
            <FilteredApartaments filtered={filtered} detailsRef={detailsRef}/>
            <PreviewBottiomSheet previewButton={previewButton} booking={booking} details={detailsRef}/> 
            <Details detailsRef={detailsRef} booking={booking} previewButton={previewButton}/> 
            <Booking booking={booking}  />

            <Modal
                animationType="slide"
                transparent={true}
                visible={showStatus}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTextTitle}>Запрос на регистрацию находиться в обработке</Text>
                        <Text style={styles.modalText}>{'Мы получили ваши данные, наши администраторы проверят в скором времени и верифицируют вас.\n\nПо завершению верификации вы получите уведомление об этом и доступ в приложение и всем его функциям,'}</Text>
                        <TouchableOpacity style={styles.closeButtonModal} onPress={handleModalClose}>
                            <Text style={styles.closeButtonText}>ПОНЯТНО</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showBookingModal}
                onRequestClose={handleCloseBookingModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTextTitle}>Подтверждение действия</Text>
                        {bookingData.date_from && (
                         <Text style={styles.modalText}>{`Вы действительно хотите забронировать апартаменты: ${bookingData.name} с ${bookingData.date_from.format('DD.MM.YYYY')} на ${bookingData.days_amount} суток ? \n\nСумма к оплате: ${bookingData.summ}`}</Text>)}
                        
                       <View style = {styles.modalButtonGroup}>
                            <TouchableOpacity style={styles.closeButtonModal} onPress={cancelBooking}>
                                <Text style={{...styles.closeButtonText, color: '#ff4e4a'}}>Отменить </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.closeButtonModal} onPress={handleActivateBooking}>
                                <Text style={styles.closeButtonText}>Оплатить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showSuccessBookingModal}
                onRequestClose={handleCloseBookingModal2}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTextTitle}>Бронь активирована</Text>
                        <Text style={styles.modalText}>
                            {`Вы успешно оплатили бронь, перейдите в главное меню, у вас появиться специальная кнопка для перехода в меню брони`}
                        </Text>
                        <TouchableOpacity style={styles.closeButtonModal} onPress={handleCloseBookingModal2}>
                            <Text style={styles.closeButtonText}>Подтвердить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}
