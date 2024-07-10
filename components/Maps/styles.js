import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    cluster: {
        backgroundColor: '#7250FF',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.6)'
    },
    clusterText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },

    marker: {
        backgroundColor: '#7250FF',
        padding: 5,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },

    selectedMarker: {
        backgroundColor: '#5127FF',
        padding: 5,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    innerMarker: {
        backgroundColor: '#fff',
        padding: 5,
        width: 15,
        height: 15,
        borderRadius: 30,
    },

    selectedInnerMarker: {
        backgroundColor: 'red',
        padding: 5,
        width: 15,
        height: 15,
        borderRadius: 30,
    }

});
