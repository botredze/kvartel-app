import React, {useCallback, useEffect, useState} from 'react';
import { View, PermissionsAndroid, Platform, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import supercluster from 'supercluster';
import { Fontisto } from "@expo/vector-icons";
import { styles } from './styles';
import {useDispatch, useSelector} from "react-redux";
import {getApartamentDetails} from "../../store/reducers/requestSlice";
import { togglePreviewBottomSheetVisibility } from '../../store/reducers/visibilitySlice';

export default function Maps({ previewButton }) {
    const [markers, setMarkers] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [clusteredApartments, setClusteredApartments] = useState([]);

    const dispatch = useDispatch()

    const [region, setRegion] = useState({
        latitude: 42.880103935651995,
        longitude: 74.58154184284606,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,
    });

    const previewButtonHandle = useCallback((index) => {
        previewButton.current?.snapToIndex(index);
        dispatch(togglePreviewBottomSheetVisibility(true))
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

    const {listApartments} = useSelector((state) => state.requestSlice)

    const cluster = new supercluster({
        radius: 40,
        maxZoom: 20,
    });

    useEffect(() => {
        const clusters = createClusters(listApartments, region);
        setMarkers(clusters);
    }, [region]);



    const createClusters = (data, region) => {

        cluster.load(
            data.map((item) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [item.shirota, item.dolgota],
                },
                properties: { id: item.codeid, apartament_name: item.apartament_name },
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

    const handleMarkerPress = (marker) => {
        if (marker.properties.point_count) {
            // const clusterApartments = listApartments.filter((item) =>
            //     cluster.getLeaves(marker.id, Infinity).some(leaf => leaf.properties.id === item.codeid)
            // );
            setClusteredApartments([]);
        } else {
            dispatch(getApartamentDetails(marker.properties.id));
            setSelectedMarker(marker.properties.id);
            previewButtonHandle(0);
        }
    };


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
                {markers.map((marker) =>
                    marker.properties.cluster ? (
                        <Marker
                            key={`cluster-${marker.id}`}
                            coordinate={{
                                latitude: marker.geometry.coordinates[1],
                                longitude: marker.geometry.coordinates[0],
                            }}
                            title={`В этом районе есть ${marker.properties.point_count} доступных дома`}
                            onPress={() => handleMarkerPress(marker)}
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
                            // title={`Название квартиры: ${marker.properties.apartament_name}`}
                            onPress={() => handleMarkerPress(marker)}
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
