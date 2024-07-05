import React, {useCallback} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {styles} from "./style";
import Swiper from 'react-native-swiper';
import {AntDesign, FontAwesome5} from "@expo/vector-icons";

export default function ApartmentCard({apartment, detailsRef}) {

    function handlePressFavirites(action) {
        switch (action) {
            case 1:
                break;
            case 2:
                break;
            default:
                console.log("Action Not FOUND");
        }
    }

    const handleSelectApartment = useCallback((index) => {
        detailsRef.current?.snapToIndex(index);
    }, []);


    return (
        <TouchableOpacity
            onPress={() => {handleSelectApartment(0)}}
            style={styles.card}
            activeOpacity={0.7}
        >
            <View style={styles.wrapperContainer}>
                <Swiper style={styles.wrapper} showsButtons loop={false}>
                    {apartment?.images?.map((item, index) => (
                        <View style={styles.imageContainer}>
                            <Image
                                key={index}
                                source={{uri: item?.imageUrl}}
                                style={styles.image}
                            />
                        </View>
                    ))}
                </Swiper>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{apartment?.price}сом сутки</Text>
                </View>

                <View style={styles.favoriteHeart}>
                    {apartment.favorites ? (
                        <TouchableOpacity onPress={() => {handlePressFavirites(1)}}>
                            <AntDesign name="heart" size={25} color="#FF5244" />
                        </TouchableOpacity>
                    ): (
                        <TouchableOpacity onPress={() => {handlePressFavirites(2)}}>
                            <AntDesign name="hearto" size={25} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Text style={styles.name}>{apartment?.name}</Text>
            <View style={styles.gapContainer}>
                <Text style={styles.gapText}>Нет информации</Text>
                <FontAwesome5 name="walking" size={24} color="black" />
                <Text style={styles.gapTextTime}>(0 мин.)</Text>
            </View>
            <Text style={styles.address}>{apartment?.address}</Text>
        </TouchableOpacity>
    );
}
