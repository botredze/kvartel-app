import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 40,
    },

    sidebarContainer: {
        flexDirection: 'row',
        gap: 5,
        width:"100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignSelf: "center",
        alignItems: "center",
    },

    stepBackButton: {
        paddingHorizontal: 3,
    },
    sidebarTitle: {
        fontSize: 22,
        fontWeight: '700'
    },

    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainContentContainer: {
        paddingVertical:5,
        paddingHorizontal: 15,
        gap: 10,
    },

    titleText: {
        fontSize: 16,
        fontWeight: '600'
    },
    activeLookCode: {
        fontSize: 18,
    },
    instrunctionText: {
        fontSize: 14
    },

    goMapButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#5127FF',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15,
        marginBottom: 50,
    },
    goMapButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
})
