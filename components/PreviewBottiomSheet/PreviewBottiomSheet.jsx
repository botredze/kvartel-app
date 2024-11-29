import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../env";
import Skeleton from "./Skeleton";
import { toggleBookingVisibility, toggleDetailsVisibility, togglePreviewBottomSheetVisibility } from "../../store/reducers/visibilitySlice";

export default function PreviewBottomSheet({ previewButton, booking, details }) {
    const snapPoints = useMemo(() => ['22%'], []);

    const handleClosePreview = () => {
        dispatch(togglePreviewBottomSheetVisibility(false))
        previewButton.current?.close();
    };

    const { apartmentDetail, bottomSheetPreloader } = useSelector((state) => state.requestSlice);

    const dispatch = useDispatch()

    const handleClickBooking = useCallback((index) => {
        dispatch(toggleBookingVisibility(true))
        booking.current?.snapToIndex(index);
    }, []);

    const handleClickDetailsClick = useCallback((index) => {
        dispatch(toggleDetailsVisibility(true))
        details.current?.snapToIndex(index);
    }, []);

    return (
        <BottomSheet
            ref={previewButton}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
        >
            {bottomSheetPreloader ? (
                <Skeleton />
            ) : (
                <>
                    <BottomSheetView style={styles.contentContainer}>
                        <TouchableOpacity style={styles.imageAndAdress}
                                          onPress={() => { handleClickDetailsClick(0) }}>
                            <Image
                                source={{ uri: `${API}/${apartmentDetail?.photos[0]?.pathUrl}` }}
                                style={styles.image}
                            />

                            <View style={styles.apartamentNameContainer}>
                                <Text style={styles.nameText}>{apartmentDetail.apartament_name}</Text>
                                <Text style={styles.adressText}>{apartmentDetail.address}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClosePreview} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </BottomSheetView>

                    <BottomSheetView style={styles.selectDateContainer}>
                        <TouchableOpacity
                            style={styles.selectDateBtn}
                            onPress={() => { handleClickBooking(0) }}
                        >
                            <Text style={styles.selectDateBtnText}>Выбрать дату</Text>
                            <Text style={styles.selectDateBtnText}>{apartmentDetail.price} сутки</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton}>
                            <Entypo name="dots-three-horizontal" size={22} color="#666666" />
                        </TouchableOpacity>
                    </BottomSheetView>
                </>
            )}
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 17,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        gap: 5,
    },

    image: {
        width: 54,
        height: 54,
        borderRadius: 13,
    },

    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectDateContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        width: '100%',
        backgroundColor: '#fff',
        height: 90,
        paddingHorizontal: 18,
        justifyContent: "space-between",
        gap: 8
    },

    selectDateBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        width: '88%',
        height: 50,
        backgroundColor: '#5127FF',
        borderRadius: 30,
        paddingHorizontal: 15,

    },
    selectDateBtnText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.mainWhite
    },
    imageAndAdress: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'row',
        gap: 10
    },
    nameText: {
        width: '95%',
        fontSize: 18,
        fontWeight: '500',
    },
    adressText: {
        width: '95%',
        fontSize: 15,
        color: '#66666',
        fontWeight: '400',
    },

    apartamentNameContainer: {
        width: '76%',
        gap: 5
    }
});
