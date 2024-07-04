import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    sidebarContainer: {
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        paddingHorizontal: 18,
        alignItems: "center",
        justifyContent: "space-between",
    },

    stepBackButton: {
        paddingHorizontal: 3,
    },
    sidebarTitle: {
        fontSize: 22,
        fontWeight: '600'
    },

    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sidebarTitleContainer: {
    width: '70%'
    },
    buttonsGroupContainer: {
        flex: 1,
        marginTop: 20,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff'
    },
    contactButton: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 18,
        width: '90%',
        height: 60,
        backgroundColor: "#F7F7F7",
        borderRadius: 14
    },
    contactText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666667'
    }


})
