import {StyleSheet} from "react-native";

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "column",
        height: '56%'
    },
    title: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 15,
        width: '90%',
        alignItems: "center"
    },
    buttonText: {
        color: '#9B84F3',
        fontSize: 16,
        fontWeight: "500"
    },
    skipButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    skipText: {
        color: '#fff',
        fontSize: 16,
    },

    loginBtnGroup: {
        width: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        bottom: 20,
        gap: 10
    }

});
