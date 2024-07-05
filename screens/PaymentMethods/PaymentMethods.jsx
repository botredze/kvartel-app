import {Text, TouchableOpacity, View} from "react-native";
import {styles} from './style'
import {AntDesign, Entypo, Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";

export default function PaymentMethods() {
    const [payActive, setPayActive] = useState(false)
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.navigate('HomePage')
    }

    const handleAddCard = () => {
        navigation.navigate('AddCardWebView')
    }

    return(
        <View style={styles.container}>
            <View style={styles.sidebarContainer}>
                <TouchableOpacity style={styles.stepBackButton} onPress={() => {handleBack()}}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>

                <Text style={styles.sidebarTitle}>Способы оплаты</Text>
            </View>

            <TouchableOpacity style={styles.addCardBtn} onPress={()=> handleAddCard()}>
                <View style={styles.plussButton}>
                    <Entypo name="plus" size={24} color="#B38FFF" />
                </View>
                <Text style={styles.addCardText}>Добавить карту</Text>
            </TouchableOpacity>

            <View style={styles.payButtonContainer}>
                <TouchableOpacity style={{...styles.payButton, backgroundColor: payActive ? '#5027FF' : '#B38FFF'}}>
                    <Text style={styles.payButtonText}>Оплатить</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
