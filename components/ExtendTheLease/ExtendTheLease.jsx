import {View, Text, TouchableOpacity} from "react-native";
import React, {useCallback, useMemo, useState} from "react";
import BottomSheet, {BottomSheetBackdrop} from "@gorhom/bottom-sheet";
import BottomSheetSideBar from "../BottomSheetSideBar/BottomSheetSideBar";
import {useSelector} from "react-redux";
import {styles} from "./styles";
import {AntDesign, Feather} from "@expo/vector-icons";


export default function ExtendTheLease({extend, formatDate}) {
    const snapPoints = useMemo(() => ['70%'], []);
    const handleBack = () => {
        extend.current?.close()
    }

    const [counts, setCounts] = useState(0);
    const {activeBooking, apartmentDetail, paymentFinished} = useSelector((state) => state.requestSlice);


    const handleIncrement = (setter, value) => {
        setter(prev => prev + value);
    };
    const handleDecrement = (setter, value) => {
        setter(prev => (prev > 0 ? prev - value : 0));
    };

    const totalAmount = counts !== null
        ? counts * (apartmentDetail?.price || 0)
        : apartmentDetail?.price || 0;


    const shadowBlock = useCallback(
        (props) => (
            <BottomSheetBackdrop
                opacity={0.7}
                appearsOnIndex={1}
                disappearsOnIndex={-1}
                {...props}
            ></BottomSheetBackdrop>
        ),
        []
    );


    const handleExtendArend = () => {

    };
    return (
        <BottomSheet
            ref={extend}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={shadowBlock}
            onClose={handleBack}
            snapPoints={snapPoints}
        >

            <BottomSheetSideBar handleClickBack={handleBack} title='Продление аренды'/>

            <View style={styles.container}>

            <View style={styles.timeContainer}>
                <Text style={styles.nameText}>Нынешние даты посещения</Text>

                <Text style={styles.nameText}>Дата начало: {activeBooking?.date_from ? formatDate(activeBooking.date_from) : ''}</Text>
                <Text style={styles.nameText}>Дата окончания: {activeBooking?.date_to ? formatDate(activeBooking.date_to) : ''}</Text>
            </View>

                <View style={{marginTop: 10}}>
                    <Text style={styles.nameText}>На сколько дней вы хотите продлить ?</Text>
                </View>
                <View style={styles.parametrsContainer}>
                    <Text style={styles.paramsTitle}>Количество дней</Text>
                    <View style={styles.counter}>
                        <TouchableOpacity
                            style={styles.countButtons}
                            onPress={() => handleDecrement(setCounts, 1)}
                        >
                            <Feather name="minus-circle" size={30} color="#ccc"/>
                        </TouchableOpacity>

                        <Text style={styles.subtitle}>{counts}</Text>

                        <TouchableOpacity
                            style={styles.countButtons}
                            onPress={() => handleIncrement(setCounts, 1)}
                        >
                            <AntDesign name="pluscircleo" size={28} color="#ccc"/>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.orderContainer}>
                    <Text>Дата выселения: </Text>
                    <Text>Цена за сутки: </Text>
                    <Text>Сумма к оплате: </Text>
                </View>

                <TouchableOpacity
                    style={styles.goMapButton}
                    onPress={() => {handleExtendArend()}}
                >
                    <Text style={styles.goMapButtonText}>Оплатить:   2540 сом</Text>
                </TouchableOpacity>

            </View>
        </BottomSheet>
    )
}
