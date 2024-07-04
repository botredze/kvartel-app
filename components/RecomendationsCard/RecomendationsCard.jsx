import React from "react";
import {View, Text, Image} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import {colors} from "../../constants/constants";

export default function RecomendationsCard({apartment}) {
    return (
        <View style={styles.card}>
            <View style={styles.wrapperContainer}>
                {apartment?.images?.map((item, index) => (
                    <View style={styles.imageContainer}>
                        <Image
                            key={index}
                            source={{uri: item?.imageUrl}}
                            style={styles.image}
                        />
                    </View>
                ))}
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{apartment?.price}сом сутки</Text>
                </View>
            </View>
            <Text style={styles.name}>{apartment?.name}</Text>
            <View style={styles.gapContainer}>
                <Text style={styles.gapText}>Нет информации</Text>
                <FontAwesome5 name="walking" size={24} color="black"/>
                <Text style={styles.gapTextTime}>(0 мин.)</Text>
            </View>
            <Text style={styles.address}>{apartment?.address}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: '#fff',
        marginRight: 10,
        width: 320
    },

    imageContainer:{
        position: 'relative',
        width: '100%',
        height: 200,
        borderRadius: 8,
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        padding: 2,
    },
    address: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5,
    },
    wrapperContainer: {
        height: 200,
    },

    priceContainer: {
        backgroundColor: colors.mainPurple,
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginTop: 5,
        paddingHorizontal: 7,
        position: 'absolute',
        left: 17,
        bottom: 20
    },
    gapContainer: {
        display: "flex",
        flexDirection: 'row',
        gap: 10
    },
    gapText:{
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '500',
        color: '#666666'
    },

    gapTextTime: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666'
    }


});
