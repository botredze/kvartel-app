import {Platform, StyleSheet, Text, TouchableOpacity} from "react-native";
import {colors} from "../../constants/constants";
import React from "react";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingTop: 34
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    retryRegistrationButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#6200EE',
        borderRadius: 15,
        alignItems: 'center',
        width: '70%',
        alignSelf: "center"
    },
    retryRegistrationText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    searchInput: {
        flex: 1,
        borderRadius: 14,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
        flex: 1,
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
        gap: 15
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
                shadowOffset: {width: 0, height: 10},
                shadowOpacity: 0.25,
                shadowRadius: 10,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    registrationStatusContainer: {
        position: "absolute",
        alignItems: "center",
        top: 60,
        alignSelf: "center",
        widthMax: '90%',
        backgroundColor: 'white',
        height: 40,
        justifyContent: "center",
        borderRadius: 20,
        paddingHorizontal: 15,
        zIndex: 0

    },
    statusCheckButton: undefined,
    statusTitle: {
        color: colors.mainPurple,
        textAlign: "center",
        fontWeight: '500'
    },

    //modalkaaa
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '88%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },

    modalTextTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: "center"
    },
    closeButtonModal: {
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: 'flex-end',
        borderRadius: 10,
        alignSelf: 'flex-end'
    },
    closeButtonText: {
        color: '#2B2B2B',
        fontSize: 16,
    },

    dataNotFound: {
        alignSelf: "center",
        justifyContent: "center",
        height: '100%',
        gap: 20,
        alignItems: "center",

    },
    dataNotFoundText: {
        fontSize: 20,
        fontWeight: '600',
    }


});
