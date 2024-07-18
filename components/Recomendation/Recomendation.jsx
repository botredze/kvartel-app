import {View, Text, TouchableOpacity} from "react-native";
import {styles} from './style'
import {MaterialIcons} from "@expo/vector-icons";

export default function Recomendation({item, setSearchQuery, handleSearchSubmit}) {
    const handleSelectVarioation = () => {
        setSearchQuery(item)
        handleSearchSubmit()
    };

    return (
        <View style={styles.recommendationItem}>
            <MaterialIcons name="location-on" size={32} color="gray"/>
            <TouchableOpacity style={styles.underlineView} onPress={() => {handleSelectVarioation()}}>
                <Text style={styles.recommendationText}>{item}</Text>
            </TouchableOpacity>
        </View>
    )
}
