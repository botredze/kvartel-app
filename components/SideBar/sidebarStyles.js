import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        paddingVertical: 15,
        paddingHorizontal: 10
    },

    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleText:{
        fontSize: 22,
        fontWeight: '600'
    }
})
