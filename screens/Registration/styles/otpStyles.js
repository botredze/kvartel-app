import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    backButton: {
        padding: 8,
    },
    closeButton: {
        padding: 8,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: '50%',
        display: "flex",
        gap: 60,
    },
    headerText: {
        width: '70%',
        textAlign:'center',
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 16,
    },
    otpContainer: {
        position: 'relative',
        width: '70%',
    },
    otpInput: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: 60,
        fontSize: 29,
        textAlign: 'center',
        letterSpacing: 8,
    },
    otpMask: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    otpMaskItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#9A9A9A',
        width: '12%', // Adjust as needed
        alignItems: 'center',
        padding: 4,
    },
    otpMaskText: {
        fontSize: 26,
    },
    timerText: {
        marginTop: 16,
        fontSize: 16,
        color: 'gray',
    },
    timerContainer: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        display: "flex",
        alignItems: 'center'
    }

});
