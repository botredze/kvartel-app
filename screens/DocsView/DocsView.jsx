import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import PDFView from "../../components/PDFView/PDFView";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export default function DocsView({route}) {
    const {item, step, documents, detailsRef, booking} = route.params;
    const [showButton, setShowButton] = useState(false);
    const navigation = useNavigation();

    const handleClickCloseDogovor = () => {
        navigation.navigate('BurgerMenu', {detailsRef, booking});
    };

    const handleAccept = () => {
        if (step < documents.length - 1) {
            navigation.navigate('DocsView', { item: documents[step + 1], step: step + 1, documents });
        } else {
            navigation.navigate('NextPage');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                <Text style={styles.titleNameText}>{item?.name}</Text>
                <TouchableOpacity onPress={handleClickCloseDogovor} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="black"/>
                </TouchableOpacity>
            </View>

            <View style={styles.pdfContainer}>
                <PDFView item={item.documentUrl}/>
            </View>

            {showButton &&
                <View style={styles.bottomButtonConier}>
                    <TouchableOpacity style={styles.accessDogovorButton} onPress={handleAccept}>
                        <Text style={styles.accesBottonText}>Я принимаю условия договора</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBarContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        height: 100,
        paddingTop: 40,
        backgroundColor: '#2B2B2B'
    },
    closeButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleNameText: {
        fontSize: 22,
        fontWeight: "bold",
        color: '#fff'
    },
    accessDogovorButton: {
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        height: 90,
        backgroundColor: '#5027FF',
    },
    accesBottonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#fff'
    },
    bottomButtonConier: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
    },
    pdfContainer: undefined,
});
