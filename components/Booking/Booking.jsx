import {Image, Text, TouchableOpacity, View} from "react-native";
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from './styles'
import React, {useCallback, useMemo, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {API} from "../../env";

export default function Booking({booking, setIsOpen, selectedDates}) {
    const snapPoints = useMemo(() => ['57%'], []);
    const navigation = useNavigation();
    const [activeDate, setActiveDate] = useState(false);

    const handleSelectDatePress = () => {
        setIsOpen(true)
        setActiveDate(true);
    };

    const { apartmentDetail, bottomSheetPreloader} = useSelector((state) => state.requestSlice);

    const closeBooking = () => {
        booking.current?.close()
    };

    const numberOfDays = selectedDates?.endDate?.diff(selectedDates.startDate, 'days');
    const totalAmount = numberOfDays * (apartmentDetail?.price || 0);


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
                            source={{ uri: `${API}/${apartmentDetail?.photos[0]?.pathUrl}` }}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.nameText}>{apartmentDetail.apartament_name}</Text>
                            <Text style={styles.adressText}>{apartmentDetail.address}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {closeBooking()}} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="white"/>
                    </TouchableOpacity>
                </BottomSheetView>

                <BottomSheetView style={styles.selectDateContainer}>
                    <TouchableOpacity
                        onPress={handleSelectDatePress}
                        style={[styles.selectDateBigBtn, activeDate && styles.activeBtn]}>
                        <Text style={[styles.bigBtnTitle, activeDate && styles.activeBtnTitle]}>Выбрать дату</Text>
                    </TouchableOpacity>
                </BottomSheetView>

                {selectedDates.startDate && (
                    <BottomSheetView style={styles.selectedDatesContainer}>
                        <Text style={styles.selectedDateText}>
                            Дата начала: {selectedDates.startDate.format('DD.MM.YYYY')}
                        </Text>
                        {selectedDates.endDate && (
                            <Text style={styles.selectedDateText}>
                                Дата окончания: {selectedDates.endDate.format('DD.MM.YYYY')}
                            </Text>
                        )}
                    </BottomSheetView>
                )}


                <BottomSheetView style={styles.infoBlock}>
                    <Text style={styles.infoText}>Дополнительно: {apartmentDetail?.additional_information}</Text>
                    <Text style={styles.outTimeText}>Выберите дату заезда и дату выезда</Text>
                    <Text style={styles.outTimeText}> Заезд с 14-00 * Выезд до 12-00 </Text>
                </BottomSheetView>

                <BottomSheetView style={styles.pricesContainer}>
                    <View style={styles.priceTitle}>
                        <Text style={styles.priceText}>{apartmentDetail?.price}сом</Text>
                        <Text style={styles.priceInfoText}>за 1 сутки дней</Text>
                    </View>
                    {/*<View style={styles.priceTitle}>*/}
                    {/*    <Text style={styles.priceInfoText}>Доплата при заселении:</Text>*/}
                    {/*    <Text style={styles.priceText}>{remainingAmount} сом</Text>*/}
                    {/*</View>*/}
                </BottomSheetView>

                <TouchableOpacity
                    onPress={() => handleStartPayment()}
                    style={styles.buyButton}
                >
                    <Text style={{fontSize: 17, fontWeight: '500', color: '#fff'}}>Внести оплату {numberOfDays} дней: {totalAmount} сом</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheet>
    )
}
