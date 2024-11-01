import {View, StyleSheet,Text} from "react-native";
import Calendar from "../components/Calendar/Calendar";

export default function DevView() {

    return (
        <View style={styles.container}>
            <Calendar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        paddingHorizontal: 10,
        height: '100%',
        flex: 1,
    }
})
