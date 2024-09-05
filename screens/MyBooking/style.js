import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },

    sidebarContainer: {
        flexDirection: 'row',
        gap: 5,
        width:"100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
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
    }


})
