import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    backButton: {
        flex: 1,
        alignItems: 'flex-start',
    },
    closeButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    otpInput: {
        borderBottomWidth: 2,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 24,
        padding: 8,
        width: 40,
    },
    timerText: {
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
});
