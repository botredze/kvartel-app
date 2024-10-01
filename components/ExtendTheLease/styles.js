import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
        position: "relative",
        height: "95%",
    },
    parametrsContainer: {
        flexDirection: 'row',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginTop: 15,
    },

    selectDateContainer: {
        height: 170,
        marginBottom: 20,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '500',
    },

    summText: {
        fontSize: 18,
        fontWeight: '700',
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

    timeContainer: {
        gap: 7,
    },
    goMapButton: {
        height: 50,
        backgroundColor: '#5127FF',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15,
        marginBottom: 50,
        position: "absolute",
        bottom: 10,
        left: 20,
        right: 20,
    },

    goMapButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },

    orderContainer: {
        gap: 10,
        marginTop: 20,
    }



})
