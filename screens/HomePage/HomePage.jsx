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
import moment from "moment";
import FilteredApartaments from "../../components/FilteredApartaments/FilteredApartaments";
import {
    applyPayment,
    changeSearchData,
    checkUserVerify,
    getApartments, getMyActiveBooking,
    searchByAddress
} from "../../store/reducers/requestSlice";
import { debounce } from "lodash"
import {changeBookingModal, changeShowSuccessBookingModal} from "../../store/reducers/stateSlice";
import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showListApartments, setShowApartments] = useState(true)
    const dispatch = useDispatch();

    const [showStatus, setShowStatus] = useState(false)
    const [statusText, setStatusText] = useState('')

    const navigation = useNavigation();
    const filterRef = useRef(null)
    const detailsRef = useRef(null)
    const previewButton = useRef(null)
    const booking = useRef(null)
    const filtered = useRef(null)

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
        displayedDate: moment(),
    });

    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const [selectedDatesFilters, setSelectedDatesFilters] = useState({
        startDate: null,
        endDate: null,
        displayedDate: moment(),
    });

    const snapPoints = useMemo(() => ['10%', '94%'], [])

    const toggleFilters = useCallback((index) => {
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
        }, 200);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearchSubmit = () => {
        setShowApartments(true)
        setShowRecommendations(false);
    };

    const handleClearSearch = () => {
        clear()
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

    const handlePressBurgerButton = () => {
        navigation.navigate('BurgerMenu', { detailsRef, booking });
    };

    const {data} = useSelector((state) => state.saveDataSlice)
    const {listApartments, search, activeBooking} = useSelector((state) => state.requestSlice);
    const {showBookingModal, bookingData, showSuccessBookingModal, paymentData} = useSelector((state) => state.stateSlice)

    console.log(data, 'data')

    useEffect(() => {
        const searchData = {
            codeid_client: data.userId,
            address: ''
        }
        dispatch(changeSearchData(searchData))
    }, [data])

    useEffect(()=> {
        console.log(data.userId, 'data.codeid')
        if(data.userId) {
            console.log(data.userId, 'data.codeid')
            dispatch(getMyActiveBooking({codeid: data.userId}))
        }
    }, [data])

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

    const onDatesChangeFilters = (dates) => {
        const newStartDate = dates.startDate ? moment(dates.startDate) : selectedDatesFilters.startDate;
        const newEndDate = dates.endDate ? moment(dates.endDate) : selectedDatesFilters.endDate;
        setSelectedDatesFilters({ ...selectedDatesFilters, startDate: newStartDate, endDate: newEndDate });

        // if(selectedDatesFilters.endDate) {
        //     setTimeout(() => {
        //         setIsOpenFilters(false)
        //     }, 5000)
        // }
    };

    const handleModalClose = () => {
        setShowStatus(false)
    };

    const handleStatus = () => {
        dispatch(checkUserVerify({ codeid: data.userId }));
        setShowStatus(true);
        if (data.verificated == 'false' && data.rejectRegistration) {
            setStatusText("Ваша регистрация отклонена")
        } else {
            setShowStatus(true)
        }
    }

    const handleChangeInputText =  (text) => {
        setSearchQuery(text)
         searchData(text)
        dispatch(changeSearchData({...search, address: searchQuery}))
        search?.length === 0 && dispatch(getApartments({status: 1, codeid_client: data.userId}));
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
        dispatch(getApartments({status: 1, codeid_client: data.userId}))
    }

    const handleCloseBookingModal = () => {
        dispatch(changeBookingModal(false))
    };

    const handleActivateBooking = () => {
       dispatch(applyPayment({paymentData,navigation}))
    };

    const handleCloseBookingModal2 = () => {
        dispatch(changeShowSuccessBookingModal(false))
    };

    const handlePressMyBooking = () => {
        navigation.navigate('MyBooking')
    };

    console.log(!activeBooking.status, '!activeBooking')
    return (
        <SafeAreaView style={styles.container}>
            <Maps previewButton={previewButton}/>

            {data.verificated === 'true' && (
                <View style={styles.butgerMenuButtonContainer}>
                    <TouchableOpacity
                        style={styles.burgerMenuButton}
                        onPress={() => {
                            handlePressBurgerButton()
                        }}
                    >
                        <FontAwesome6 name="grip-lines" size={28} color="#613DDC"/>
                    </TouchableOpacity>
                    {activeBooking?.address?.length > 0  && (
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
                        height: data.verificated === 'false' && data.rejectRegistration ? 50 : 40
                    }}
                    onPress={handleStatus}
                >
                    <Text style={{
                        ...styles.statusTitle,
                        color: data.verificated === 'false' && data.rejectRegistration ? '#6200EE' : '#FF3B30'
                    }}>{data.verificated === 'false' && data.rejectRegistration ? ' Ваш запрос на регистрацию находится в обработке' : 'Ваши данные для регистрации отклонены, необходимо заполнить доменты заново'}</Text>
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

            <Filters filtered={filtered} filterRef={filterRef} selectedDatesFilters ={selectedDatesFilters} setIsOpenFilters={setIsOpenFilters}/>

            <FilteredApartaments filtered={filtered} detailsRef={detailsRef}/>
            <PreviewBottiomSheet previewButton={previewButton} booking={booking}
                                 details={detailsRef}/>

            <Details detailsRef={detailsRef} booking={booking}/>
            <Booking booking={booking} selectedDates={selectedDates} setIsOpen={setIsOpen} setSelectedDates = {setSelectedDates}/>
            <DateRangePicker
                onDatesChange={onDatesChangeFilters}
                selectedDatesFilters={selectedDatesFilters}
                isOpenFilters={isOpenFilters}
                setIsOpenFilters={setIsOpenFilters}
            />

            <DateRangePicker
                onDatesChange={onDatesChange}
                selectedDatesFilters={selectedDates}
                isOpenFilters={isOpen}
                setIsOpenFilters={setIsOpen}
            />

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
                    </View>Ds
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
                         <Text style={styles.modalText}>{`Вы действительно хотите забронировать апартаменты: ${bookingData.name} с ${bookingData.date_from.format('DD.MM.YYYY')} на ${bookingData.days_amount} дня ? \n\nСумма к оплате: ${bookingData.summ}`}</Text>)}
                        <TouchableOpacity style={styles.closeButtonModal} onPress={handleActivateBooking}>
                            <Text style={styles.closeButtonText}>Оплатить</Text>
                        </TouchableOpacity>
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
