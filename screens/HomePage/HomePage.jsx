import {SafeAreaView, View, Text, FlatList, TouchableOpacity, Modal} from "react-native";
import {styles} from './style'
import Maps from "../../components/Maps/Maps";
import BottomSheet, {BottomSheetFlatList, BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import {Searchbar, TextInput} from 'react-native-paper';
import Recomendation from "../../components/Recomendation/Recomendation";
import Filters from "../../components/Filters/Filters";
import Details from "../../components/Details/Details";
import PreviewBottiomSheet from "../../components/PreviewBottiomSheet/PreviewBottiomSheet";
import Booking from "../../components/Booking/Booking";
import {Entypo, FontAwesome6} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import DateRangePicker from "react-native-daterange-picker";
import moment from "moment";
import FilteredApartaments from "../../components/FilteredApartaments/FilteredApartaments";
import {changeSearchData, getApartments, searchByAddress} from "../../store/reducers/requestSlice";
import { debounce } from "lodash"

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

    const disabledDates = [
        moment('2024-07-02'),
        moment('2024-07-03'),
    ];

    const snapPoints = useMemo(() => ['10%', '96%'], [])

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
    const {listApartments, search} = useSelector((state) => state.requestSlice);

    useEffect(() => {
        const searchData = {
            codeid_client: data.userId,
            address: ''
        }
        dispatch(changeSearchData(searchData))
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

        console.log(selectedDatesFilters.endDate)
        if(selectedDatesFilters.endDate) {
            setTimeout(() => {
                setIsOpenFilters(false)
            }, 5000)
        }
    };

    const handleModalClose = () => {
        setShowStatus(false)
    };

    const handleStatus = () => {
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
                        color: data.verificated === 'false' && data.rejectRegistration ? '#FF3B30' : '#6200EE'
                    }}>{data.verificated === 'false' && data.rejectRegistration ? 'Ваши данные для регистрации отклонены, необходимо заполнить документы заново' : 'Ваш запрос на регистрацию находится в обработке'}</Text>
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
                            renderItem={({item}) => <Recomendation
                                item={item}
                                setSearchQuery={setSearchQuery}
                                handleSearchSubmit={handleSearchSubmit}/>}
                            keyExtractor={(item, index) => index.toString()}
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
                            keyExtractor={(item) => item?.codeid}
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
            <Booking booking={booking} selectedDates={selectedDates} setIsOpen={setIsOpen}/>
            <DateRangePicker
                onChange={onDatesChange}
                endDate={selectedDates.endDate}
                startDate={selectedDates.startDate}
                displayedDate={selectedDates.displayedDate}
                range
                open={isOpen}
            >
                <View />
            </DateRangePicker>

            <DateRangePicker
                onChange={onDatesChangeFilters}
                endDate={selectedDatesFilters.endDate}
                startDate={selectedDatesFilters.startDate}
                displayedDate={selectedDatesFilters.displayedDate}
                range
                open={isOpenFilters}
            >
                <View />
            </DateRangePicker>


            <Modal
                animationType="slide"
                transparent={true}
                visible={showStatus}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTextTitle}>
                            Запрос не регистрацию находиться в обработке
                        </Text>
                        <Text style={styles.modalText}>
                            {'Мы получили ваши данные, наши администраторы проверят в скором времени и верифицируют вас.\n\nПо завершению верификации вы получите уведомление об этом и доступ в приложение и всем его функциям,'}
                        </Text>
                        <TouchableOpacity style={styles.closeButtonModal} onPress={handleModalClose}>
                            <Text style={styles.closeButtonText}>ПОНЯТНО</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
