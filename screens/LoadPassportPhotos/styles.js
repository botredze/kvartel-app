import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingBottom: 10
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: '600',
        marginBottom: 20,
    },
    photoContainer: {
        display: "flex",
        gap: 30,
    },
    photoWrapper: {
        alignItems: 'center',
    },
    photoLabel: {
        marginBottom: 15,
        fontSize: 18,
    },
    photoPlaceholder: {
        width: 390,
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    photo: {
        width: 390,
        height: 190,
        borderRadius: 10,
    },

    photoPlaceGolder: {
        width: 390,
        height: 190,
        borderRadius: 10,
        objectFit: "contain"
    },
    cameraButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#5B21FF',
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        width: '90%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#B38FFF',
    },

    actionButton: {
        backgroundColor: '#ccc',
        width: '98%',
        height: 57,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15,
    },

    actionButtonActive: {
        backgroundColor: '#5B21FF',
        width: '98%',
        height: 57,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15,
    },

    resetButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f44336',
        borderRadius: 5,
    },
    actionButtonsContainer: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        padding: 15,
        marginTop: 10,
        gap: 10,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 18,
    },

    cameraButtonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
    },
    camera: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    cameraControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    switchCameraButton: {
        alignSelf: 'flex-start',
    },
    takePhotoButton: {
        alignSelf: 'center',
    },
    permissionButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    permissionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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

})
