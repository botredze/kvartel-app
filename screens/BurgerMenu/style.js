import { StyleSheet } from "react-native";
import {colors} from "../../constants/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        justifyContent: "space-between"
    },
    userNameTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.mainPurple
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        textAlign: "center",
        gap: 5,
        height: 40
    },
    sideBarContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    },

    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonGroupContainer: {
        paddingHorizontal: 15,
        gap: 15,
        marginTop: 15,
    },

    navigateButton: undefined,
    navigateButtonText: {
        fontSize: 22,
        fontWeight: '500',
    },

    appVersionText: {
        fontSize: 16,
        color: colors.mainPurple,
        fontWeight: '700'
    },
    versionTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#bbbaba'
    },
    documentNameText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#8a8888'
    },
    bottomButtonsGroup: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        gap: 15
    },
    appVersionContainer: {
        flexDirection: 'row',
        gap: 5
    },

    documentsContainer: {
        gap: 10
    },

    logoutButton: {
        fontSize: 16,
        fontWeight: "500",
        color: 'red'
    }


})
