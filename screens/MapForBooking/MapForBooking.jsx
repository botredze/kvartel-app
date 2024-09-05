import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {View, StyleSheet} from "react-native";
import {styles} from "../Maps/styles";
import {Fontisto} from "@expo/vector-icons";
import React from "react";

export default function MapForBooking() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={region}
                onRegionChangeComplete={onRegionChangeComplete}
                mapLa={'ru-ru'}
            >

                {/*<Marker*/}
                {/*    key={`marker-${marker.properties.id}`}*/}
                {/*    coordinate={{*/}
                {/*        latitude: marker.geometry.coordinates[1],*/}
                {/*        longitude: marker.geometry.coordinates[0],*/}
                {/*    }}*/}
                {/*    // title={`Название квартиры: ${marker.properties.apartament_name}`}*/}
                {/*    onPress={() => handleMarkerPress(marker.properties.id)}*/}
                {/*>*/}
                {/*    <View style={selectedMarker === marker.properties.id ? styles.selectedMarker : styles.marker}>*/}
                {/*        {selectedMarker === marker.properties.id ? (*/}
                {/*            <Fontisto name="map-marker-alt" size={22} color="white" />*/}
                {/*        ) : (*/}
                {/*            <View style={styles.innerMarker}></View>*/}
                {/*        )}*/}
                {/*    </View>*/}
                {/*</Marker>*/}

            </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
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
        width: 30,
        height: 30,
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
        width: 12,
        height: 12,
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
