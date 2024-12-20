import {StyleSheet} from 'react-native';
import {colors} from "../../constants/constants";

export const styles = StyleSheet.create({
    sheetContent: {
        paddingHorizontal: 5,
    },

    selectedDatesContainer: {
        paddingVertical: 10,
        gap: 7,
        justifyContent: "center",
        marginBottom: 15,
    },
    selectedDateText: {
        fontSize: 16,
    },

    selectDateContainer: {
        alignItems: "center",
        marginBottom: 10,
    },

    sectionTitle: {
        marginBottom: 16,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: 16,
        paddingHorizontal: 10
    },

    sectionType: {
        marginBottom: 16,
    },

    subtitleType: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 8,
        color: '#ccc',
        textTransform: 'uppercase'
    },

    title: {
        fontSize: 24,
        fontWeight: '600',
    },

    resetTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#7c7b7b'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 8,
        color: '#ccc',
        textTransform: 'uppercase'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        gap: 7
    },

    column: {
        alignItems: 'center',
        marginBottom: 16,
        gap: 7
    },

    sliderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sliderInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginHorizontal: 8,
        borderRadius: 4,
    },

    bigBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    selectDateBigBtn:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: '42%',
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
    },

    selectDateSmallBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
    },

    selectCountBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
    },

    resetDate: undefined,

    priceInputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    priceInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 80,
        textAlign: 'flex-start',
        fontSize: 18,
    },
    dash: {
        fontSize: 30,
        fontWeight: '100',
        marginHorizontal: 10,
    },
    slider: {
        width: '100%',
        padding: 15,
        alignItems: "center",
    },


    bigBtnTitle: {
        fontSize: 15,
    },

    selectBronBtn:{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        padding: 9,
        borderColor: '#ccc',
    },

    selectNotContactBtn:{
        display: "flex",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        padding: 9,
        borderColor: '#ccc',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center'
    },

    typeBron: {
        fontSize: 13,
    },


    parametrsContainer: {
        flexDirection: 'row',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
    },


    nameText: {
        fontSize: 18,
        fontWeight: '500',
    },

    counter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 15
    },

    countButtons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
    paramsTitle: {
        fontSize: 16,
        fontWeight: '500',
    },


    //modalkaaa
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '88%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },

    modalTextTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    closeButtonModal: {
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: 'flex-end',
        borderRadius: 10,
        alignSelf: 'flex-end'
    },
    closeButtonText: {
        color: '#2B2B2B',
        fontSize: 16,
    },


    unselectedTrack: {
        backgroundColor: 'silver',
        height: 3,
    },
    track: {
        height: 3,
    },
    marker: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: colors.mainPurple,
        borderWidth: 2,
        borderColor: colors.mainPurple,
    },
    pressedMarker: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        backgroundColor: colors.mainPurple,
        borderWidth: 2,
        borderColor: colors.mainPurple,
    },
    selectedTrack: {
        backgroundColor: colors.mainPurple,
        height: 3,
    },

    //
    activeBtn: {
        borderColor: colors.mainPurple,
    },
    activeBtnTitle: {
        color: colors.mainPurple,
    },

    activeBtnCountState: {
        borderColor: colors.mainPurple,
        backgroundColor: colors.mainPurple
    },
    activeBtnTitleCountState: {
        color: colors.mainWhite,
    },

    activeBronBtn: {
        borderColor: colors.mainPurple,
        backgroundColor: colors.mainPurple
    },
    activeTypeBron: {
        color: colors.mainWhite,
    },
    showResultsButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.mainPurple,
        height: 65,
        alignItems: "center",
        justifyContent: "center"
    },
    showResultsButtonText: {
        color: colors.mainWhite,
        fontSize: 17,
        fontWeight: '600'
    },

    resetBtn: {
        alignItems: "center",
        justifyContent: "center"
    }

});
