import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useCallback, useMemo} from "react";
import {Text, TouchableOpacity, StyleSheet, Image, View} from "react-native";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {colors} from "../../constants/constants";


export default function PreviewBottiomSheet({item, previewButton, booking, details}) {
    const snapPoints = useMemo(() => ['17%'], []);

    const handleClosePreview = () => {
        previewButton.current?.close();
    };

    const handleClickBooking = useCallback((index) => {
        booking.current?.snapToIndex(index);
    }, []);

    const handleClickDetailsClick = useCallback((index) => {
        details.current?.snapToIndex(index);
    }, []);

    return (
        <BottomSheet
            ref={previewButton}
            snapPoints={snapPoints}
            index ={-1}
            enablePanDownToClose={true}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}
        >
            <BottomSheetView style={styles.contentContainer}>
                <TouchableOpacity style={styles.imageAndAdress}
                onPress={() => {handleClickDetailsClick(0)}}>
                    <Image
                        source={{uri: item?.images[0]?.imageUrl}}
                        style={styles.image}
                    />

                    <View>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.adressText}>{item.address}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {handleClosePreview()}} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white"/>
                </TouchableOpacity>
            </BottomSheetView>

            <BottomSheetView style={styles.selectDateContainer}>
                <TouchableOpacity
                    style={styles.selectDateBtn}
                    onPress={() => {handleClickBooking(0)}}
                >
                    <Text style={styles.selectDateBtnText}>Выбрать дату</Text>
                    <Text style={styles.selectDateBtnText}>{item.price} сутки</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton}>
                    <Entypo name="dots-three-horizontal" size={22} color="#666666"/>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 17,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        gap: 10
    },

    image: {
        width: 52,
        height: 52,
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
        gap: 5
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
        gap: 15
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
    },
    adressText: {
        fontSize: 15,
        color: '#66666',
        fontWeight: '400',
    }
})
