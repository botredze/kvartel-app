import {Platform, StyleSheet} from "react-native";
import {colors} from "../../constants/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
    },
    clearIcon: {
        marginLeft: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    filterButton: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 8,
    },
    recommendationList: {
        flex: 1
    },
    recommendationItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    apartmentList: {
        marginTop: 10,
    },
    filterButtonText: {
        fontWeight: '500',
        fontSize: 16,
        color: colors.mainPurple
    },
    butgerMenuButtonContainer: {
        position: 'absolute',
        top: 100,
        right: 20,
    },
    burgerMenuButton: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
            },
            android: {
                elevation: 15,
            },
        }),
    }

});
