import {View, Text, TouchableOpacity} from "react-native";
import React, {useCallback, useMemo, useState} from "react";
import BottomSheet, {BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import BottomSheetSideBar from "../BottomSheetSideBar/BottomSheetSideBar";
import {useDispatch, useSelector} from "react-redux";
import {styles} from "./styles";
import {AntDesign, Feather} from "@expo/vector-icons";
import {applyExtendPayment, infoNextBooking} from "../../store/reducers/requestSlice";
import {changeExtendBookingData, changePaymentData} from "../../store/reducers/stateSlice";
import {useNavigation} from "@react-navigation/native";
import Loader from "../Loader";

export default function ExtendTheLease({extend, formatDate, handleBack}) {
    const snapPoints = useMemo(() => ['50%'], []);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [counts, setCounts] = useState(0);
    const [loading, setLoading] = useState(false); // Create loading state

    const {activeBooking, apartmentDetail, preloader} = useSelector((state) => state.requestSlice);
    const { paymentData } = useSelector((state) => state.stateSlice);
    const {data} = useSelector((state) => state.saveDataSlice);

    const totalAmount = counts !== null
        ? counts * (apartmentDetail?.price || 0)
        : apartmentDetail?.price || 0;

    const handleIncrement = (setter, value) => {
        setter(prev => {
            const newCount = prev + value;
            dispatch(infoNextBooking({
                codeid_apartment: apartmentDetail.codeid,
                date_from: activeBooking.date_to,
                days_amount: newCount
            }));
            dispatch(changePaymentData({
                pg_amount: totalAmount,
                pg_description: `Продление аренды апартаментов ${apartmentDetail.apartament_name} на ${counts} дней`,
                pg_user_phone: data.phoneNumber,
                pg_user_contact_email: data.email,
                pg_user_id: data.userId
            }));

            return newCount;
        });
    };

    const handleDecrement = (setter, value) => {
        setter(prev => {
            const newCount = prev > 0 ? prev - value : 0;
            dispatch(infoNextBooking({
                codeid_apartment: apartmentDetail.codeid,
                date_from: activeBooking.date_to,
                days_amount: newCount
            }));
            dispatch(changePaymentData({
                pg_amount: totalAmount,
                pg_description: `Продление аренды апартаментов ${apartmentDetail.apartament_name} на ${counts} дней`,
                pg_user_phone: data.phoneNumber,
                pg_user_contact_email: data.email,
                pg_user_id: data.userId
            }));

            return newCount;
        });
    };


    const formatDateToCheckout = (date) => {
        const checkoutDate = new Date(date);
        const day = String(checkoutDate.getDate()).padStart(2, '0');
        const month = String(checkoutDate.getMonth() + 1).padStart(2, '0');
        const year = checkoutDate.getFullYear();
        return `${day}.${month}.${year} в 12:00`;
    };

    const calculateNewCheckoutDate = (date, extraDays) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + extraDays);
        return formatDateToCheckout(newDate);
    };

    const shadowBlock = useCallback(
        (props) => (
            <BottomSheetBackdrop
                opacity={0.7}
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        []
    );

    const handleExtendArend = async () => {
       await dispatch(changeExtendBookingData({
            date_from: activeBooking.date_to,
            days_amount: counts,
            codeid_client: data.userId,
            codeid_apartment: apartmentDetail.codeid,
            name: apartmentDetail.apartament_name,
            summ: totalAmount
        }));

       dispatch(applyExtendPayment({paymentData, navigation}));
    };

    return (
        <BottomSheet
            ref={extend}
            index={0}
            enablePanDownToClose={true}
            backdropComponent={shadowBlock}
            onClose={handleBack}
            snapPoints={snapPoints}
        >
            {preloader ? (
                <Loader />
            ) : (
                <>
                    <BottomSheetSideBar handleClickBack={handleBack} title="Продление аренды" />

                    <View style={styles.container}>
                        <View style={styles.timeContainer}>
                            <Text style={styles.nameText}>Нынешние даты посещения</Text>
                            <Text style={styles.nameText}>Дата начала: {activeBooking?.date_from ? formatDate(activeBooking.date_from) : ''}</Text>
                            <Text style={styles.nameText}>Дата окончания: {activeBooking?.date_to ? formatDate(activeBooking.date_to) : ''}</Text>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.nameText}>На сколько дней вы хотите продлить?</Text>
                        </View>

                        <View style={styles.parametrsContainer}>
                            <Text style={styles.paramsTitle}>Количество дней</Text>
                            <View style={styles.counter}>
                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleDecrement(setCounts, 1)}
                                >
                                    <Feather name="minus-circle" size={30} color="#ccc" />
                                </TouchableOpacity>

                                <Text style={styles.subtitle}>{counts}</Text>

                                <TouchableOpacity
                                    style={styles.countButtons}
                                    onPress={() => handleIncrement(setCounts, 1)}
                                >
                                    <AntDesign name="pluscircleo" size={28} color="#ccc" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.orderContainer}>
                            <Text style={styles.summText}>
                                Дата выселения: {activeBooking?.date_to ? calculateNewCheckoutDate(activeBooking.date_to, counts) : ''}
                            </Text>
                            <Text style={styles.summText}>Цена за сутки: {apartmentDetail.price} сом</Text>
                            <Text style={styles.summText}>Сумма к оплате: {totalAmount} сом</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.goMapButton}
                            onPress={handleExtendArend}
                        >
                            <Text style={styles.goMapButtonText}>Оплатить: {totalAmount} сом</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </BottomSheet>
    );
}
