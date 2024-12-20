import {StyleSheet} from "react-native";
import {colors} from "../../constants/constants";


export const styles  = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 17,
        position: "relative"
    },

    selectDateContainer: {
        paddingVertical: 20,
        alignItems: "center",
        marginBottom: 10,
    },

    contentContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        gap: 5,
    },

    infoText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666',
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

    imageAndAdress: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'row',
        gap: 10,
        width: '90%'
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
        width: '90%'
    },
    adressText: {
        fontSize: 15,
        color: '#66666f',
        fontWeight: '400',
    },

    kalendar: {
        marginTop: 30,
        height: 170
    },


    outTimeText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#ccc'
    },

    infoBlock: {
        gap: 10
    },


    buyButton: {
       alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        width: '98%',
        height: 60,
        borderRadius: 20,
        backgroundColor: '#5127FF',
        marginTop: 10,
        position: "absolute",
        bottom: 10,
    },

    disabledButton: {
        backgroundColor: '#B38FFF',
    },

    pricesContainer: {
        gap: 15,
        marginTop:35
    },

    priceTitle: {
        flexDirection: 'row',
        alignItems: "flex-end",
        gap: 8
    },
    priceText: {
        fontSize: 20,
        fontWeight: '600'
    },
    priceInfoText: {

        fontSize: 16,
        fontWeight: '400'
    },

    activeBtn: {
        borderColor: colors.mainPurple,
    },
    selectDateBigBtn:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: '95%',
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    bigBtnTitle: {
        fontSize: 16,
    },
    activeBtnTitle: {
        color: colors.mainPurple,
    },

    selectedDatesContainer: {
        paddingVertical: 10,
        gap: 7,
        justifyContent: "center",
    },
    selectedDateText: {
        fontSize: 16,
    },

    apartamentNameContainer: {
        width: '90%',
    }

})
