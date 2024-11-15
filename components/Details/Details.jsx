import BottomSheet, {BottomSheetFlatList, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useCallback, useMemo, useState} from "react";
import {View, Text, TouchableOpacity, Image, Alert} from "react-native";
import {styles} from './styles'
import {
    AntDesign,
    Entypo,
    Feather,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import {colors, convenience, rules} from "../../constants/constants";
import ConvenienceViewItem from "../ConvenienceItem/ConveninceViewItem";
import Rules from "../Rules/Rules";
import RecomendationsCard from "../RecomendationsCard/RecomendationsCard";
import {useDispatch, useSelector} from "react-redux";
import {API} from "../../env";
import Loader from "../Loader";
import {addOrDeleteFavorites, clearApartmentDetail} from "../../store/reducers/requestSlice";

export default function Details({detailsRef, booking}) {

    const snapPoints = useMemo(() => ['98%'], []);

    const [visibleConvenienceCount, setVisibleConvenienceCount] = useState(3);
    const [visibleRulesCount, setVisibleRulesCount] = useState(3);
    const [isConvenienceExpanded, setIsConvenienceExpanded] = useState(false);
    const [isRulesExpanded, setIsRulesExpanded] = useState(false);
    const { data } = useSelector((state) => state.saveDataSlice)


    const toggleConvenience = () => {
        if (isConvenienceExpanded) {
            setVisibleConvenienceCount(3);
        } else {
            setVisibleConvenienceCount(filteredConvenience.length);
        }
        setIsConvenienceExpanded(!isConvenienceExpanded);
    };

    const toggleRules = () => {
        if (isRulesExpanded) {
            setVisibleRulesCount(3);
        } else {
            setVisibleRulesCount(rules.length);
        }
        setIsRulesExpanded(!isRulesExpanded);
    };

    const dispatch = useDispatch();

    const { apartmentDetail, bottomSheetPreloader} = useSelector((state) => state.requestSlice);

    function handlePressFavirites(action) {
        console.log(action, 'action')
        switch (action) {
            case 1:
                //добавление
                dispatch(addOrDeleteFavorites({action: 0, userId: data.userId, apartamentId: apartmentDetail.codeid}))
                console.log({action: 0, userId: data.userId, apartamentId: apartmentDetail.codeid})
                break;
            case 2:
                //удаление
                dispatch(addOrDeleteFavorites({action: 1, userId: data.userId, apartamentId: apartmentDetail.codeid}))
                console.log({action: 1, userId: data.userId, apartamentId: apartmentDetail.codeid})
                break;
            default:
                console.log("Action Not FOUND");
        }
    }
    const selectedConvenienceIds = apartmentDetail?.conversions.map(item => item.codeid);

    const filteredConvenience = convenience.filter(item => selectedConvenienceIds.includes(item.id));

    const closeDetailButtomSheet = () => {
        dispatch(clearApartmentDetail())
        detailsRef?.current?.close();
    }

    const handleClickBooking = useCallback((index) => {
        booking.current?.snapToIndex(index);
    }, []);

    const formatDateToDDMMYYYY = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const getClosestAvailableDate = (dateToString) => {
        const dates = dateToString.split(',').map(date => new Date(date.trim()));
        const futureDates = dates.filter(date => date > new Date()).sort((a, b) => a - b);
        return futureDates.length > 0 ? futureDates[0] : null;
    };

    console.log(apartmentDetail, 'apartmentDetail')
    const closestAvailableDate = apartmentDetail?.date_to ? getClosestAvailableDate(apartmentDetail.date_to) : null;
    const formattedClosestDate = closestAvailableDate
        ? formatDateToDDMMYYYY(closestAvailableDate)
        : formatDateToDDMMYYYY(new Date());


    return (
        <BottomSheet
            ref={detailsRef}
            snapPoints={snapPoints}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
            index={-1}
           // onClose={closeDetailButtomSheet}
        >
            {bottomSheetPreloader === true ?  (
                <Loader/>
            ) : (
            <BottomSheetScrollView  style={styles.container}>
                <View style={styles.sidebar}>
                    <Text style={styles.mainTitleText}>{apartmentDetail?.apartament_name} </Text>
                    <TouchableOpacity onPress={() => {closeDetailButtomSheet()}} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white"/>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginTop: 10,}}>

                        {/*<Text style={styles.gapText}>Нет информации</Text>*/}
                        <FontAwesome5 name="walking" size={24} color="black"/>
                        <Text style={styles.gapTextTime}>(0 мин.)</Text>
                    </View>
                    <Text style={styles.addressText}>{apartmentDetail.address}</Text>
                </View>

                <View style={styles.wrapperContainer}>
                    <Swiper style={styles.wrapper} showsButtons loop={false}>
                        {apartmentDetail?.photos?.map((item) => (
                            <View key={item.codeid} style={styles.imageContainer}>
                                <Image
                                    source={{uri: `${API}/${item?.pathUrl}`}}
                                    style={styles.image}
                                />
                            </View>
                        ))}
                    </Swiper>

                    <View style={styles.favoriteHeart}>
                        {apartmentDetail && apartmentDetail?.favourite == 'true' ? (
                            <TouchableOpacity onPress={() => {handlePressFavirites(2)}}>
                                <AntDesign name="heart" size={25} color="#FF5244" />
                            </TouchableOpacity>
                        ): (
                            <TouchableOpacity onPress={() => {handlePressFavirites(1)}}>
                                <AntDesign name="hearto" size={25} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.approveTimeContainer}>
                    <Text style={styles.approveText}>
                        {formattedClosestDate ? `${formattedClosestDate} - ближайшая доступная дата` : 'Нет доступных дат'}
                    </Text>
                    <Text style={styles.outTimeText}> Заезд с 14-00 * Выезд до 12-00 </Text>

                    <Text style={styles.infoText}>Дополнительно: {apartmentDetail?.additional_information}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.arendType}>
                        <Text style={styles.buttonInnerText}>{apartmentDetail?.bookingType == 0 ? "Классическая аренда" : "Бесконтактная аренда"}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (apartmentDetail?.bookingType == 0) {
                                    Alert.alert("Информация", "При заселении требуется присутствие менеджера для передачи ключей от квартиры");
                                } else {
                                    Alert.alert("Информация", "Процесс заселения автоматизирован: вы получите список инструкций по заселению, так же возможность открытия и закрытия дверей через предоставленные специализированные коды");
                                }
                            }}
                        >
                            <Feather name="info" size={24} color='#7250FF' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.functuionsContainer}>
                            <Ionicons name="people-outline" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartmentDetail?.max_guest <= 0 ? 0 : apartmentDetail?.max_guest } гостей</Text>
                        </View>
                        <View style={styles.functuionsContainer}>
                            <Ionicons name="bed-outline" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartmentDetail?.num_guests} {apartmentDetail?.num_guests <= 1 ? 'местная кровать' : 'кровати'}</Text>
                        </View>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.functuionsContainer}>
                            <MaterialCommunityIcons name="door-open" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartmentDetail?.num_rooms == 0 ? "Студия" : apartmentDetail?.num_rooms} комнаты</Text>
                        </View>
                        <View style={styles.functuionsContainer}>
                            <FontAwesome6 name="toilet" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartmentDetail?.num_bathroom} уборная</Text>
                        </View>
                    </View>
                </View>
                {/*Удобства*/}
                <BottomSheetView style={styles.convenienceContainer}>
                    <Text style={styles.contentTitle}>Удобства</Text>
                    <BottomSheetFlatList
                        data={filteredConvenience.slice(0, visibleConvenienceCount)}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item }) => (<ConvenienceViewItem item={item} />)}
                        contentContainerStyle={styles.flatListContainer}
                    />
                    <TouchableOpacity onPress={toggleConvenience}>
                        <Text style={styles.watchMoreText}>
                            {isConvenienceExpanded ? 'Скрыть' : 'Показать ещё'}
                        </Text>
                    </TouchableOpacity>
                </BottomSheetView>

                {/*Правило дома*/}
                <BottomSheetView style={styles.convenienceContainer}>
                    <Text style={styles.contentTitle}>Правило дома</Text>
                    <View style={styles.listContainer}>
                        {rules.slice(0, visibleRulesCount).map((item) => (
                            <Rules item={item} key={item.id} />
                        ))}
                    </View>
                    <TouchableOpacity onPress={toggleRules}>
                        <Text style={styles.watchMoreText}>
                            {isRulesExpanded ? 'Скрыть' : 'Показать ещё'}
                        </Text>
                    </TouchableOpacity>
                </BottomSheetView>

                <BottomSheetScrollView style={{...styles.recommendationContainer, marginBottom: apartmentDetail.othersHere.length > 0 ? 50 : 0}}>
                    <Text style={styles.contentTitle}>Другие дома рядом</Text>
                    {apartmentDetail && apartmentDetail.othersHere && apartmentDetail.othersHere.length > 0 ? (
                        <BottomSheetScrollView
                            style={styles.recommended}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {apartmentDetail.othersHere.map((item) => (
                                <RecomendationsCard apartment={item} key={item.codeid} />
                            ))}
                        </BottomSheetScrollView>
                    ) : (
                        <View style={styles.notRecommended}>
                            <Text style={styles.notRecommendedText}>Пока квартир по близости нет</Text>
                        </View>
                    )}
                </BottomSheetScrollView>
            </BottomSheetScrollView >
            )}

            <BottomSheetView style={styles.selectDateContainer}>
                <TouchableOpacity
                    style={[
                        styles.selectDateBtn,
                        data.verificated === 'false' && { opacity: 0.5 }, // Меняем стиль для disabled
                    ]}
                    onPress={() => {handleClickBooking(0)}}
                    disabled={data.verificated == 'false'} // Блокируем кнопку
                >
                    <Text style={styles.selectDateBtnText}>Выбрать дату</Text>
                    <Text style={styles.selectDateBtnText}>{apartmentDetail.price} сутки</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
                    <Entypo name="dots-three-horizontal" size={22} color="#666666" />
                </TouchableOpacity>
            </BottomSheetView>

        </BottomSheet>
    )
}

