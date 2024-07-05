import React, {useCallback, useEffect, useRef, useState} from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Text} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import supercluster from 'supercluster';
import {Fontisto} from "@expo/vector-icons";
import PreviewBottiomSheet from "../PreviewBottiomSheet/PreviewBottiomSheet";

export default function Maps({previewButton}) {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    const [region, setRegion] = useState({
        latitude: 42.880103935651995,
        longitude: 74.58154184284606,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,
    });


    const previewButtonHandle = useCallback((index) => {
        previewButton.current?.snapToIndex(index);
    }, []);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.error("Location permission denied");
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };

        requestLocationPermission();
    }, []);

    useEffect(() => {
        const data = [
            { id: 1, latitude: 42.880103935651995, longitude: 74.58154184284606, name: 'Уютная квартира для кроликов' },
            { id: 2, latitude: 42.881103935651995, longitude: 74.58254184284606, name: 'Тише пожалуйста соседи жалуются'},
        ];

        const clusters = createClusters(data, region);
        console.log(clusters, 'clusters')
        setMarkers(clusters);
    }, [region]);

    const createClusters = (data, region) => {
        const cluster = new supercluster({
            radius: 40,
            maxZoom: 20,
        });

        cluster.load(
            data.map((item) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [item.longitude, item.latitude],
                },
                properties: { id: item.id, name: item.name },
            }))
        );

        const bbox = [
            region.longitude - region.longitudeDelta / 2,
            region.latitude - region.latitudeDelta / 2,
            region.longitude + region.longitudeDelta / 2,
            region.latitude + region.latitudeDelta / 2,
        ];

        const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
        return cluster.getClusters(bbox, zoom);
    };

    const onRegionChangeComplete = (newRegion) => {
        setRegion(newRegion);
    };

    const handleMarkerPress = (id) => {
        setSelectedMarker(id);
        previewButtonHandle(0)
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={region}
                onRegionChangeComplete={onRegionChangeComplete}
            >
                {markers.map((marker) =>
                    marker.properties.cluster ? (
                        <Marker
                            key={`cluster-${marker.id}`}
                            coordinate={{
                                latitude: marker.geometry.coordinates[1],
                                longitude: marker.geometry.coordinates[0],
                            }}
                            title={`В этом районе есть ${marker.properties.point_count} доступных дома`}
                        >
                            <View style={styles.cluster}>
                                <Text style={styles.clusterText}>
                                    {marker.properties.point_count}
                                </Text>
                            </View>
                        </Marker>
                    ) : (
                        <Marker
                            key={`marker-${marker.properties.id}`}
                            coordinate={{
                                latitude: marker.geometry.coordinates[1],
                                longitude: marker.geometry.coordinates[0],
                            }}
                            //title={`Название квартиры: ${marker.properties.name}`}
                            onPress={() => handleMarkerPress(marker.properties.id)}
                        >

                            <View style={selectedMarker === marker.properties.id ? styles.selectedMarker : styles.marker}>
                                {selectedMarker === marker.properties.id ? (
                                    <Fontisto name="map-marker-alt" size={22} color="white" />
                                ) : (
                                    <View style={styles.innerMarker}></View>
                                )}
                            </View>
                        </Marker>
                    )
                )}
            </MapView>

        </View>
    );
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
