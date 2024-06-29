import React from "react";
import {View, Text, Image} from "react-native";
import {styles} from "./style";
import Swiper from 'react-native-swiper';
import {FontAwesome5} from "@expo/vector-icons";

export default function ApartmentCard({apartment}) {
    return (
        <View style={styles.card}>
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
            </View>
            <Text style={styles.name}>{apartment?.name}</Text>
            <View style={styles.gapContainer}>
                <Text style={styles.gapText}>Нет информации</Text>
                <FontAwesome5 name="walking" size={24} color="black" />
                <Text style={styles.gapTextTime}>(0 мин.)</Text>
            </View>
            <Text style={styles.address}>{apartment?.address}</Text>
        </View>
    );
}
