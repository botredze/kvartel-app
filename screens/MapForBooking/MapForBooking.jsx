import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { Fontisto } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function MapForBooking({ route, navigation}) {
    const { destinationCoords} = route.params;

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

    return (
        <View style={styles.container}>
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
                        apikey="AIzaSyBc9UiLu4WMYuVYXVjMmHSbnJ78Jj_bnv4" // Замените на ваш ключ API
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
    },
    map: {
        width: '100%',
        height: '100%',
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
