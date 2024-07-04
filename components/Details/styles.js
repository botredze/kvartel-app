import {StyleSheet} from 'react-native'
import {colors} from "../../constants/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    flatListContainer: {
        flex: 1,
    },
    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitleText: {
        fontSize: 24,
        fontWeight: "600",
    },
    sidebar: {
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    addressText: {
        fontSize: 15,
        color: "#666666",
        paddingVertical: 10
    },
    gapContainer: {
        display: "flex",
        flexDirection: 'row',
        gap: 10
    },
    gapText:{
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '500',
        color: '#666666'
    },

    gapTextTime: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666'
    },
    imageContainer:{
        position: 'relative',
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginTop: 10
    },
    wrapperContainer: {
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },

    approveTimeContainer: {
        marginTop: 10,
    },
    approveText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#666666'
    },
    outTimeText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#ccc'
    },

    infoContainer: {
        marginTop: 20,
        display: "flex",
        gap: 15,
    },

    arendType: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        width: '98%',
        height: 55,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.mainGrey,
        paddingHorizontal: 15
    },
    buttonInnerText: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
    rowContainer: {
        display: 'flex',
        alignItems: "flex-start",
        flexDirection: 'row',
        gap: 15
    },

    functuionsContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        height: 55,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.mainGrey,
        paddingHorizontal: 15,
        gap: 13
    },

    convenienceContainer: {
        marginTop: 20,
        flex: 1,
    },

    recomendationContainer: {
        marginTop: 20,
        flex: 1,
        marginBottom: 50,
    },


    contentTitle: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 10,
        color: '#ccc',
        textTransform: 'uppercase',
    },

    watchMoreText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.mainPurple
    },

    listContainer: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    recomendated: {
        display: "flex",
        flexDirection: 'row',
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
    }
})
