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
        width: '50%',
        height: 50,
        backgroundColor: '#5127FF',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15,
    },

    goMapButton2: {
        width: '90%',
        height: 50,
        backgroundColor: '#5127FF',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15,
    },

    finishLeaseButton: {
        width: '50%',
        height: 50,
        backgroundColor: '#ff4e4a',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15,
    },

    goMapButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },

    buttonGroups: {
        flexDirection: 'row',
        gap: 10,
        alignSelf: "center",
        justifyContent: "center",
    },

    buttonGroupsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        marginBottom: 50
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalCancelButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#dcdcdc',
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 10,
    },
    modalConfirmButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ff4e4a',
        borderRadius: 12,
        alignItems: 'center',
    },
    modalCancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    modalConfirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    
})
