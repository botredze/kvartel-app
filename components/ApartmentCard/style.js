import { StyleSheet } from "react-native";
import { colors } from "../../constants/constants";

export const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
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

    favoriteHeart: {
        position: 'absolute',
        right: 20,
        top: 20
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
    },



});
