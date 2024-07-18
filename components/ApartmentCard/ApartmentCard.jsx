import React, {useCallback} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {styles} from "./style";
import Swiper from 'react-native-swiper';
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {API} from "../../env";
import {useDispatch, useSelector} from "react-redux";
import {addOrDeleteFavorites, getApartamentDetails} from "../../store/reducers/requestSlice";

export default function ApartmentCard({apartment, detailsRef}) {
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.saveDataSlice)
    function handlePressFavirites(action) {
        switch (action) {
            case 1:
                //добавление
                dispatch(addOrDeleteFavorites({action: 0, userId: data.userId, apartamentId: apartment.codeid}))
                break;
            case 2:
                //удаление
                dispatch(addOrDeleteFavorites({action: 1, userId: data.userId, apartamentId: apartment.codeid}))
                break;
            default:
                console.log("Action Not FOUND");
        }
    }

    const handleSelectApartment = useCallback((index) => {
        dispatch(getApartamentDetails(apartment.codeid))
        detailsRef.current?.snapToIndex(index);
    }, [dispatch, apartment.codeid, detailsRef]);

    // Проверка и парсинг JSON
    let imagesArray = [];
    try {
        imagesArray = apartment?.arr_path ? JSON.parse(apartment.arr_path) : [];
    } catch (error) {
        console.error("Error parsing JSON", error);
    }

    return (
        <TouchableOpacity
            onPress={() => {handleSelectApartment(0)}}
            style={styles.card}
            activeOpacity={0.7}
        >
            <View style={styles.wrapperContainer}>
                <Swiper style={styles.wrapper} showsButtons loop={false}>
                    {imagesArray?.map((item, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image
                                source={{uri: `${API}/${item.new_filename}`}}
                                style={styles.image}
                            />
                        </View>
                    ))}
                </Swiper>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{apartment?.price} сом сутки</Text>
                </View>

                <View style={styles.favoriteHeart}>
                    {!apartment?.favourite ? (
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
