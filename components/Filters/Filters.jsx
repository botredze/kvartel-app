import React, {useCallback, useMemo, useState} from "react";
import {View, Text, TextInput, Switch, Button, ScrollView, TouchableOpacity, Modal} from "react-native";
import BottomSheet, {BottomSheetFlatList, BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {styles} from './style';
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {colors, convenience, dates} from "../../constants/constants";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ConvenienceItem from "../ConvenienceItem/ConvenienceItem";

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

    const handleIncrement = (setter, value) => {
        setter(prev => prev + value);
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
                        <TouchableOpacity onPress={() => {}} style={styles.bigBtn}>
                            <Text style={styles.bigBtnTitle}>Сейчас</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {}} style={styles.bigBtn}>
                            <Text style={styles.bigBtnTitle}>Завтра</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {}} style={styles.selectDateBigBtn}>
                            <Text style={styles.bigBtnTitle}>Выбрать дату</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {selectDate && (
                    <View style={styles.selectDateContainer}>
                        <View style={styles.selectDateSidebar}>
                            <Text>Июнь</Text>
                            <TouchableOpacity onPress={() => {
                            }} style={styles.resetDate}>
                                <Text>Сбросить даты</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.selectDateInnerContainer}>
                            <BottomSheetScrollView style={styles.scrollPanelContainer}>
                                {dates.map((item) => (
                                    <View key={item.id} style={styles.dateContent}>
                                        <Text>{item.name}</Text>
                                        <TouchableOpacity style={styles.dateBtn}>
                                            <Text>{item.date}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </BottomSheetScrollView>
                        </View>

                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Количество комнат</Text>
                    <View style={{...styles.row, justifyContent: "flex-start"}}>
                        <TouchableOpacity onPress={() => {}} style={{ ...styles.selectDateSmallBtn, width: 90}}>
                            <Text style={styles.bigBtnTitle}>Студия</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={styles.selectDateSmallBtn}>
                            <Text style={styles.bigBtnTitle}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={styles.selectDateSmallBtn}>
                            <Text style={styles.bigBtnTitle}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={styles.selectDateSmallBtn}>
                            <Text style={styles.bigBtnTitle}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={styles.selectDateSmallBtn}>
                            <Text style={styles.bigBtnTitle}>4+ </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subtitle}>Тип брони</Text>

                    <View style={{...styles.row, gap: 5, justifyContent: 'flex-start'}}>
                        <TouchableOpacity onPress={() => {}} style={{...styles.selectBronBtn, width: 70}}>
                            <Text style={styles.typeBron}>Все</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {}} style={{...styles.selectBronBtn, flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                             <Text style={styles.typeBron}>Бесконтактная аренда</Text>
                            <TouchableOpacity onPress={()=> setModalVisible(true)}>
                             <Feather name="info" size={20} color='#7250FF'/>
                            </TouchableOpacity>
                         </TouchableOpacity>

                        <TouchableOpacity onPress={() => {}} style={styles.selectBronBtn}>
                            <Text style={styles.typeBron}>Классическая аренда</Text>
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
