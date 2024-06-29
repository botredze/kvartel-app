import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chatContainer: {
        flex: 1,
    },
    chatContent: {
        padding: 10,
    },
    message: {
        marginVertical: 5,
        padding: 5,
        width: '70%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#4AE692',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    systemMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#F1F0F0',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,

    },
    linkText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        display: "flex",
        height: 150,
        gap: 10,
        width: '89%',
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: "center"
    },
    responseButton: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "center",
        height: 60,
        width: '100%',
        margin: 0,
        display: "flex",
        flexDirection: "row",
        gap: 15
    },
    skipButton: {
        backgroundColor: '#AAAAAA',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "center",
        height: 60,
        width: '100%',
        margin: 0
    },

    responseButtonText: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 16
    },
    skipButtonText: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 16
    },

    messageText: {
        padding: 10,
        fontSize: 16,
    },

    fileLink: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    fileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
        width: '86%'
    },
    fileSizeText: {
        fontSize: 12,
        color: '#999',
    },

    camera: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    cameraButtonContainer: {
        alignItems: 'center',
        marginBottom: 20,
        flex:1
    },
    cameraButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    previewImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
});
