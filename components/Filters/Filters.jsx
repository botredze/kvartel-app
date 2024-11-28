import React, {useCallback, useEffect, useMemo, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Modal} from "react-native";
import BottomSheet, {BottomSheetFlatList, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from './style';
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {convenience} from "../../constants/constants";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ConvenienceItem from "../ConvenienceItem/ConvenienceItem";
import {changeFilters, changeSelectedItems, changeSelectedRooms} from "../../store/reducers/stateSlice";
import {useDispatch, useSelector} from "react-redux";
import {apartamentFilters} from "../../store/reducers/requestSlice";
import Calendar from "../Calendar/Calendar";
import dayjs from 'dayjs';
import { toggleFilteredApartamentsVisibility } from "../../store/reducers/visibilitySlice";


export default function Filters(props) {
    const {filterRef, filtered} = props

    const {selectedItems, selectedRooms, filters} = useSelector((state) => state.stateSlice)
    const {filtredApartaments} = useSelector((state) => state.requestSlice)
    const snapPoints = useMemo(() => ['95%'], []);
    const [isOpenFilters, setIsOpenFilters] = useState(false);

    const [countGuest, setCountGuest] = useState(0);
    const [countBeds, setCountBeds] = useState(0);
    const [countTualete, setCountTualete] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(14069);
    const [selectedDates, setSelectedDates] = useState({ start: null, end: null });

    const [modalVisible, setModalVisible] = useState(false);

    const [activeNow, setActiveNow] = useState(false);
    const [activeTomorrow, setActiveTomorrow] = useState(false);
    const [activeDate, setActiveDate] = useState(false);
    const [activeBronType, setActiveBronType] = useState('all');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const dispatch = useDispatch()

    const saveFilters = (localFilters) => {
        dispatch(changeFilters(localFilters));
    };

    const applyDebouncedFilters = (localFilters) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            dispatch(apartamentFilters({ ...localFilters }));
        }, 300);

        setDebounceTimeout(newTimeout);
    };

    useEffect(() => {
        const localFilters = {
            status: 1,
            date_from: selectedDates.start || 0,
            date_to: selectedDates.end || 0,
            roomsCounts: selectedRooms || [],
            convensions: selectedItems?.map(id => ({ codeid: id })) || [],
            bookingType: activeBronType === 'all' ? 0 : (activeBronType === 'contactless' ? 2 : 3) || 0,
            priceMin: minPrice || 20,
            priceMax: maxPrice || 0,
            floor: countGuest || 0,
            num_bathroom: countTualete || 0,
            num_guests: countBeds || 0
        };

        saveFilters(localFilters);
        applyDebouncedFilters(localFilters);

        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [
        countGuest,
        countBeds,
        countTualete,
        minPrice,
        maxPrice,
        selectedItems,
        selectedRooms,
        activeNow,
        activeTomorrow,
        activeDate,
        activeBronType,
        selectedDates
    ]);

    const handleIncrement = (setter, value) => {
        setter(prev => prev + value);
    };
    const handleDecrement = (setter, value) => {
        setter(prev => (prev > 0 ? prev - value : 0));
    };

    const handleModalClose = () => setModalVisible(false);

    const handleSliderChange = (values) => {
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    const handleMinPriceChange = (value) => {
        const newMinPrice = parseInt(value) || 0;
        setMinPrice(newMinPrice);
    };

    const handleMaxPriceChange = (value) => {
        const newMaxPrice = parseInt(value) || 0;
        setMaxPrice(newMaxPrice);
    };


    const handleNowPress = () => {
        setActiveNow(true);
        setActiveTomorrow(false);
        setActiveDate(false);
    
        setSelectedDates({ start: dayjs().startOf('day'), end: dayjs().endOf('day') });
        setIsOpenFilters(false); 
    };
    
    const handleTomorrowPress = () => {
        setActiveNow(false);
        setActiveTomorrow(true);
        setActiveDate(false);
    
        setSelectedDates({
            start: dayjs().add(1, 'day').startOf('day'),
            end: dayjs().add(1, 'day').endOf('day')
        });
        setIsOpenFilters(false); 
    };
    
    const handleSelectDatePress = () => {
        setActiveNow(false);
        setActiveTomorrow(false);
        setActiveDate(true);
    
        setIsOpenFilters(true);
    };
    

    const handleDateSelect = (dates) => {
        setSelectedDates(dates);
    };

    const handleRoomPress = (room) => {
        if (selectedRooms?.includes(room)) {
            dispatch(changeSelectedRooms(selectedRooms?.filter((item) => item !== room)))
        } else {
            dispatch(changeSelectedRooms([...selectedRooms, room]));
        }
    };

    const handleBronTypePress = (type) => setActiveBronType(type);

    const handleSelect = (id) => {
        if (selectedItems?.includes(id)) {
            dispatch(changeSelectedItems(selectedItems?.filter((itemId) => itemId !== id)));
        } else {
            dispatch(changeSelectedItems([...selectedItems, id]));
        }
    };

    const toggleFilters = () => {
        filterRef?.current?.close();
        setCountGuest(0);
        setCountBeds(0);
        setCountTualete(0);
        setMinPrice(0);
        setMaxPrice(14069);
        setActiveNow(false);
        setActiveTomorrow(false);
        setActiveDate(false);
        setActiveBronType('all');
        setSelectedDates({start: null, end: null});
    };


    const resetFilters = () => {
        setCountGuest(0);
        setCountBeds(0);
        setCountTualete(0);
        setMinPrice(0);
        setMaxPrice(14069);
        setActiveNow(false);
        setActiveTomorrow(false);
        setActiveDate(false);
        setIsOpenFilters(false)
        setActiveBronType('all');
        setSelectedDates({start: null, end: null});
    };

    const openFileredData = useCallback((index) => {
        dispatch(toggleFilteredApartamentsVisibility(false))
        filtered.current?.snapToIndex(index);
    }, []);

    return (
            <BottomSheet
            snapPoints={snapPoints}
            index={-1}
            ref={filterRef}
            enableContentPanningGesture={false}
            enablePanDownToClose={true}
            enableHandlePanningGesture={true}
            //onClose={toggleFilters}
            style={{position: "relative"}}
        >
            <BottomSheetScrollView style={styles.sheetContent}>

                <View style={styles.sectionTitle}>
                    <Text style={styles.title}>Фильтры</Text>

                    <TouchableOpacity onPress={resetFilters} style={styles.resetBtn}>
                        <Text style={styles.resetTitle}>Сбросить фильтры</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleFilters} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white"/>
                    </TouchableOpacity>
                </View>

                <View style={{...styles.section, marginBottom: 0}}>
                    <Text style={styles.subtitle}>КВАРТИРЫ ДОСТУПНЫЕ</Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={handleNowPress}
                            style={[styles.bigBtn, activeNow && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, activeNow && styles.activeBtnTitle]}>Сейчас</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleTomorrowPress}
                            style={[styles.bigBtn, activeTomorrow && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, activeTomorrow && styles.activeBtnTitle]}>Завтра</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleSelectDatePress}
                            style={[styles.selectDateBigBtn, activeDate && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, activeDate && styles.activeBtnTitle]}>Выбрать дату</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {isOpenFilters && (
                    <BottomSheetView style={styles.selectDateContainer}>
                        <Calendar onDateSelect={handleDateSelect} />
                    </BottomSheetView>
                )}

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Количество комнат</Text>
                    <View style={{...styles.row, justifyContent: "flex-start"}}>
                        <TouchableOpacity
                            onPress={() => handleRoomPress('0')}
                            style={[styles.selectCountBtn, selectedRooms?.includes('0') && styles.activeBtnCountState]}>
                            <Text
                                style={[styles.bigBtnTitle, selectedRooms?.includes('0') && styles.activeBtnTitleCountState]}>Студия</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('1')}
                            style={[styles.selectDateSmallBtn, selectedRooms?.includes('1') && styles.activeBtnCountState]}>
                            <Text
                                style={[styles.bigBtnTitle, selectedRooms?.includes('1') && styles.activeBtnTitleCountState]}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('2')}
                            style={[styles.selectDateSmallBtn, selectedRooms?.includes('2') && styles.activeBtnCountState]}>
                            <Text
                                style={[styles.bigBtnTitle, selectedRooms?.includes('2') && styles.activeBtnTitleCountState]}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('3')}
                            style={[styles.selectDateSmallBtn, selectedRooms?.includes('3') && styles.activeBtnCountState]}>
                            <Text
                                style={[styles.bigBtnTitle, selectedRooms?.includes('3') && styles.activeBtnTitleCountState]}>3</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('4')}
                            style={[styles.selectDateSmallBtn, selectedRooms?.includes('4') && styles.activeBtnCountState]}>
                            <Text
                                style={[styles.bigBtnTitle, selectedRooms?.includes('4') && styles.activeBtnTitleCountState]}>4+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.sectionType}>
                    <Text style={styles.subtitleType}>Тип брони</Text>

                    <View style={{...styles.row, gap: 5, justifyContent: 'flex-start'}}>
                        <TouchableOpacity
                            onPress={() => handleBronTypePress('all')}
                            style={[styles.selectBronBtn, activeBronType === 'all' && styles.activeBronBtn]}>
                            <Text
                                style={[styles.typeBron, activeBronType === 'all' && styles.activeTypeBron]}>Все</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleBronTypePress('contactless')}
                            style={[styles.selectNotContactBtn, activeBronType === 'contactless' && styles.activeBronBtn]}>
                            <Text style={[styles.typeBron, activeBronType === 'contactless' && styles.activeTypeBron]}>Бесконтактная
                                аренда</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Feather name="info" size={20}
                                         color={activeBronType === 'contactless' ? '#fff' : "#7250FF"}/>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleBronTypePress('classic')}
                            style={[styles.selectBronBtn, activeBronType === 'classic' && styles.activeBronBtn]}>
                            <Text style={[styles.typeBron, activeBronType === 'classic' && styles.activeTypeBron]}>Классическая
                                аренда</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Ценовой диапазон</Text>
                    <View style={styles.priceInputsContainer}>
                        <TextInput
                            style={styles.priceInput}
                            value={minPrice.toString()}
                            keyboardType="numeric"
                            onChangeText={handleMinPriceChange}
                        />
                        <Text style={styles.dash}> — </Text>
                        <TextInput
                            style={styles.priceInput}
                            value={maxPrice.toString()}
                            keyboardType="numeric"
                            onChangeText={handleMaxPriceChange}
                        />
                    </View>
                    <View>
                        <MultiSlider
                            containerStyle={styles.slider}
                            values={[minPrice, maxPrice]}
                            min={0}
                            max={10000}
                            step={1}
                            selectedStyle={styles.selectedTrack}
                            unselectedStyle={styles.unselectedTrack}
                            trackStyle={styles.track}
                            markerStyle={styles.marker}
                            pressedMarkerStyle={styles.pressedMarker}
                            onValuesChange={handleSliderChange}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>ПАРАМЕТРЫ КВАРТИРЫ</Text>
                    <View style={styles.column}>
                        <View style={styles.parametrsContainer}>
                            <Text style={styles.paramsTitle}>Гостей</Text>
                            <View style={styles.counter}>
                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleDecrement(setCountGuest, 1)}
                                >
                                    <Feather name="minus-circle" size={30} color="#ccc"/>
                                </TouchableOpacity>

                                <Text style={styles.subtitle}>{countGuest}</Text>

                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleIncrement(setCountGuest, 1)}
                                >
                                    <AntDesign name="pluscircleo" size={28} color="#ccc"/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.parametrsContainer}>
                            <Text style={styles.paramsTitle}>Кроватей</Text>
                            <View style={styles.counter}>
                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleDecrement(setCountBeds, 1)}
                                >
                                    <Feather name="minus-circle" size={30} color="#ccc"/>
                                </TouchableOpacity>

                                <Text style={styles.subtitle}>{countBeds}</Text>

                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleIncrement(setCountBeds, 1)}
                                >
                                    <AntDesign name="pluscircleo" size={28} color="#ccc"/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.parametrsContainer}>
                            <Text style={styles.paramsTitle}>Уборные</Text>
                            <View style={styles.counter}>
                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleDecrement(setCountTualete, 1)}
                                >
                                    <Feather name="minus-circle" size={30} color="#ccc"/>
                                </TouchableOpacity>

                                <Text style={styles.subtitle}>{countTualete}</Text>

                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleIncrement(setCountTualete, 1)}
                                >
                                    <AntDesign name="pluscircleo" size={28} color="#ccc"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Удобства</Text>

                    <BottomSheetFlatList
                        data={convenience}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ConvenienceItem
                                item={item}
                                onSelect={handleSelect}
                                isSelected={selectedItems.includes(item.id)}
                            />
                        )}
                    />
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleModalClose}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTextTitle}>
                                Процесс заселения автоматизирован
                            </Text>
                            <Text style={styles.modalText}>
                                вы получите исчерпывающий список инструкций по заселению, а также возможность открытия и
                                закрытия дверей через наше приложение.
                            </Text>
                            <TouchableOpacity style={styles.closeButtonModal} onPress={handleModalClose}>
                                <Text style={styles.closeButtonText}>ПОНЯТНО</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </BottomSheetScrollView>

            {filtredApartaments && filtredApartaments.length > 0 ? (
                <TouchableOpacity style={styles.showResultsButton} onPress={() => {openFileredData(0)}}>
                    <Text style={styles.showResultsButtonText}>Показать ({filtredApartaments.length}) предложений</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.showResultsButton}>
                    <Text style={styles.showResultsButtonText}>Нет предложений</Text>
                </TouchableOpacity>
            )
            }
        </BottomSheet>

    );
}
