import {View, Text} from "react-native";
import {styles} from './style'
import {MaterialIcons} from "@expo/vector-icons";

export default function Recomendation({item}) {
    return (
        <View style={styles.recommendationItem}>
            <MaterialIcons name="location-on" size={32} color="gray"/>
            <View style={styles.underlineView}>
                <Text style={styles.recommendationText}>{item}</Text>
            </View>
        </View>
    )
}
