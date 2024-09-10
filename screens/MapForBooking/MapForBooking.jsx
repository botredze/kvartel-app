import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import {Fontisto, Ionicons} from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function MapForBooking({ route, navigation}) {
    const { destinationCoords } = route.params;

    const dispatch = useDispatch();
    const [region, setRegion] = useState({
        latitude: 42.880103935651995,
        longitude: 74.58154184284606,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922,
    });
    const [userLocation, setUserLocation] = useState(null);
    const [showDirections, setShowDirections] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    const onRegionChangeComplete = (newRegion) => {
        setRegion(newRegion);
    };

    const handleRoutePress = () => {
        setShowDirections(!showDirections);
    };

    const handleBack = () => {
        navigation.navigate('MyBooking',)
    }

    return (
        <View style={styles.container}>
            <View style={styles.sidebarContainer}>
                <Text style={styles.sidebarTitle}>Моя активная бронь</Text>

                <TouchableOpacity onPress={() => {handleBack()}} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white"/>
                </TouchableOpacity>
            </View>

            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={region}
                onRegionChangeComplete={onRegionChangeComplete}
            >
                {destinationCoords && (
                    <Marker
                        coordinate={{
                            latitude: destinationCoords.latitude,
                            longitude: destinationCoords.longitude,
                        }}
                    >
                        <View style={styles.marker}>
                            <Fontisto name="map-marker-alt" size={22} color="white" />
                        </View>
                    </Marker>
                )}

                {showDirections && userLocation && destinationCoords && (
                    <MapViewDirections
                        origin={userLocation}
                        destination={destinationCoords}
                        apikey="AIzaSyBc9UiLu4WMYuVYXVjMmHSbnJ78Jj_bnv4"
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                )}
            </MapView>

            <TouchableOpacity style={styles.routeButton} onPress={handleRoutePress}>
                <Text style={styles.routeButtonText}>
                    {showDirections ? 'Скрыть маршрут' : 'Проложить маршрут'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative',
        paddingTop: 50,
    },
    map: {
        width: '100%',
        height: '100%',
    },

    sidebarContainer: {
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        zIndex: 99,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        position: "absolute",
        top: 40,
        left: 0
    },

    stepBackButton: {
        paddingHorizontal: 3,
    },
    sidebarTitle: {
        fontSize: 22,
        fontWeight: '700'
    },

    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },

    marker: {
        backgroundColor: '#7250FF',
        padding: 5,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    routeButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#7250FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    routeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
