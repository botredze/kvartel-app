import {Image, Text, TouchableOpacity, View} from "react-native";
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from './styles'
import React, {useCallback, useMemo} from "react";
import {Ionicons} from "@expo/vector-icons";
import {dates} from "../../constants/constants";
import Dates from "../Dates/Dates";
import {useNavigation} from "@react-navigation/native";

export default function Booking({item, booking}) {
    const snapPoints = useMemo(() => ['57%'], []);
    const navigation = useNavigation();

    const prepaymentPercentage = 15;
    const prepaymentAmount = Math.round((item?.price * prepaymentPercentage) / 100);
    const remainingAmount = Math.round(item?.price - prepaymentAmount);

    const closeBooking = () => {
        booking.current?.close()
    };
    // navigation.navigate('PaymentMethods')
    const shadowBlock = useCallback(
        (props) => (
            <BottomSheetBackdrop
                opacity={0.8}
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            ></BottomSheetBackdrop>
        ),
        []
    );

    const handleStartPayment = () => {
         navigation.navigate('PaymentMethods')
    };

    return (
        <BottomSheet
            ref={booking}
            snapPoints={snapPoints}
            index={-1}
            backdropComponent={shadowBlock}
            enablePanDownToClose={true}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
            onClose={closeBooking}
        >
            <BottomSheetView style={styles.container}>
                <BottomSheetView style={styles.contentContainer}>
                    <View style={styles.imageAndAdress}>
                        <Image
                            source={{uri: item?.images[0]?.imageUrl}}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.adressText}>{item.address}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {closeBooking()}} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white"/>
                    </TouchableOpacity>
                </BottomSheetView>

                <BottomSheetView style={styles.kalendar}>
                    <Text style={styles.nameText}>Июль</Text>

                    <BottomSheetScrollView
                        style={styles.selectDates}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {dates.map((data) => (
                            <Dates itemDate={data} key={data?.id}/>
                        ))}
                    </BottomSheetScrollView>
                </BottomSheetView>

                <BottomSheetView style={styles.infoBlock}>
                    <Text style={styles.outTimeText}>Выберите дату заезда и дату выезда</Text>
                    <Text style={styles.outTimeText}>Заезд с {item.entryTime} * Выезд до {item.outTime}</Text>
                </BottomSheetView>

                <BottomSheetView style={styles.pricesContainer}>
                    <View style={styles.priceTitle}>
                        <Text style={styles.priceText}>{item.price}сом</Text>
                        <Text style={styles.priceInfoText}>за 1 сутки дней</Text>
                    </View>
                    <View style={styles.priceTitle}>
                        <Text style={styles.priceInfoText}>Доплата при заселении:</Text>
                        <Text style={styles.priceText}>{remainingAmount} сом</Text>
                    </View>
                </BottomSheetView>

                <TouchableOpacity
                    onPress={() => handleStartPayment()}
                    style={styles.buyButton}
                >
                    <Text style={{fontSize: 17, fontWeight: '500', color: '#fff'}}>Внести предоплату {prepaymentAmount} сом ({prepaymentPercentage}%)</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheet>
    )
}
