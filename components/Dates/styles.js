import { StyleSheet } from "react-native";
import { colors } from "../../constants/constants";

export const styles = StyleSheet.create({
    selectDateButton: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 23,
        borderWidth: 2,
        borderColor: '#ccc',
    },

    selectDateTitle: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: '500'
    },

    dateContainer:{
        position: 'relative',
        marginRight: 30,
        alignItems: "center",
        justifyContent: 'center',
        gap: 15,
        flex: 1
    },
    dateTitle: {
        fontSize: 16,
        color: '#ccc',
        textTransform: 'uppercase'
    },
    outActive: {
        fontSize: 10,
        fontWeight: '400'
    },
    activeDateButton: {
        borderColor: colors.mainPurple,
        backgroundColor: colors.mainPurpleLight,
    },
    activeDateTitle: {
        color: colors.mainPurple,
    },

    connectionLine: {
        position: 'absolute',
        width: '50%',
        height: 40,
        backgroundColor: colors.mainPurple,
        top: '50%',
        left: '100%',
    },

});
