import {Image, Text, TouchableOpacity, View} from "react-native";
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import {styles} from './styles'
import React, {useCallback, useMemo, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {API} from "../../env";
import {changeBookingData, changeBookingModal, changePaymentData} from "../../store/reducers/stateSlice";
import Calendar from "../Calendar/Calendar";

export default function Booking({booking, setIsOpen}) {
    const snapPoints = useMemo(() => ['60%'], []);
    const navigation = useNavigation();
    const [activeDate, setActiveDate] = useState(false);
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.saveDataSlice)
    const [selectedDates, setSelectedDates] = useState({ start: null, end: null });

    const handleDateSelect = (dates) => {
        setSelectedDates(dates);
    };

    const handleSelectDatePress = () => {
        setIsOpen(true)
        setActiveDate(true);
    };

    const { apartmentDetail, bottomSheetPreloader, paymentFinished} = useSelector((state) => state.requestSlice);

    const closeBooking = () => {
        booking.current?.close()
    };

    if(paymentFinished){
        closeBooking()
    }

    const numberOfDays = selectedDates?.end && selectedDates?.start
        ? Math.max(selectedDates.end.diff(selectedDates.start, 'days'), 1) // Ensure at least 1 day
        : null;

    const totalAmount = numberOfDays !== null
        ? numberOfDays * (apartmentDetail?.price || 0)
        : apartmentDetail?.price || 0;


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
        dispatch(changeBookingModal(true))
        dispatch(changeBookingData({
            date_from: selectedDates.end,
            days_amount:numberOfDays,
            codeid_client: data.userId,
            codeid_apartment: apartmentDetail.codeid,
            name: apartmentDetail.apartament_name,
            summ: totalAmount
        }))
        dispatch(changePaymentData({
            pg_amount: totalAmount,
            pg_description: `Аренда апартаментов ${apartmentDetail.apartament_name} на ${numberOfDays} дней`,
            pg_user_phone: data.phoneNumber,
            pg_user_contact_email: data.email,
            pg_user_id: data.userId}))
         //navigation.navigate('PaymentMethods')
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
                    <Calendar onDateSelect={handleDateSelect} />
                </BottomSheetView>

                <BottomSheetView style={styles.infoBlock}>
                    <Text style={styles.infoText}>Дополнительно: {apartmentDetail?.additional_information}</Text>
                    <Text style={styles.outTimeText}>Выберите дату заезда и дату выезда</Text>
                    <Text style={styles.outTimeText}> Заезд с 16-00 * Выезд до 12-00 </Text>
                </BottomSheetView>

                {selectedDates.start && (
                    <BottomSheetView style={styles.selectedDatesContainer}>
                        <Text style={styles.selectedDateText}>
                            Дата начала: {selectedDates.start.format('DD.MM.YYYY')}
                        </Text>
                        {selectedDates.end && (
                            <Text style={styles.selectedDateText}>
                                Дата окончания: {selectedDates.end.format('DD.MM.YYYY')}
                            </Text>
                        )}
                    </BottomSheetView>
                )}

                <BottomSheetView style={styles.pricesContainer}>
                    <View style={styles.priceTitle}>
                        <Text style={styles.priceText}>{apartmentDetail?.price} сом</Text>
                        <Text style={styles.priceInfoText}>за 1 сутки</Text>
                    </View>
                </BottomSheetView>

                <TouchableOpacity
                    onPress={numberOfDays !== null ? handleStartPayment : null}
                    style={[styles.buyButton, numberOfDays === null ?  styles.disabledButton : styles.buyButton ]}
                    disabled={numberOfDays == null}
                >
                    <Text style={{fontSize: 17, fontWeight: '500', color: '#fff'}}>
                        {numberOfDays !== null
                            ? `Внести оплату за ${numberOfDays === 1 ? 'сутки' : `${numberOfDays} суток`}: ${totalAmount} сом`
                            : `Внести оплату: ${totalAmount} сом`}
                    </Text>

                </TouchableOpacity>

            </BottomSheetView>
        </BottomSheet>
    )
}
