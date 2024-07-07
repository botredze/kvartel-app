import React, {useCallback, useMemo, useState} from "react";
import {View, Text, TextInput, Switch, Button, ScrollView, TouchableOpacity, Modal} from "react-native";
import BottomSheet, {BottomSheetFlatList, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from './style';
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {colors, convenience, dates} from "../../constants/constants";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ConvenienceItem from "../ConvenienceItem/ConvenienceItem";
import Dates from "../Dates/Dates";

export default function Filters({ filterRef}) {
    const snapPoints = useMemo(() => ['96%'], []);
    const [selectDate, setSelectDate] = useState(false)
    const [countGuest, setCountGuest] = useState(0);
    const [countBeds, setCountBeds] = useState(0);
    const [countTualete, setCountTualete] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(14069);
    const [sliderValues, setSliderValues] = useState([0, 14069]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [activeNow, setActiveNow] = useState(false);
    const [activeTomorrow, setActiveTomorrow] = useState(false);
    const [activeDate, setActiveDate] = useState(false);
    const [activeRoom, setActiveRoom] = useState('');
    const [activeBronType, setActiveBronType] = useState('all');
    const [selectedDates, setSelectedDates] = useState([]);

    const handleIncrement = (setter, value) => {
        setter(prev => prev + value);
    };

    const handleDatePress = (date) => {
        setSelectedDates((prevSelected) => {
            if (prevSelected.includes(date)) {
                return prevSelected.filter((item) => item !== date);
            } else {
                return [...prevSelected, date];
            }
        });
    };


    const handleDecrement = (setter, value) => {
        setter(prev => (prev > 0 ? prev - value : 0));
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleSliderChange = (values) => {
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    const handleMinPriceChange = (value) => {
        const newMinPrice = parseInt(value) || 0;
        setMinPrice(newMinPrice);
        setSliderValues([newMinPrice, maxPrice]);
    };

    const handleMaxPriceChange = (value) => {
        const newMaxPrice = parseInt(value) || 0;
        setMaxPrice(newMaxPrice);
        setSliderValues([minPrice, newMaxPrice]);
    };

    const handleNowPress = () => {
        setActiveNow(true);
        setActiveTomorrow(false);
        setActiveDate(false);
        setSelectDate(false)
    };

    const handleTomorrowPress = () => {
        setActiveNow(false);
        setActiveTomorrow(true);
        setActiveDate(false);
        setSelectDate(false)
    };

    const handleSelectDatePress = () => {
        setActiveNow(false);
        setActiveTomorrow(false);
        setActiveDate(true);
        setSelectDate(true)
    };

    const handleRoomPress = (room) => {
        setSelectedRooms((prevSelected) => {
            if (prevSelected.includes(room)) {
                return prevSelected.filter((item) => item !== room);
            } else {
                return [...prevSelected, room];
            }
        });
    };

    const handleBronTypePress = (type) => {
        setActiveBronType(type);
    };

    const handleSelect = (id) => {
        setSelectedItems((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((itemId) => itemId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const toggleFilters = () => {
        filterRef.current?.close();
    };

    return (
        <BottomSheet
            snapPoints={snapPoints}
            index={-1}
            ref={filterRef}
            enableContentPanningGesture={false}
            enablePanDownToClose={true}
            enableHandlePanningGesture={true}
            onClose={toggleFilters}
        >
            <BottomSheetScrollView style={styles.sheetContent}>

                <View style={styles.sectionTitle}>
                    <Text style={styles.title}>Фильтры</Text>
                    <TouchableOpacity onPress={() => {toggleFilters()}} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
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

                {selectDate && (
                    <BottomSheetView style={styles.selectDateContainer}>
                        <Text style={styles.nameText}>Июль</Text>

                        <BottomSheetScrollView
                            style={styles.selectDates}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {dates.map((data) => (
                                <Dates
                                    itemDate={data}
                                    key={data?.id}
                                    isSelected={selectedDates.includes(data?.id)}
                                    onPress={() => handleDatePress(data?.id)}
                                />
                            ))}
                        </BottomSheetScrollView>
                    </BottomSheetView>
                )}

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Количество комнат</Text>
                    <View style={{ ...styles.row, justifyContent: "flex-start" }}>
                        <TouchableOpacity
                            onPress={() => handleRoomPress('studio')}
                            style={[styles.selectCountBtn, selectedRooms.includes('studio') && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, selectedRooms.includes('studio') && styles.activeBtnTitle]}>Студия</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('1')}
                            style={[styles.selectDateSmallBtn, selectedRooms.includes('1') && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, selectedRooms.includes('1') && styles.activeBtnTitle]}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('2')}
                            style={[styles.selectDateSmallBtn, selectedRooms.includes('2') && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, selectedRooms.includes('2') && styles.activeBtnTitle]}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('3')}
                            style={[styles.selectDateSmallBtn, selectedRooms.includes('3') && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, selectedRooms.includes('3') && styles.activeBtnTitle]}>3</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleRoomPress('4+')}
                            style={[styles.selectDateSmallBtn, selectedRooms.includes('4+') && styles.activeBtn]}>
                            <Text style={[styles.bigBtnTitle, selectedRooms.includes('4+') && styles.activeBtnTitle]}>4+</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={styles.subtitle}>Тип брони</Text>

                    <View style={{...styles.row, gap: 5, justifyContent: 'flex-start'}}>
                        <TouchableOpacity
                        onPress={() => handleBronTypePress('all')}
                        style={[styles.selectBronBtn, activeBronType === 'all' && styles.activeBronBtn]}>
                        <Text style={[styles.typeBron, activeBronType === 'all' && styles.activeTypeBron]}>Все</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleBronTypePress('contactless')}
                        style={[styles.selectNotContactBtn, activeBronType === 'contactless' && styles.activeBronBtn]}>
                        <Text style={[styles.typeBron, activeBronType === 'contactless' && styles.activeTypeBron]}>Бесконтактная аренда</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Feather name="info" size={20} color='#7250FF'/>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleBronTypePress('classic')}
                        style={[styles.selectBronBtn, activeBronType === 'classic' && styles.activeBronBtn]}>
                        <Text style={[styles.typeBron, activeBronType === 'classic' && styles.activeTypeBron]}>Классическая аренда</Text>
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
                                    <Feather name="minus-circle" size={30} color="#ccc" />
                                </TouchableOpacity>

                                <Text style={styles.subtitle}>{countGuest}</Text>

                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleIncrement(setCountGuest, 1)}
                                >
                                    <AntDesign name="pluscircleo" size={28} color="#ccc" />
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
                                    <Feather name="minus-circle" size={30} color="#ccc" />
                                </TouchableOpacity>

                                <Text style={styles.subtitle}>{countBeds}</Text>

                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleIncrement(setCountBeds, 1)}
                                >
                                    <AntDesign name="pluscircleo" size={28} color="#ccc" />
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
                                    <Feather name="minus-circle" size={30} color="#ccc" />
                                </TouchableOpacity>

                                <Text style={styles.subtitle}>{countTualete}</Text>

                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleIncrement(setCountTualete, 1)}
                                >
                                    <AntDesign name="pluscircleo" size={28} color="#ccc" />
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
                        renderItem={({ item }) => (
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
                                вы получите исчерпывающий список инструкций по заселению, а также возможность открытия и закрытия дверей через наше приложение.
                            </Text>
                            <TouchableOpacity style={styles.closeButtonModal} onPress={handleModalClose}>
                                <Text style={styles.closeButtonText}>ПОНЯТНО</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </BottomSheetScrollView>
        </BottomSheet>
    );
}
