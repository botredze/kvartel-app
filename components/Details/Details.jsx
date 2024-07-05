import BottomSheet, {BottomSheetFlatList, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useCallback, useMemo, useState} from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import {styles} from './styles'
import {Entypo, Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import {colors, convenience, rules} from "../../constants/constants";
import ConvenienceItem from "../ConvenienceItem/ConvenienceItem";
import ConvenienceViewItem from "../ConvenienceItem/ConveninceViewItem";
import Rules from "../Rules/Rules";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import RecomendationsCard from "../RecomendationsCard/RecomendationsCard";

export default function Details({detailsRef, booking}) {
    const snapPoints = useMemo(() => ['100%'], []);
    const apartomentDetails = {
        name: 'Студия №3',
        address: 'Бишкек, ул.Токтоналиева 12, 3 этаж, квартира № 74',
        photos: [
            {photoUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'},
            {photoUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'},
            {photoUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'},
        ],
        closedDate: "03 июля",
        entryTime: '14-00',
        outTime: '12-00',
        arendType: 'Классическая аренда',
        guest: 2,
        bads: 1,
        apartamentType: 'Студия',
        tualets: 1,
        convenience: [
            {id: 1},
            {id: 2},
            {id: 3},
        ],
        apartamentRules: [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4},
        ],
        price: 1432,

        othersNearby: [
            {
                id: 1,
                name: 'Двухкомнатная квартира',
                address: 'Кудыкины горы',
                price: 2519,
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    }
                ]
            },
            {
                id: 2,
                name: 'Однакомнатная комната где то там',
                address: 'Кудыкины горы',
                price: 2519,
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    }
                ]
            },
            {
                id: 3,
                name: 'Трешка в центре, элитка',
                address: 'Кудыкины горы',
                price: 2519,
                images: [
                    {
                        imageUrl: 'https://www.akchabar.kg/media/news/79e701e2-8328-40b8-b3d6-fdec2ee0141d.jpg'
                    }
                ]
            }
        ]
    }

    const selectedConvenienceIds = apartomentDetails.convenience.map(item => item.id);

    const filteredConvenience = convenience.filter(item => selectedConvenienceIds.includes(item.id));

    const closeDetailButtomSheet = () => {
        detailsRef.current?.close();
    }

    const handleClickBooking = useCallback((index) => {
        booking.current?.snapToIndex(index);
    }, []);


    return (
        <BottomSheet
            ref={detailsRef}
            snapPoints={snapPoints}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
            index={-1}
            onClose={closeDetailButtomSheet}
        >
            <BottomSheetScrollView  style={styles.container}>
                <View style={styles.sidebar}>
                    <Text style={styles.mainTitleText}>{apartomentDetails.name}</Text>
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
                    <Text style={styles.addressText}>{apartomentDetails.address}</Text>
                </View>

                <View style={styles.wrapperContainer}>
                    <Swiper style={styles.wrapper} showsButtons loop={false}>
                        {apartomentDetails?.photos?.map((item) => (
                            <View key={item.id} style={styles.imageContainer}>
                                <Image
                                    source={{uri: item?.photoUrl}}
                                    style={styles.image}
                                />
                            </View>
                        ))}
                    </Swiper>
                </View>

                <View style={styles.approveTimeContainer}>
                    <Text style={styles.approveText}>{apartomentDetails.closedDate} - ближайшая доступная дата</Text>
                    <Text style={styles.outTimeText}>Заезд с {apartomentDetails.entryTime} * Выезд до {apartomentDetails.outTime}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.arendType}>
                        <Text style={styles.buttonInnerText}>{apartomentDetails.arendType}</Text>
                        <TouchableOpacity onPress={()=>{}}>
                            <Feather name="info" size={24} color='#7250FF'/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.functuionsContainer}>
                            <Ionicons name="people-outline" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartomentDetails.guest} гостя</Text>
                        </View>
                        <View style={styles.functuionsContainer}>
                            <Ionicons name="bed-outline" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartomentDetails.bads} местная кровать</Text>
                        </View>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={styles.functuionsContainer}>
                            <MaterialCommunityIcons name="door-open" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartomentDetails.apartamentType}</Text>
                        </View>
                        <View style={styles.functuionsContainer}>
                            <FontAwesome6 name="toilet" size={22} color={colors.mainGrey} />
                            <Text style={styles.buttonInnerText}>{apartomentDetails.tualets} уборная</Text>
                        </View>
                    </View>
                </View>

                <BottomSheetView style={styles.convenienceContainer}>
                    <Text style={styles.contentTitle}>Удобства</Text>
                    <BottomSheetFlatList
                        data={filteredConvenience}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (<ConvenienceViewItem item={item}/>
                        )}
                        contentContainerStyle={styles.flatListContainer}
                    />
                    <TouchableOpacity>
                        <Text style={styles.watchMoreText}>Показать ещё</Text>
                    </TouchableOpacity>
                </BottomSheetView>

                <BottomSheetView style={styles.convenienceContainer}>
                    <Text style={styles.contentTitle}>Правило дома</Text>

                    <View style={styles.listContainer}>{rules.map((item) => (<Rules item={item} key = {item.id.toString()}/>))}</View>

                    <TouchableOpacity>
                        <Text style={styles.watchMoreText}>Показать ещё</Text>
                    </TouchableOpacity>
                </BottomSheetView>

                <BottomSheetScrollView
                    style={styles.recomendationContainer}
                >
                    <Text style={styles.contentTitle}>Другие дома рядом</Text>
                    <BottomSheetScrollView
                        style={styles.recomendated}
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                    >{apartomentDetails.othersNearby.map((item)=> (
                          <RecomendationsCard apartment={item} key={item.id}/>
                    ))}</BottomSheetScrollView>
                </BottomSheetScrollView>
            </BottomSheetScrollView >

            <BottomSheetView style={styles.selectDateContainer}>
                <TouchableOpacity style={styles.selectDateBtn}
                                  onPress={() => {handleClickBooking(0)}}
                >
                    <Text style={styles.selectDateBtnText}>Выбрать дату</Text>
                    <Text style={styles.selectDateBtnText}>{apartomentDetails.price} сутки</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
                    <Entypo name="dots-three-horizontal" size={22} color="#666666" />
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheet>
    )
}

